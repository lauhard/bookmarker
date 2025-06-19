<script lang="ts">
    let { showModal = $bindable(false), collectionId } = $props();
</script>

<nav class="fixed bottom-0 inset-x-0 bg-base-100 border-t border-base-300">
    <ul class="flex justify-around">
        <li>
            <a
                href={collectionId
                    ? `/bookmarks/add?collectionId=${collectionId}`
                    : "/bookmarks/add"}
                class="btn btn-primary btn-sm w-full sm:w-auto"
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
                    ><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path
                        d="M12 8v8"
                    /></svg
                >
                New Bookmark
            </a>
        </li>
        <li>
            <button
                type="button"
                class="btn btn-accent btn-sm w-full sm:w-auto"
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
</nav>
