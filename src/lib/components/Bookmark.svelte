<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { type ActionResult } from "@sveltejs/kit";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { getBookmarkStore } from "$lib/state/bookmarks.svelte";
    import { getUserSettingStore } from "$lib/state/userSetting.svelte";
    import { isValidGoogleFavicon, onLoadFavicon } from "$lib";
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
    <li
        out:fly={{ x: -100, opacity: 0, duration: 300, easing: cubicOut }}
        class="list-none"
    >
        <article
            class="flex flex-col sm:flex-row items-start gap-3 mb-2 sm:gap-4 p-3 pb-0 sm:p-4 bg-base-200/50 hover:bg-base-200 border-base-300/70 border hover:rounded-xl transition-all duration-300"
            aria-labelledby="bookmark-title-{bookmark.id}"
        >
            <div class="flex-1 flex flex-col min-w-0 w-full">
                <header
                    class="flex flex-row border-base-300/70 pb-4 {Object.values(
                        $settingStore[0],
                    ).filter((e) => e == false).length == 4
                        ? 'sm:border-b'
                        : 'border-b'}"
                >
                    <div class="flex items-center flex-1 gap-5 flex-row">
                        <div class="flex-shrink-0">
                            <img
                                onload={(event) =>
                                    onLoadFavicon(event, bookmark.url)}
                                class="size-10 sm:size-12 rounded-md object-cover"
                                src={`https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=64`}
                                alt="Favicon für {bookmark.pageTitle}"
                            />
                        </div>
                        <div class="flex flex-1 flex-col">
                            <!-- Title -->
                            <a
                                id="bookmark-title-{bookmark.id}"
                                href={bookmark.url}
                                class="text-base sm:text-lg font-bold text-primary underline break-words capitalize"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {bookmark.pageTitle}
                            </a>
                            <!-- Date -->
                            {#if $settingStore[0]?.showDate}
                                <p class="text-xs text-base-content/60 mt-1">
                                    {new Date(
                                        bookmark.createdAt,
                                    ).toLocaleDateString("de-DE", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            {/if}
                        </div>
                    </div>
                    <!-- Action Buttons (volle Höhe)-->
                    <div
                        class="hidden sm:flex flex-row justify-end items-center self-start"
                    >
                        <a
                            href={`/bookmarks/${bookmark.id}`}
                            class="btn btn-ghost text-primary btn-xs w-fit m-0 p-0 py-4 px-2"
                            aria-label="edit"
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
                        >
                            <button
                                type="submit"
                                class="btn btn-ghost text-error btn-xs w-fit m-0 p-0 py-4 px-2"
                                aria-label="Löschen"
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
                </header>
                <!-- bdody + footer -->
                <div class=" flex flex-col justify-around">
                    {#if $settingStore[0]?.showDescription}
                        <!-- article body-->
                        <div
                            class="ml-0 sm:ml-17 justify-center flex flex-col h-fit mt-2"
                        >
                            <!-- Description -->
                            <p
                                class="text h-full w-full text-sm text-base-content/80 leading-relaxed"
                            >
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Alias perferendis debitis quis
                                eum dolore officia, aspernatur, recusandae
                                molestias ipsa atque aut, perspiciatis porro
                                ipsum voluptas nihil sed quasi delectus rem.
                            </p>
                        </div>
                    {/if}
                    {#if $settingStore[0]?.showTags || $settingStore[0]?.showLists}
                        <footer
                            class="ml-0 sm:ml-17 flex flex-1 flex-col vertical-center text-center gap-2 my-2 sm:mb-0"
                        >
                            <!-- Tags -->
                            {#if $settingStore[0]?.showTags}
                                <div class="flex flex-wrap items-center gap-2">
                                    <span
                                        class="text-xs font-semibold text-base-content/50 uppercase"
                                        >Tags</span
                                    >
                                    <div
                                        class="badge md:badge-md badge-sm badge-outline badge-accent"
                                    >
                                        #security
                                    </div>
                                    <div
                                        class="badge md:badge-md badge-sm badge-outline badge-accent"
                                    >
                                        #dev
                                    </div>
                                </div>
                            {/if}
                            <!-- Lists -->
                            {#if $settingStore[0]?.showLists}
                                <div class="flex flex-wrap items-center gap-2">
                                    <span
                                        class="text-xs font-semibold text-base-content/50 uppercase"
                                        >Collections</span
                                    >
                                    {#each lists as list}
                                        <span
                                            class="badge md:badge-md badge-sm badge-outline text-xs uppercase text-base-content/60"
                                            class:badge-unlocked={list.isPublic ===
                                                true}
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
                                                    ><circle
                                                        cx="12"
                                                        cy="16"
                                                        r="1"
                                                    /><rect
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
                        </footer>
                    {/if}
                </div>
                <!-- Footer -->

                <!-- Action Buttons mobile -->
                <div
                    class=" border-t border-base-300/70 flex justify-end gap-0 sm:hidden p-0 m-0 py-2"
                >
                    <a
                        href={`/bookmarks/${bookmark?.id}`}
                        class="btn btn-xs btn-ghost h-10 text-primary"
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
                        class="inline m-0 p-0 w-fit h-fit"
                    >
                        <button
                            type="submit"
                            class="btn btn-xs btn-ghost h-10 hover:bg-base-300 text-error"
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
        </article>
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
