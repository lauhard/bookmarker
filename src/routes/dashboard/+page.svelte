<script lang="ts">
    import { getUserState } from "$lib/state.svelte";
    const user = getUserState();
</script>

<section>
    <h1><span class="userName">{user.name}</span> Bookmarks</h1>
</section>

<style lang="scss">
</style>
