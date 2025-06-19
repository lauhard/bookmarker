<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { type ActionResult } from "@sveltejs/kit";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { getListStore } from "$lib/state/list.svelte";

    let { editMode = $bindable(), list } = $props();
    let isDeleting = $state(false);
    let listStore = getListStore();
    const formEnhance = () => {
        return async ({ result }: { result: ActionResult }) => {
            if (result.type !== "success") {
                await applyAction(result);
            } else {
                isDeleting = true;
                // Warten auf das Fade-out-Ende (300ms passt zur Transition)
                await new Promise((r) => setTimeout(r, 300));
                listStore.remove(list.id);
            }
        };
    };
</script>

{#if !isDeleting}
    <li
        out:fly={{ x: -100, opacity: 0, duration: 300, easing: cubicOut }}
        class="list-row hover:bg-base-200 transition-colors duration-300"
    >
        <div>
            <!-- svelte-ignore a11y_missing_attribute -->
            <img
                class="size-10 rounded-box mt-2"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
        </div>
        <div>
            <h2 class="text-lg font-semibold text-primary capitalize">
                {list?.name}
            </h2>
            <div
                class="badge badge-sm badge-outline text-xs uppercase text-base-content/60"
                class:isPublic={list.isPublic}
            >
                {list.isPublic ? "Public" : "Privat"}
            </div>
        </div>
        <div class="flex flex-row justify-center items-center vertical-center">
            {#if editMode}
                <form
                    method="POST"
                    action={`/lists/${list.id}/?/delete`}
                    use:enhance={formEnhance}
                    class="flex items-center"
                >
                    <button
                        type="submit"
                        class="btn btn-square btn-ghost text-error hover:text-error-focus"
                        aria-label="Delete List"
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
                            class="lucide lucide-circle-x-icon lucide-circle-x"
                            ><circle cx="12" cy="12" r="10" /><path
                                d="m15 9-6 6"
                            /><path d="m9 9 6 6" /></svg
                        >
                    </button>
                </form>
            {/if}
            <a
                href={`/bookmarks?collectionId=${list.id}`}
                class="btn btn-square btn-ghost flex items-center justify-center text-primary hover:text-primary-focus"
                aria-label="Bookmarks for this Collection"
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
                    class="lucide lucide-folder-open-icon lucide-folder-open"
                    ><path
                        d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
                    /></svg
                >
            </a>
        </div>
    </li>
{/if}

<style lang="scss">
    .isPublic {
        color: var(--color-accent);
    }
</style>
