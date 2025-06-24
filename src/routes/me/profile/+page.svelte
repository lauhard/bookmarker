<script lang="ts">
    import { getUserState } from "$lib/state/user.svelte";
    const user = getUserState();
</script>

<h1><span class="userName">{user.name}</span> Profile</h1>

<style lang="scss">
</style>
