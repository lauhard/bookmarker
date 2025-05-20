<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import Footer from "$lib/components/Footer.svelte";

    import { setUserState } from "$lib/state.svelte";
    import "../style.css";
    import "../app.css";

    let { data, children } = $props();
    let user = setUserState(data.user);
</script>

<div class="app">
    <header>
        <Navigation {user} />
    </header>
    <main>
        {@render children()}
    </main>
    <Footer />
</div>

<style lang="scss">
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        height: 100%;
        header {
            position: sticky;
            top: 0;
        }
        main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
        }
    }
</style>
