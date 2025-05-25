<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { type ActionResult } from "@sveltejs/kit";
	import { goto, invalidateAll } from "$app/navigation";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	let { bookmark } = $props();

	const tags = bookmark?.tags ?? ['tag1', 'tag2'];
	const categories = bookmark?.categories ?? ['Liste A'];
	const description = bookmark?.description ?? 'Keine Beschreibung vorhanden.';
    let isDeleting = $state(false);
    const formEnhance = () => {
		return async ({ result }: { result: ActionResult }) => {
			if (result.type !== "success") {
				await applyAction(result);
			} else {
				isDeleting = true;
			    // Warten auf das Fade-out-Ende (300ms passt zur Transition)
                await new Promise((r) => setTimeout(r, 300));
                await goto(`/bookmarks`, {
                    noScroll: true,
                    invalidateAll: true
                });
                window.location.reload();
			}
		};
	};
</script>
{#if !isDeleting}
<li
    out:fly={{ x: -100, opacity: 0, duration: 300, easing: cubicOut }}
	class="bg-base-200 border border-base-300 rounded-xl hover:shadow transition duration-200 px-4 py-3">
	<div class="flex flex-col sm:flex-row gap-4">
		<!-- Icon -->
		<img
			class="size-14 sm:size-16 rounded-lg object-cover shrink-0 mt-1"
			src="https://img.daisyui.com/images/profile/demo/3@94.webp"
			alt="Bookmark Icon"
		/>

		<!-- Content -->
		<div class="flex-1 flex flex-col justify-between space-y-1 text-[15px] leading-snug">
			<div>
				<h2 class="text-lg font-semibold text-primary mb-0.5">{bookmark?.page_title}</h2>
				<a
					href={bookmark?.url}
					class="link break-all text-sm text-base-content/80"
					target="_blank"
					rel="noopener noreferrer"
				>
					{bookmark?.url}
				</a>
				<p class="text-sm text-base-content/70 mt-1">{description}</p>
			</div>

			<!-- Badges -->
			<div class="flex flex-wrap gap-1 pt-1">
				{#each categories as cat}
					<span class="badge badge-outline badge-primary text-xs">{cat}</span>
				{/each}
				{#each tags as tag}
					<span class="badge badge-outline text-xs">{tag}</span>
				{/each}
			</div>

			<div class="text-xs opacity-50">
				{bookmark?.created_at ? new Date(bookmark.created_at).toLocaleDateString('en-GB') : ''}
			</div>
		</div>

		<!-- Action Buttons (volle Höhe) -->
		<div class="flex sm:flex-col flex-row justify-start sm:justify-between items-center gap-2 pl-0 sm:pl-2 pt-2 sm:pt-0">
			<a href={bookmark?.url} target="_blank" class="btn btn-sm btn-ghost h-10" aria-label="Open">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
				</svg>
			</a>

			<a href={`/bookmarks/${bookmark?.id}`} class="btn btn-sm btn-ghost h-10" aria-label="Edit">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
					<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
					<path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
				</svg>
			</a>


            <form method="POST" action={`/bookmarks/${bookmark.id}/?/delete`} use:enhance={formEnhance} class="inline">
                <button type="submit" class="btn btn-sm btn-ghost h-10" aria-label="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
                    </svg>
                </button>
            </form>

			<button class="btn btn-sm btn-ghost h-10" aria-label="Favorite">
				<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
				</svg>
			</button>
		</div>
	</div>
</li>
{/if}

<style lang="scss">
    .list-row {
        .page-title {
            font-size: 0.9rem;
            font-weight: 800;
            color: #dfae27;
        }
        a:hover{ color: #dfae27;}
    }
</style>
