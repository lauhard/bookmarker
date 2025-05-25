<script lang="ts">
	import BookmarkList from '$lib/components/BookmarkList.svelte';
	import Search from '$lib/components/Search.svelte';

	interface Bookmark {
		id: number;
		url: string;
		page_title: string;
		description?: string;
		created_at: string;
		categories?: string[];
		tags?: string[];
	}

	interface PageData {
		bookmarks: Array<Bookmark>;
	}
	let { data }: { data: PageData } = $props();
	let bookmarks: Array<Bookmark> = data.bookmarks;
</script>

<section class="w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
	<!-- Header + CTA -->
	<header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
		<h1 class="text-3xl sm:text-4xl font-light tracking-tight text-center sm:text-left text-base-content">
			<span class="tabular-nums font-mono mr-2">{bookmarks.length}</span>Bookmarks
		</h1>

		<div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center sm:justify-end">
			<a href="/bookmarks/add"
				class="btn btn-primary btn-md rounded-2xl gap-2 w-full sm:w-auto">
				<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10" />
					<path d="M8 12h8" />
					<path d="M12 8v8" />
				</svg>
				New Bookmark
			</a>

			<a href="/bookmarks/import"
				class="btn btn-success btn-md rounded-2xl gap-2 w-full sm:w-auto">
				<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 10v6" />
					<path d="M9 13h6" />
					<path
						d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
				</svg>
				New List
			</a>
		</div>
	</header>

	<!-- Search Input -->
	<Search />

	<!-- Bookmark List -->
	<BookmarkList {bookmarks} />
</section>
<style lang="scss">
    .section-base {
        display: flex;
        width: 100%;
        align-items: center;
        height: max-content;
    }
</style>