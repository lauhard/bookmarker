<script lang="ts">
    import { flip } from 'svelte/animate';
	let { bookmarks } = $props();
	import Bookmark from '$lib/components/Bookmark.svelte';
</script>

<section class="w-full max-w-5xl mx-auto px-4">
	{#if bookmarks.length === 0}
		<div class="text-center py-16">
			<p class="text-base-content/70 text-lg mb-4">Keine Bookmarks gefunden.</p>
			<a href="/bookmarks/add" class="btn btn-primary">Bookmark hinzufügen</a>
		</div>
	{:else}
		<!-- animate:flip aktiviert das sanfte Neupositionieren -->
		<ul class="space-y-4 mt-10">
			{#each bookmarks as bookmark (bookmark.id)}
				<Bookmark {bookmark} />
			{/each}
		</ul>
	{/if}
</section>

<style lang="scss">
    .bookmark-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }
</style>
