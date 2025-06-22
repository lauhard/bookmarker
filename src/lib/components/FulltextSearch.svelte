<script lang="ts">
    import { debounce, onLoadFavicon } from "$lib";
    import { searchBookmarks } from "$lib/api";
    import { getUserState } from "$lib/state/user.svelte";
    import { getUserSettingStore } from "$lib/state/userSetting.svelte";
    import type { ListBookmark } from "../../app";
    import Modal from "./Modal.svelte";

    let { showSearchModal = $bindable() } = $props();
    let userSettingStore = getUserSettingStore();

    let qury = $state("");
    let searchResults = $state<ListBookmark[]>([]);
    let searchInput = $state({} as HTMLInputElement);
    let user = getUserState();
    let searchText = $state("thinking...");
    let isSearching = $state(false);
    //auto focus on search input when modal is opened
    $effect(() => {
        (async () => {
            if (showSearchModal) {
                await new Promise((r) => setTimeout(r, 100));

                searchInput.focus();
            }
        })();
    });

    $effect(() => {
        // make effect asynchronous
        (async () => {
            if (qury !== "" && showSearchModal) {
                isSearching = true;
                searchText = `Thinking... ${qury}`;
                debounce(async () => {
                    const res = await searchBookmarks(user.id, qury);
                    if (res.ok) {
                        searchResults = res.data;
                        if (res.data.length === 0) {
                            searchText = `No bookmarks found for "${qury}"`;
                        }
                        isSearching = false;
                    } else {
                        console.error(
                            "Error searching bookmarks:",
                            res.statusText,
                        );
                        searchText = `Error searching bookmarks: ${res.statusText}`;
                        isSearching = false;
                    }
                }, 500)();
            } else {
                searchText = "Type to search bookmarks";
                searchResults = [];
            }
        })();
    });
</script>

<Modal bind:showModal={showSearchModal} styleDialog=" absolute top-20">
    <h2 class="text-2xl font-semibold mb-4 mt-4 text-primary">
        Search Bookmarks
    </h2>
    <input
        bind:this={searchInput}
        id="searchInput"
        type="search"
        name="query"
        class="input input-md w-full mb-4"
        placeholder="Search Bookmarks"
        autocomplete="off"
        aria-label="Search Bookmarks"
        aria-describedby="searchInput"
        required
        bind:value={qury}
    />
    <ul
        class="list bg-base-100 max-h-80 shadow-md rounded-box overflow-y-scroll"
    >
        {#if qury !== "" && isSearching}
            <li class="p-4 text-center text-accent">
                {searchText}
            </li>
        {/if}
        {#if searchResults.length === 0 && qury !== "" && !isSearching}
            <li class="p-4 text-center text-accent">
                {searchText}
            </li>
        {/if}
        {#each searchResults as result}
            <li
                class=" ml-2 border-b border-base-300 py-2 flex flex-col vertical-center"
            >
                <div
                    class="flex flex-row space-between vertical-center w-full h-fit"
                >
                    <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link link-secondary text-lg py-2 w-full capitalize flex flex-1 flex-row items-center gap-2"
                        onclick={() => (showSearchModal = false)}
                    >
                        <div
                            class="flex-shrink-0 align-center text-center vertical-center justify-center h-fit"
                        >
                            <img
                                onload={(event) =>
                                    onLoadFavicon(event, result.url)}
                                class="size-6 rounded-md object-cover flex align-center self-center justify-center"
                                src={`https://www.google.com/s2/favicons?domain=${new URL(result.url).hostname}&sz=64`}
                                alt="Favicon für {result.pageTitle}"
                            />
                        </div>
                        <span>{result.pageTitle}</span>
                    </a>
                    <a
                        class="btn btn-ghost btn-xs flex items-center text-primary justify-center h-full mt-2 px-5 py-1"
                        onclick={() => (showSearchModal = false)}
                        href="/bookmarks/{result.id}"
                        aria-label="Edit bookmark"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
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
                        ></a
                    >
                </div>
                {#if $userSettingStore[0]?.showDescription}
                    <p class="text-base-content/80">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Debitis ut incidunt in quibusdam cum dolor
                        necessitatibus qui vero, ullam repudiandae quo, suscipit
                        architecto at esse laudantium aliquam, mollitia
                        recusandae. Architecto.
                    </p>
                {/if}
            </li>
        {/each}
    </ul>
</Modal>

<style lang="scss"></style>
