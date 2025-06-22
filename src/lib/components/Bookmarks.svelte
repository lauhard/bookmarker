<script lang="ts">
    import Bookmark from "$lib/components/Bookmark.svelte";
    import type { ListBookmark } from "../../app";
    let { bookmarks = [] }: { bookmarks: Array<ListBookmark> | [] } = $props();
</script>

{#if bookmarks.length === 0}
    <div class="text-center py-16">
        <p class="text-base-content/70 text-lg mb-4">No Bookmarks found</p>
        <a href="/bookmarks/add" class="btn btn-primary">Add Bookmark</a>
    </div>
{:else}
    <ul class="list bg-base-100 shadow-md rounded-lg overflow-hidden">
        <li
            class="w-full p-4 pb-2 text-base opacity-70 flex flex-row space-between items-center"
        >
            <div>
                Created Bookmarks
                <span class="text-accent">({bookmarks.length})</span>
            </div>
        </li>
        {#each bookmarks as bookmark (bookmark?.id)}
            <Bookmark {bookmark} />
        {/each}
    </ul>
{/if}
