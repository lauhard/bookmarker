<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { type ActionResult } from "@sveltejs/kit";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { getBookmarkStore } from "$lib/state/bookmarks.svelte";
    import { getUserSettingStore } from "$lib/state/userSetting.svelte";
    let { bookmark } = $props();

    //const tags = bookmark?.tags ?? ["tag1", "tag2"];
    const lists = bookmark?.lists ?? ["Liste A"];
    let isDeleting = $state(false);
    let bookmarkStore = getBookmarkStore();
    let settingStore = getUserSettingStore();
    const formEnhance = () => {
        return async ({ result }: { result: ActionResult }) => {
            if (result.type !== "success") {
                await applyAction(result);
            } else {
                isDeleting = true;
                // Warten auf das Fade-out-Ende (300ms passt zur Transition)
                await new Promise((r) => setTimeout(r, 300));
                bookmarkStore.remove(bookmark.id);
                //invalidateAll(); // Invalidate all to refresh the state
            }
        };
    };
</script>

{#if !isDeleting}
    <li out:fly={{ x: -100, opacity: 0, duration: 300, easing: cubicOut }}>
        <div
            class="list-row hover:bg-base-200 transition-colors duration-300 flex flex-row p-3"
        >
            <div class="flex flex-col sm:flex-row gap-4"></div>
            <img
                class="size-10 sm:size-10 rounded-lg object-cover shrink-0 mt-1"
                src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                alt="Bookmark Icon"
            />
            <div
                class="flex-1 flex flex-col min-w-0 gap-0 space-y-1 text-[15px] leading-snug"
            >
                <a
                    href={bookmark?.url}
                    class="link w-full block overflow-hidden text-ellipsis lg:whitespace-nowrap capitalize text-sm sm:text-lg text-primary font-bold letter-spacing-wide page-title"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {bookmark?.pageTitle}
                </a>

                <!-- Date -->
                {#if $settingStore[0]?.showDate}
                    <span class="date text-xs">{bookmark?.createdAt}</span>
                {/if}

                <!-- Tags -->
                {#if $settingStore[0]?.showTags}
                    <div class="flex flex-row flex-wrap gap-1">
                        <div
                            class="badge badge-sm badge-outline text-yellow-600"
                        >
                            #security
                        </div>
                        <div
                            class="badge badge-sm badge-outline text-yellow-600"
                        >
                            #dev
                        </div>
                    </div>
                {/if}

                <!-- Description -->
                {#if $settingStore[0]?.showDescription}
                    <div class="text-base-content/60 text-sm">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Alias perferendis debitis quis eum dolore
                            officia, aspernatur, recusandae molestias ipsa atque
                            aut, perspiciatis porro ipsum voluptas nihil sed
                            quasi delectus rem.
                        </p>
                    </div>
                {/if}

                <!-- Lists -->
                {#if $settingStore[0]?.showLists}
                    <div class="flex flex-wrap gap-1">
                        {#each lists as list}
                            <span
                                class="badge badge-outline h-fit py-1 text-xs uppercase text-base-content/60"
                                class:badge-unlocked={list.isPublic === true}
                            >
                                {#if list.isPublic === false}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-lock-icon lucide-lock"
                                        ><rect
                                            width="18"
                                            height="11"
                                            x="3"
                                            y="11"
                                            rx="2"
                                            ry="2"
                                        /><path
                                            d="M7 11V7a5 5 0 0 1 10 0v4"
                                        /></svg
                                    >
                                {:else}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-lock-keyhole-open-icon lucide-lock-keyhole-open"
                                        ><circle cx="12" cy="16" r="1" /><rect
                                            width="18"
                                            height="12"
                                            x="3"
                                            y="10"
                                            rx="2"
                                        /><path
                                            d="M7 10V7a5 5 0 0 1 9.33-2.5"
                                        /></svg
                                    >
                                {/if}
                                {list.name}
                            </span>
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- Action Buttons (volle Höhe) -->
            <div class="flex flex-row justify-start pl-0 gap-0 sm:pl-2 sm:pt-0">
                <!--
                 <a
                    href={bookmark?.url}
                    target="_blank"
                    class="btn btn-open btn-sm btn-ghost h-10 hover:bg-base-300 text-accent"
                    aria-label="Open"
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
                        class="lucide lucide-link-icon lucide-link"
                        ><path
                            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                        /><path
                            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                        /></svg
                    >
                </a>
                -->

                <a
                    href={`/bookmarks/${bookmark?.id}`}
                    class="btn btn-edit btn-sm btn-ghost h-10 hover:bg-base-300 text-primary"
                    aria-label="Edit"
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
                        class="lucide lucide-square-pen-icon lucide-square-pen"
                        ><path
                            d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                        /><path
                            d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                        /></svg
                    >
                </a>

                <form
                    method="POST"
                    action={`/bookmarks/${bookmark.id}/?/delete`}
                    use:enhance={formEnhance}
                    class="inline"
                >
                    <button
                        type="submit"
                        class="btn btn-sm btn-ghost h-10 hover:bg-base-300 text-error"
                        aria-label="Delete"
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
            </div>
        </div>
    </li>
{/if}

<style lang="scss">
    .badge-unlocked {
        color: var(--color-accent);
    }
    .btn-open:hover {
        color: var(--color-accent) !important;
    }
    .btn-edit:hover {
        color: var(--color-primary) !important;
    }
</style>
