<script lang="ts">
    import { getUserState } from "$lib/state.svelte";
    let user = getUserState();
</script>

<section class="section-base ">
    <h1 class="text-3xl mt-10 mb-5">Bookmarker.io</h1>
    <p class="my-3 uppercase text-l">
        The last bookmark manager you'll ever need.
    </p>
</section>

<style lang="scss">
    .section-base {
        background:transparent;
        justify-content: center;
        align-items: center;
    }

</style>
