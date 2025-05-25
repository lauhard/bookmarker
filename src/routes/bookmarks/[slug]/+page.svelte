<script lang="ts">
	import { getUserState } from "$lib/state.svelte";
	import { applyAction, enhance } from "$app/forms";
	import { type ActionResult } from "@sveltejs/kit";
	import { goto } from "$app/navigation";

	let { data }: { data: Bookmark } = $props();
	let bookmark: Bookmark = $state(data.bookmark);
	let user = getUserState();

	let url = $state(bookmark?.url || "");
	let title = $state(bookmark?.page_title || "");
	let tags = $state(bookmark?.tags || "");
	let category = $state(bookmark?.category || "");
	let notes = $state(bookmark?.notes || "");
	let favorite = $state(bookmark?.favorite || false);
    let action = $state(bookmark ? "?/update" : "?/create");

	const formEnhance = () => {
		return async ({ result }: { result: ActionResult }) => {
			if (result.type !== "success") {
				await applyAction(result);
			} else {
				const { bookmarkID } = result.data as { bookmarkID?: string };
				await goto(`/bookmarks`, {
					invalidateAll: true
				});
			}
		};
	};
</script>

<section class="w-full px-4 sm:px-6 lg:px-12 xl:px-20 max-w-screen-xl mx-auto">
	<h1 class="text-2xl sm:text-3xl font-light text-center mb-6 dark:text-white">
		{bookmark ? title : (title === "" ? "Neues Lesezeichen" : title)}
	</h1>

	<form action="{action}" method="POST" use:enhance={formEnhance}
    class="space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow p-6">
		<fieldset class="space-y-4">
			{#if bookmark}
				<input type="hidden" name="bookmarkID" value={bookmark?.id} />
			{/if}
			{#if bookmark == null}
				<input type="hidden" name="userID" value={user.id} />
			{/if}

			<div>
				<label for="url" class="block text-sm font-medium text-zinc-700 dark:text-zinc-200">URL</label>
				<input id="url" name="url" type="url" bind:value={url} required autocomplete="url" placeholder="https://example.com"
					class="mt-1 w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
			</div>

			<div>
				<label for="title" class="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Titel</label>
				<input id="title" name="title" type="text" bind:value={title} required placeholder="Seitentitel"
					class="mt-1 w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
			</div>

			<div>
				<label for="tags" class="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Tags</label>
				<input id="tags" name="tags" type="text" bind:value={tags} placeholder="z. B. frontend, svelte, dev"
					class="mt-1 w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
			</div>

			<div>
				<label for="category" class="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Kategorie</label>
				<input id="category" name="category" type="text" bind:value={category} placeholder="z. B. Tutorials, Tools, Docs"
					class="mt-1 w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
			</div>

			<div>
				<label for="notes" class="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Notizen</label>
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<textarea id="notes" name="notes" bind:value={notes} rows="3" placeholder="Optional – persönliche Gedanken oder Zusammenfassung"
					class="mt-1 w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
			</div>

			<div class="flex items-center gap-2">
				<input id="favorite" name="favorite" type="checkbox" bind:checked={favorite}
					class="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-zinc-800 dark:border-zinc-600" />
				<label for="favorite" class="text-sm text-zinc-700 dark:text-zinc-300">Als Favorit markieren</label>
			</div>

			<div class="pt-4 text-right">
				<button type="submit"
					class="inline-flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition">
					Speichern
				</button>
			</div>
		</fieldset>
	</form>
</section>

<style lang="scss">
    .section-base {
        display: flex;
        width: 100%;
        align-items: center;
    }
</style>