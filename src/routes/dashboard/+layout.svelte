<script lang="ts">
    let { children } = $props();
</script>

<section class="dashboard">
    {@render children()}
</section>

<style lang="scss">
    .dashboard {
        display: flex;
        flex-direction: column;
        align-self: center;
        height: 100%;
        margin-inline: var(--side);
        margin-top: 1rem;
        padding: 1.5rem 2rem;
        max-width: var(--content-width);
        width: 100%;
        box-sizing: border-box;
        background-color: rgba(27, 24, 24, 0.521);
        border-radius: 1rem;
        min-height: 200px;
    }
</style>
