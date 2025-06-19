<script lang="ts">
    import { getUserState } from "$lib/state/user.svelte";
    import { applyAction, enhance } from "$app/forms";
    import { type ActionResult } from "@sveltejs/kit";
    import { goto, invalidate, invalidateAll } from "$app/navigation";
    import type { List, ListBookmark } from "../../../app";
    import { getListStore } from "$lib/state/list.svelte";
    import { getBookmarkStore } from "$lib/state/bookmarks.svelte";
    import { page } from "$app/state";
    import { browser } from "$app/environment";
    import { getPreviousPage } from "$lib";

    type BookmarkForm = {
        error?: string;
        success?: boolean;
        message?: string;
        values?: Record<string, string>;
        errors?: Record<string, string>;
    };

    let { data, form }: { data: any; form: BookmarkForm } = $props();
    let user = getUserState();
    let listStore = getListStore();
    let bookmark: ListBookmark = $state(data.bookmark);
    let bookmarkList: List | null = $state(data?.bookmarkList || null);

    listStore.set(data?.userLists || []);
    /**
     * NOTE: ListId
     * ListId is set when a bookmark is being edited
     * ListId is null when creating a new bookmark
     */
    let bookmarkLists: List[] = $state(bookmark?.lists || [bookmarkList]); // Ensure bookmarkLists is initialized correctly
    let bookmarkListIds = $state("");
    let url = $state(bookmark?.url || "");
    let pageTitle = $state(bookmark?.pageTitle || "");
    let tags = $state(bookmark?.tags || "");
    let action = $state(bookmark.id ? "?/update" : "?/create");

    //NOTE: not used for now...
    let favorite = $state(bookmark?.favorite || false);

    const removeList = (id: number) =>
        (bookmarkLists = bookmarkLists.filter((l) => l.id !== id));

    const handleListSelect = (event: Event) => {
        //to make sure we have no invalid values in bookmarkLists
        bookmarkLists = bookmarkLists.filter((l) => l != null);

        const selectedOptin = event.target as HTMLSelectElement;
        const selectedId = selectedOptin.value;
        const selected = $listStore.find((l) => l.id == selectedId);
        if (selected && !bookmarkLists.some((l) => l?.id === selected.id)) {
            bookmarkLists = [...bookmarkLists, selected];
        }
        //id bookmarkListIds is empty, we set it to the selected list id
        if (bookmarkLists.length == 0) {
            bookmarkLists = [...bookmarkLists, selected];
        }
        // Reset the select element after selection
        selectedOptin.value = "";
    };

    $effect(() => {
        // Ensure bookmarkListIds is updated correctly when bookmarkLists change
        if (bookmarkLists.length > 0) {
            bookmarkListIds = bookmarkLists.map((l) => l?.id).join(",");
        }
    });

    //console.log("bookmarkList", JSON.stringify(bookmarkList, null, 2));
    //console.log("listId", listId);
    //console.log("userLists", JSON.stringify($listStore, null, 2)); // Corrected to use allLists
    //console.log("bookmark", JSON.stringify(bookmark, null, 2));
    const formEnhance = ({
        formElement,
        formData,
        action,
        cancel,
    }: {
        formElement: HTMLFormElement;
        formData: FormData;
        action: string | URL;
        cancel: () => void;
    }) => {
        return async ({ result }: { result: ActionResult }) => {
            if (result.type !== "success") {
                console.error("Fehler beim Speichern:", result);
                await applyAction(result);
            } else {
                const { bookmarkId } = result.data as { bookmarkId: string };
                form = {
                    ...form,
                    success: true,
                    message: `Bookmark erfolgreich ${bookmarkId} gespeichert.`,
                };
                // await goto(previousUrl);
                window.history.back();
            }
        };
    };
</script>

