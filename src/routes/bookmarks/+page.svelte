<script lang="ts">
    import { page } from "$app/state";
    import { updateUserSettings } from "$lib/api.js";
    import Bookmarks from "$lib/components/Bookmarks.svelte";
    import Checkbox from "$lib/components/Checkbox.svelte";
    import { getBookmarkStore } from "$lib/state/bookmarks.svelte";
    import { getUserSettingStore } from "$lib/state/userSetting.svelte";
    let { data } = $props();
    let listName = data.listName;
    let collectionId = $state(page.url.searchParams.get("collectionId") || "");
    const bookmarkStore = getBookmarkStore();
    const settingStore = getUserSettingStore();
    bookmarkStore.set(data.bookmarks || []);
    settingStore.set([data.settings || {}]);

    let showDescription = $state($settingStore[0]?.showDescription);
    let showTags = $state($settingStore[0]?.showTags);
    let showDate = $state($settingStore[0]?.showDate);
    let showLists = $state($settingStore[0]?.showLists);
    let initialized = $state(false);

    $effect(() => {
        if (page.url.searchParams)
            collectionId = page.url.searchParams.get("collectionId") || "";
    });
    $effect(() => {
        bookmarkStore.set(data.bookmarks);
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
        class="flex flex-row flex-start gap-4 items-center vertical-center sm:mb-5 mb-3"
    >
        <div
            class="menu text-center flex flex-row justify-between align-middle vertical-center w-full h-fit relative"
        >
            <div class="flex flex-row items-center gap-2 w-full h-10">
                {#if collectionId}
                    <a
                        class="btn btn-circle text-base-content"
                        href="/dashboard"
                        title="Back to Dashboard"
                        aria-label="Back to Dashboard"
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
                            class="lucide lucide-undo2-icon lucide-undo-2"
                            ><path d="M9 14 4 9l5-5" /><path
                                d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"
                            /></svg
                        >
                    </a>
                    <!-- content here -->
                {/if}

                <h1
                    class="text-xl sm:text-2xl text-start font-semibold tracking-tight h-fit w-full mr-10 sm:mr-0 text-primary text-pretty uppercase"
                >
                    {collectionId && collectionId?.length > 0
                        ? listName
                        : "All Bookmarks"}
                </h1>
                <div class="dropdown dropdown-end sm:inline-block hidden">
                    <div tabindex="0" role="button" class="btn">Settings</div>
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
            <div class="dropdown dropdown-end sm:hidden absolute right-0">
                <div tabindex="0" role="button" class="btn">
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
                    <Checkbox
                        text="Show Description"
                        bind:checked={showDescription}
                    />
                    <Checkbox text="Show Tags" bind:checked={showTags} />
                    <Checkbox text="Show Date" bind:checked={showDate} />
                    <Checkbox text="Show Lists" bind:checked={showLists} />
                </ul>
            </div>
        </div>
    </div>
    <!-- Bookmark List -->
    <Bookmarks bookmarks={$bookmarkStore}></Bookmarks>
</section>

<style lang="scss">
</style>
