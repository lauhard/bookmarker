<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { type ActionResult } from "@sveltejs/kit";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { getListStore } from "$lib/state/list.svelte";
    import CollectionModal from "./CollectionModal.svelte";

    let { list } = $props();
    let isDeleting = $state(false);
    let edit = $state(false);
    let name = $state(list.name || "");
    let listStore = getListStore();

    const formEnhanceDelete = () => {
        return async ({ result }: { result: ActionResult }) => {
            if (result.type !== "success") {
                await applyAction(result);
            } else {
                // Warten auf das Fade-out-Ende (300ms passt zur Transition)
                isDeleting = true;
                await new Promise((r) => setTimeout(r, 300));
            }
        };
    };
    const formEnhanceUpdate = () => {
        return async ({ result }: { result: ActionResult }) => {
            let id = list.id;
            if (result.type !== "success") {
                await applyAction(result);
            } else {
                list.name = name;
                listStore.updateStore(id, list);
                edit = false;
            }
        };
    };
    let collectionId = $state(list.id || "");
    let showCollectionModal = $state(false);
</script>

<CollectionModal bind:showCollectionModal bind:collectionId></CollectionModal>

{#if !isDeleting}
    <li
        out:fly={{ x: -100, opacity: 0, duration: 300, easing: cubicOut }}
        class="w-full"
    >
        <article
            class="flex flex-row items-start w-full gap-3 mb-2 sm:gap-4 p-3 sm:p-4 pb-2 bg-base-200/50 hover:bg-base-200 border-base-300/30 border transition-all duration-300"
            aria-labelledby="bookmark-title-{collectionId}"
        >
            <div class="flex-shrink-0">
                <!-- svelte-ignore a11y_missing_attribute -->
                <img
                    class="size-10 sm:size-10 rounded-md object-cover mt-1"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                />
            </div>
            <div
                class="flex flex-col justify-center items-start gap-0.5 w-full"
            >
                {#if edit}
                    <div class="form-control w-full max-w-xs">
                        <input
                            type="text"
                            class="input input-primary border-primary focus:outline-none p-0 pl-2 m-0 text-primary h-fit font-bold w-full max-w-xs input-md text-lg"
                            bind:value={name}
                            placeholder="Collection Name"
                            name="name"
                            autofocus
                            required
                        />
                    </div>
                {:else}
                    <a
                        href={`/bookmarks?collectionId=${list.id}`}
                        aria-label="Bookmarks for this Collection"
                        class="link underline text-primary hover:text-primary-focus w-full"
                    >
                        <h2
                            class="text-lg font-semibold text-primary capitalize w-full"
                        >
                            {list?.name}
                        </h2>
                    </a>
                {/if}
                {#if list.createdAt}
                    <p class="text-xs text-base-content/60">
                        {new Date(list.createdAt).toLocaleDateString("de-DE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                {/if}
                {#if list.description}
                    <p class="text-sm text-base-content/70">
                        {list.description}
                    </p>
                {/if}
                <div class="flex flex-wrap items-center gap-2 mt-1">
                    <span
                        class="text-xs font-semibold text-base-content/50 uppercase"
                        >Type</span
                    >
                    <div
                        class="badge badge-sm badge-outline text-xs uppercase text-base-content/60"
                        class:isPublic={list.isPublic}
                    >
                        {list.isPublic ? "Public" : "Privat"}
                    </div>
                </div>
            </div>
            <div
                class="flex flex-row justify-center items-center vertical-center"
            >
                <form
                    method="POST"
                    action={`/lists/${list.id}/?/delete`}
                    use:enhance={formEnhanceDelete}
                    class="flex items-center"
                >
                    <button
                        type="submit"
                        class="btn btn-square btn-ghost text-error hover:text-error-focus"
                        aria-label="Delete List"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-circle-x-icon lucide-circle-x"
                            ><circle cx="12" cy="12" r="10" /><path
                                d="m15 9-6 6"
                            /><path d="m9 9 6 6" /></svg
                        >
                    </button>
                </form>
                {#if edit == false}
                    <button
                        class="btn btn-square btn-ghost text-primary hover:text-primary-focus"
                        aria-label="Edit Collection"
                        onclick={() => {
                            showCollectionModal = !showCollectionModal;
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-square-pen-icon lucide-square-pen"
                            ><path
                                d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                            /><path
                                d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                            /></svg
                        >
                    </button>
                {:else}
                    <form
                        action="lists/?/update"
                        method="POST"
                        use:enhance={formEnhanceUpdate}
                    >
                        <input type="hidden" name="id" value={list.id} />
                        <input
                            type="hidden"
                            name="userId"
                            value={list.userId}
                        />
                        <input
                            type="hidden"
                            name="name"
                            bind:value={name}
                            required
                        />
                        <button
                            class="btn btn-square btn-ghost btn-xs md:btn-md text-primary hover:text-primary-focus"
                            type="submit"
                            aria-label="Save Collection"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-save-icon lucide-save"
                            >
                                <path
                                    d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                                />
                                <path
                                    d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"
                                />
                                <path d="M7 3v4a1 1 0 0 0 1 1h7" />
                            </svg>
                        </button>
                    </form>
                {/if}
            </div>
        </article>
    </li>
{/if}

<style lang="scss">
    .isPublic {
        color: var(--color-accent);
    }
</style>
