<script lang="ts">
    import Collections from "$lib/components/Collections.svelte";
    import { getListStore } from "$lib/state/list.svelte.js";

    let { data } = $props();
    const listStore = getListStore();
    listStore.set(data.lists || []);
</script>

<section class="section-base sm:p-5 p-2 pt-5">
    <h1
        class="text-3xl sm:text-4xl font-light tracking-tight text-center sm:text-left text-base-content pb-8"
    >
        Manage Your Collections
    </h1>
    <Collections lists={$listStore}></Collections>
</section>

<style lang="scss">
</style>
