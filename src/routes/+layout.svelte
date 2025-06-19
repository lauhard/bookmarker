<script lang="ts">
    import {
        invalidateAll,
        beforeNavigate,
        goto,
        invalidate,
    } from "$app/navigation";
    import Search from "$lib/components/Search.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import { applyAction, enhance } from "$app/forms";
    import type { ActionResult } from "@sveltejs/kit";

    import Navigation from "$lib/components/Navigation.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { setUserState } from "$lib/state/user.svelte";
    import "../style.css";
    import "../app.css";
    import type { ApiResponse, ListBookmark, User } from "../app";
    import Aside from "$lib/components/Aside.svelte";
    import {
        Navigation as navigationRoutes,
        Profile as profileRoutes,
    } from "$lib/routes";
    import { page } from "$app/state";
    import { setBookmarkStore } from "$lib/state/bookmarks.svelte";
    import { setListStore } from "$lib/state/list.svelte";
    import Fab from "$lib/components/Fab.svelte";
    import { searchBookmarks } from "$lib/api";
    import { browser } from "$app/environment";
    import { setUserSettingStore } from "$lib/state/userSetting.svelte";

    let { data, children } = $props();
    let user = setUserState(data.user as User);
    const bookmarkStore = setBookmarkStore();
    const listStore = setListStore();
    const settingStore = setUserSettingStore();

    let showCollectionModal = $state(false);
    let showSearchModal = $state(false);
    let showAsideProfile = $state(false);
    let showAsideMenu = $state(false);
    let isPublic = $state(false);
    let collectionId = $state("");
    let qury = $state("");
    let searchResults = $state<ListBookmark[]>([]);
    let searchInput = $state({} as HTMLInputElement);

    const onKeydown = (event: KeyboardEvent) => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const isModKey = isMac ? event.metaKey : event.ctrlKey;

        if (isModKey && event.key.toLowerCase() === "k") {
            event.preventDefault();
            showSearchModal = true;
        }
    };

    $effect(() => {
        if (page.url.searchParams) {
            collectionId = page.url.searchParams.get("collectionId") || "";
        }
    });

    $effect(() => {
        if (qury !== "" && showSearchModal) {
            (async () => {
                const res = await searchBookmarks(user.id, qury);
                if (res.ok) {
                    console.log("Search results:", res.data);
                    searchResults = res.data;
                } else {
                    console.error("Error searching bookmarks:", res.statusText);
                }
            })();
        }
    });

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
                console.error("Error on saving bookmark:", result);
                await applyAction(result);
            } else {
                console.log("List created successfully:", result);
                const listData = result.data; //TODO: FIX result data
                listStore.add({
                    id: listData?.data?.id,
                    name: formData.get("name") as string,
                    isPublic: isPublic,
                });
                await invalidateAll(); // Reload all data to reflect the new bookmark
                // Reload the page to reflect the new bookmark
                showCollectionModal = false;
            }
        };
    };
</script>

<svelte:window onkeydown={onKeydown} />

<Modal bind:showModal={showCollectionModal}>
    <h2 class="text-2xl font-semibold mb-4 mt-4 text-primary">
        Create new List
    </h2>
    <form
        class="flex flex-col"
        method="POST"
        action="/lists/?/create"
        use:enhance={formEnhance}
    >
        <!-- list public -->
        <div class="form-control mb-4">
            <label class="label cursor-pointer">
                <span class="label-text" class:public={isPublic}
                    >Public List</span
                >
                <input
                    type="checkbox"
                    name="isPublic"
                    value={isPublic}
                    class="toggle toggle-accent"
                    checked={isPublic}
                    onchange={() => (isPublic = !isPublic)}
                />
            </label>
            <p class="text-sm text-accent mt-1">
                A public list can be viewed by anyone. Uncheck to make it
                private.
            </p>
        </div>

        <label for="name" class="label">List Name</label>
        <div class="flex flex-row flex-wrap items-start gap-4">
            <div class="flex-[1_1_200px] grow">
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter list name"
                    class="input input-md w-full"
                    required
                />
                <p class="text-sm text-accent mt-1">
                    Please enter a unique name for your list.
                </p>
            </div>
            <button type="submit" class="btn btn-primary">Create List</button>
        </div>
    </form>
</Modal>

<!-- modal search -->
<Modal bind:showModal={showSearchModal} styleDialog=" absolute top-20">
    <h2 class="text-2xl font-semibold mb-4 mt-4 text-primary">
        Search Bookmarks
    </h2>
    <input
        bind:this={searchInput}
        type="search"
        name="query"
        class="input input-md w-full mb-4"
        placeholder="Search Bookmarks"
        required
        autofocus
        bind:value={qury}
    />
    <ul
        class="list bg-base-100 max-h-80 shadow-md rounded-box overflow-y-scroll"
    >
        {#if searchResults.length === 0 && qury !== ""}
            <li class="p-4 text-center text-accent">
                No results found for "{qury}"
            </li>
        {/if}
        {#each searchResults as result}
            <li
                class=" ml-2 border-b border-base-300 py-2 flex flex-row items-center justify-between"
            >
                <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link link-secondary text-md md:text-lg py-2 w-full capitalize"
                    onclick={() => (showSearchModal = false)}
                >
                    {result.pageTitle}
                </a>
            </li>
        {/each}
    </ul>
</Modal>

<Aside routes={profileRoutes} fromLeft={false} bind:show={showAsideProfile}
></Aside>

<Aside routes={navigationRoutes} bind:show={showAsideMenu}></Aside>

<div class="app bg-base-300">
    <header class="  sticky top-0 z-50 shadow bg-base-100">
        <Navigation {user} bind:showAsideProfile bind:showAsideMenu>
            {#if user && user.name !== ""}
                <div
                    class="hidden lg:flex flex-col sm:flex-row mx-auto w-full sm:justify-end gap-6 pr-2 bg-base-100"
                >
                    <div
                        class="flex flex-col sm:flex-row gap-2 ws-full sm:w-auto justify-center sm:justify-end"
                    >
                        <a
                            href={collectionId
                                ? `/bookmarks/add?collectionId=${collectionId}`
                                : "/bookmarks/add"}
                            class="btn btn-primary btn-md w-full sm:w-auto"
                            aria-label="New Bookmark"
                            title="New Bookmark"
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
                                class="lucide lucide-circle-plus-icon lucide-circle-plus"
                                ><circle cx="12" cy="12" r="10" /><path
                                    d="M8 12h8"
                                /><path d="M12 8v8" /></svg
                            >
                            New Bookmark
                        </a>
                        <button
                            type="button"
                            class="btn btn-accent btn-md w-full sm:w-auto"
                            onclick={() => (showCollectionModal = true)}
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
                                class="lucide lucide-folder-plus-icon lucide-folder-plus"
                                ><path d="M12 10v6" /><path d="M9 13h6" /><path
                                    d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                                /></svg
                            >
                            New Collection
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
