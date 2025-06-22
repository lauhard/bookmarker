<script lang="ts">
    import { page } from "$app/state";
    import { debounce } from "$lib";
    import { updateUserSettings } from "$lib/api.js";
    import Bookmarks from "$lib/components/Bookmarks.svelte";
    import Checkbox from "$lib/components/Checkbox.svelte";
    import { getBookmarkStore } from "$lib/state/bookmarks.svelte";
    import { getListStore } from "$lib/state/list.svelte.js";
    import { getUserSettingStore } from "$lib/state/userSetting.svelte";
    let { data } = $props();
    let listName = $state(data.listName);
    let collectionId = $state(page.url.searchParams.get("collectionId") || "");
    const bookmarkStore = getBookmarkStore();
    const settingStore = getUserSettingStore();
    const listStore = getListStore();

    bookmarkStore.set(data.bookmarks || []);
    settingStore.set([data.settings || {}]);
    listStore.set([data.lists || []]);

    let showDescription = $state($settingStore[0]?.showDescription);
    let showTags = $state($settingStore[0]?.showTags);
    let showDate = $state($settingStore[0]?.showDate);
    let showLists = $state($settingStore[0]?.showLists);
    let initialized = $state(false);
    let showFilter = $state("hidden h-0 opacity-0");
    let qury = $state("");
    $effect(() => {
        if (page.url.searchParams)
            collectionId = page.url.searchParams.get("collectionId") || "";
    });
    $effect(() => {
        bookmarkStore.set(data.bookmarks);
        listStore.set(data.lists);
    });
    $effect(() => {
        if (data.listName) {
            listName = data.listName;
        }
    });
    $effect(() => {
        const current = $settingStore[0];
        if (!current) return;

        const updates: Partial<typeof current> = {};

        if (current.showDescription !== showDescription) {
            updates.showDescription = showDescription;
        }
        if (current.showTags !== showTags) {
            updates.showTags = showTags;
        }
        if (current.showDate !== showDate) {
            updates.showDate = showDate;
        }
        if (current.showLists !== showLists) {
            updates.showLists = showLists;
        }

        if (Object.keys(updates).length > 0) {
            initialized = true; // Set initialized to true after the first update
            settingStore.updateStore(current.id, updates);
        }
    });
    $effect(() => {
        if (qury !== "") {
            debounce(() => {
                let filtered = $bookmarkStore.filter(
                    (b) =>
                        b.pageTitle
                            .toLowerCase()
                            .includes(qury.toLowerCase()) ||
                        b.url.toLowerCase().includes(qury.toLowerCase()),
                );
                if (filtered.length > 0) {
                    bookmarkStore.set(filtered);
                } else {
                    bookmarkStore.set(data.bookmarks || []);
                }
            }, 500)();
        } else {
            bookmarkStore.set(data.bookmarks || []);
        }
    });
    //subscribe to settingStore to get the initial value of showDescription
    settingStore.subscribe(async (settings) => {
        if (initialized == false) {
            return;
        }
        const response = await updateUserSettings(
            settings[0].userId,
            $settingStore[0],
        );
        if (response.ok) {
            console.log("Settings updated successfully");
        } else {
            console.error("Failed to update settings", response);
        }
        initialized = false; // Prevents re-initialization
    });
    //update settingStore when showDescription changes
</script>

<section class=" section-base sm:p-5 p-2 pt-5">
    <div
        class="flex flex-row flex-start gap-4 items-center vertical-center sm:mb-2"
    >
        <div
            class="menu rounded-lg border-accent-content/10 border-1 text-center flex flex-row justify-between align-middle vertical-center w-full h-fit relative"
        >
            <div class="flex flex-row items-center gap-2 w-full">
                <button
                    class="btn btn-circle text-base-content"
                    onclick={() => {
                        showFilter =
                            showFilter === "flex h-fit opacity-100"
                                ? "hidden h-0 opacity-0"
                                : "flex h-fit opacity-100";
                    }}
                    title="show filter"
                    aria-label="show filter"
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
                        class="lucide lucide-list-filter-icon lucide-list-filter"
                        ><path d="M3 6h18" /><path d="M7 12h10" /><path
                            d="M10 18h4"
                        /></svg
                    >
                </button>

                <h1
                    class="text-xl sm:text-2xl text-start font-semibold tracking-tight h-fit w-full mr-10 sm:mr-0 text-primary text-pretty uppercase"
                >
                    {collectionId && collectionId?.length > 0
                        ? listName
                        : "All Bookmarks"}
                </h1>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-circle">
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
                            class="lucide lucide-settings-icon lucide-settings"
                            ><path
                                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                            /><circle cx="12" cy="12" r="3" /></svg
                        >
                    </div>
                    <ul
                        tabindex="0"
                        class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg"
                        role="menu"
                        aria-label="Settings"
                    >
                        <li>
                            <Checkbox
                                text="Show Description"
                                bind:checked={showDescription}
                            />
                            <Checkbox
                                text="Show Tags"
                                bind:checked={showTags}
                            />
                            <Checkbox
                                text="Show Date"
                                bind:checked={showDate}
                            />
                            <Checkbox
                                text="Show Lists"
                                bind:checked={showLists}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div
        class={`filter-menu menu-horizontal menu-lg  mb-3 ${showFilter} flex-col md:flex-row allow-descrete flex-1 gap-2 p-2 bg-base-300 rounded-lg border border-base-300 shadow-sm`}
    >
        <input
            type="search"
            class=" input grow md:grow-0 input-bordered"
            placeholder="Search"
            bind:value={qury}
        />
        <div class="filter w-full flex flex-row">
            <a href="/bookmarks" aria-label="All Bookmarks">
                <input
                    class="btn filter-reset"
                    type="radio"
                    name="collections"
                    aria-label="All"
                    checked={collectionId === ""}
                /></a
            >
            {#each $listStore as list (list.id)}
                <a
                    href="/bookmarks?collectionId={list.id}"
                    aria-label={list.name}
                    ><input
                        class="btn"
                        type="radio"
                        name="collections"
                        aria-label={list.name}
                        checked={collectionId === list.id}
                    /></a
                >
            {/each}
        </div>
    </div>
    <!-- Bookmark List -->
    <Bookmarks bookmarks={$bookmarkStore}></Bookmarks>
</section>

<style lang="scss">
</style>