<section class=" flex flex-col items-center justify-center vertical-center">
    {#if form?.success === false}
        <p class="text-red-500 text-center">{form?.error}</p>
    {/if}
    <form
        {action}
        method="POST"
        use:enhance={formEnhance}
        class="form flex flex-col items-center justify-center px-4 py-8 bg-base-200 rounded-box shadow-md w-full max-w-md"
    >
        <h1
            class="text-2xl text-left
        pb-2 pl-4 w-full text-primary font-bold mb-4"
        >
            {#if pageTitle === ""}
                {#if bookmarkList}
                    Add Bookmark to <span class="text-accent"
                        >"{bookmarkList?.name ?? "default"}"</span
                    >
                {:else}
                    New Bookmark
                {/if}
            {:else}
                Bookmark: <span class="text-accent">"{pageTitle}"</span>
            {/if}
        </h1>
        <fieldset class="fieldset rounded-box mx-4 px-4 w-full flex flex-col">
            {#if bookmark}
                <input type="hidden" name="bookmarkId" value={bookmark?.id} />
            {/if}
            {#if bookmark == null}
                <input type="hidden" name="userId" value={user.id} />
            {/if}
            {#if bookmarkListIds}
                <input
                    type="hidden"
                    name="bookmarkListIds"
                    value={bookmarkListIds}
                />
            {/if}
            <div>
                <label for="url" class="label text-base">Url</label>
                <input
                    id="url"
                    name="url"
                    type="url"
                    bind:value={url}
                    required
                    autocomplete="url"
                    placeholder="https://example.com"
                    class="input input-md w-full mb-3"
                    tabindex="0"
                    title="Bookmark URL"
                    autofocus
                />
            </div>

            <div>
                <label for="pageTitle" class="label text-base">Title</label>
                <input
                    id="pageTitle"
                    name="pageTitle"
                    type="text"
                    bind:value={pageTitle}
                    required
                    placeholder="Seitentitel"
                    class="input input-md w-full mb-3 capitalize"
                />
                {#if form?.errors && form?.values?.pageTitle}
                    <p class="error">{form?.errors["pageTitle"]}</p>
                {/if}
            </div>

            <div>
                <label for="tags" class="label text-base">Tags</label>
                <input
                    id="tags"
                    name="tags"
                    type="text"
                    bind:value={tags}
                    placeholder="z. B. frontend, svelte, dev"
                    class="input input-md w-full mb-3 capitalize"
                />
            </div>

            <!-- Closing the if statement for bookmarkLists -->
            <!-- Dropdown for Lists-->
            <label for="list" class="label text-base"> Collections </label>
            <select
                class="select select-accent w-full mb-1"
                id="list"
                name="list"
                onchange={handleListSelect}
            >
                <option value="" class="label text-base"
                    >Choose a Collection</option
                >
                {#each $listStore as list}
                    <option
                        class="capitalize"
                        value={list.id}
                        disabled={bookmarkLists?.some((l) => l?.id === list.id)}
                    >
                        {list.name}
                    </option>
                {/each}
            </select>

            <div class="flex flex-wrap gap-2 mb-4">
                {#each bookmarkLists as list}
                    {#if list?.name}
                        <!-- content here -->
                        <span
                            class="badge badge-accent badge-outline badge-md flex items-center capitalize"
                        >
                            {list?.name}
                            <button
                                type="button"
                                class="ml-2 text-accent hover:text-secondary"
                                onclick={() => removeList(list.id)}
                            >
                                &times;
                            </button>
                        </span>
                    {/if}
                {/each}
            </div>

            <label
                for="favorite"
                class="label text-base flex flex-row-reverse w-full items-center justify-end gap-2"
                >Mark as favorite

                <input
                    type="checkbox"
                    id="favorite"
                    name="favorite"
                    bind:checked={favorite}
                    class="checkbox checkbox-accent"
                />
            </label>
            <div
                class="pt-4 flex sm:flex-row flex-col gap-3 justify-between items-center w-full"
            >
                <button
                    type="submit"
                    class="btn btn-primary btn-md w-full sm:w-auto"
                    aria-label="Speichern"
                    tabindex="0"
                    title="Speichern"
                >
                    Save
                </button>
                <button
                    type="button"
                    class="btn btn-error btn-md w-full sm:w-auto"
                    onclick={() => history.back()}
                >
                    Discard
                </button>
            </div>
        </fieldset>
    </form>
</section>

<style lang="scss">
    section {
        margin: auto 0;
    }
</style>
