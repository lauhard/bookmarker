<script lang="ts">
    let { showModal = $bindable(false), collectionId } = $props();
</script>

<div class="fixed bottom-6 right-6 z-[99999] bg-transparent flex lg:hidden">
    <div class="dropdown dropdown-top dropdown-end rounded-full shadow-2xl">
        <div
            tabindex="0"
            role="button"
            class="btn btn-warning btn-lg btn-circle text-3xl shadow-2xl"
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
                class="lucide lucide-pencil-icon lucide-pencil"
                ><path
                    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                /><path d="m15 5 4 4" /></svg
            >
        </div>
        <ul
            tabindex="0"
            class="dropdown-content menu p-2 mb-4 shadow-lg bg-base-300/35 rounded-box space-y-2 mt-2 w-48"
            role="menu"
            aria-label="Floating Action Button Menu"
        >
            <li>
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
            </li>
            <li>
                <button
                    type="button"
                    class="btn btn-accent btn-md w-full sm:w-auto"
                    onclick={() => (showModal = true)}
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
            </li>
        </ul>
    </div>
</div>

<style lang="scss">
    .dropdown {
        --tw-bg-opacity: 1;
    }
</style>
