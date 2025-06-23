<script lang="ts">
    import "../style.css";
    import "../app.css";
    import { invalidateAll } from "$app/navigation";
    import { applyAction, enhance } from "$app/forms";
    import type { ActionResult } from "@sveltejs/kit";
    import { setUserState } from "$lib/state/user.svelte";
    import type { ListBookmark, User } from "../app";
    import {
        Navigation as navigationRoutes,
        Profile as profileRoutes,
    } from "$lib/routes";
    import { setListStore } from "$lib/state/list.svelte";
    import { setBookmarkStore } from "$lib/state/bookmarks.svelte";
    import { setUserSettingStore } from "$lib/state/userSetting.svelte";
    import { searchBookmarks } from "$lib/api";

    import Search from "$lib/components/Search.svelte";
    import Navigation from "$lib/components/Navigation.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Aside from "$lib/components/Aside.svelte";
    import Fab from "$lib/components/Fab.svelte";

    import { page } from "$app/state";
    import FulltextSearch from "$lib/components/FulltextSearch.svelte";
    import Collection from "$lib/components/Collection.svelte";
    import CollectionModal from "$lib/components/CollectionModal.svelte";
    let { data, children } = $props();
    let user = setUserState(data.user as User);

    const bookmarkStore = setBookmarkStore();
    const listStore = setListStore();
    const settingStore = setUserSettingStore();

    let showCollectionModal = $state(false);
    let showSearchModal = $state(false);
    let showAsideProfile = $state(false);
    let showAsideMenu = $state(false);
    let collectionId = $state("");

    const onKeydown = (event: KeyboardEvent) => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const isModKey = isMac ? event.metaKey : event.ctrlKey;

        if (isModKey && event.key.toLowerCase() === "f") {
            event.preventDefault();
            showSearchModal = true;
        }
    };

    $effect(() => {
        if (page.url.searchParams) {
            collectionId = page.url.searchParams.get("collectionId") || "";
        }
    });

    let scrollY = $state(0);
</script>

<svelte:window onkeydown={onKeydown} bind:scrollY />

<FulltextSearch bind:showSearchModal></FulltextSearch>

<CollectionModal bind:showCollectionModal></CollectionModal>

<Aside routes={profileRoutes} fromLeft={false} bind:show={showAsideProfile}
></Aside>

<Aside routes={navigationRoutes} bind:show={showAsideMenu}></Aside>

<div class="app bg-base-300">
    <header
        class="  sticky top-0 z-50 border-b {scrollY > 0
            ? 'shadow-md border-black/10 bg-base-300'
            : 'shadow-none border-black/0 bg-base-300'}  transition-all duration-800 ease-in-out"
    >
        <Navigation {user} bind:showAsideProfile bind:showAsideMenu>
            {#if user && user.name !== ""}
                <div
                    class="hidden lg:flex flex-col sm:flex-row mx-auto w-full sm:justify-end gap-6 pr-2"
                >
                    <div
                        class="flex flex-col sm:flex-row gap-2 ws-full sm:w-auto justify-center items-center sm:justify-end"
                    >
                        <a
                            href={collectionId
                                ? `/bookmarks/add?collectionId=${collectionId}`
                                : "/bookmarks/add"}
                            class="btn btn-primary btn-md w-auto uppercase tracking-wider text-xs font-bolder"
                            aria-label="New Bookmark"
                            title="New Bookmark"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-circle-plus-icon lucide-circle-plus"
                                ><circle cx="12" cy="12" r="10" /><path
                                    d="M8 12h8"
                                /><path d="M12 8v8" /></svg
                            >
                            Bookmark
                        </a>
                        <button
                            type="button"
                            class="btn btn-base btn-base btn-md text-base-content/70 w-auto uppercase tracking-wider text-xs font-bolder"
                            onclick={() => (showCollectionModal = true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-folder-plus-icon lucide-folder-plus"
                                ><path d="M12 10v6" /><path d="M9 13h6" /><path
                                    d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                                /></svg
                            >
                            Collection
                        </button>
                    </div>
                </div>
                <div class="mr-2">
                    <Search bind:showModal={showSearchModal} />
                </div>
            {/if}
        </Navigation>
    </header>
    <!-- Search Input -->
    <main class="">
        {@render children()}
    </main>
    {#if user && user.name !== ""}
        <Fab bind:showModal={showCollectionModal} {collectionId}></Fab>
    {/if}
    <Footer />
</div>

<style lang="scss">
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        height: 100%;
        width: 100%;

        header {
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        main {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: max-content;
            margin: auto 0;
            flex-grow: 1;
        }
    }
</style>
