<script lang="ts">
    import Collections from "$lib/components/Collections.svelte";
    import { getListStore } from "$lib/state/list.svelte.js";
    import { getUserState } from "$lib/state/user.svelte.js";
    const user = getUserState();
    const listStore = getListStore();
    let { data } = $props();
    let openStates = $state<boolean[]>([true, false]);
    listStore.set(data.lists || []);
</script>

<section class="section-base sm:p-5 p-2 pt-5">
    <h1
        class="text-xl sm:text-2xl font-semibold tracking-tight text-center sm:text-left text-base-content text-pretty uppercase sm:mb-8 mb-5"
    >
        Welcome {user.name}!
    </h1>
    <div class="collapse collapse-arrow bg-base-100 mb-4">
        <input type="checkbox" bind:checked={openStates[0]} />
        <div class="collapse-title font-semibold flex items-center gap-2">
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
                class="lucide lucide-notebook-icon lucide-notebook"
                ><path d="M2 6h4" /><path d="M2 10h4" /><path
                    d="M2 14h4"
                /><path d="M2 18h4" /><rect
                    width="16"
                    height="20"
                    x="4"
                    y="2"
                    rx="2"
                /><path d="M16 2v20" /></svg
            >
            <h2 class="text-lg text-warning">Your Collections</h2>
        </div>
        <div class="collapse-content text-sm shadow-2xl px-0">
            <Collections lists={$listStore} />
        </div>
    </div>

    <div class="collapse collapse-arrow bg-base-100">
        <input type="checkbox" bind:checked={openStates[1]} />
        <div class="collapse-title font-semibold flex items-center gap-2">
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
                class="lucide lucide-star-icon lucide-star"
                ><path
                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                /></svg
            >
            <h2 class="text-lg">Your Favourites</h2>
        </div>
        <div class="collapse-content text-sm shadow-2xl px-0">
            <p class="p-4 pb-2 text-sm opacity-60 tracking-wide">
                Favourites are not implemented yet.
            </p>
        </div>
    </div>
</section>

<style lang="scss">
</style>
