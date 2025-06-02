<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import Footer from "$lib/components/Footer.svelte";

    import { setUserState } from "$lib/state.svelte";
    import "../style.css";
    import "../app.css";
    import type { User } from "../app";
    interface PageData {
        user: User;
    }

    let { data, children }: { data: PageData; children: any } = $props();
    let user = setUserState(data.user as User);
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
        width: 100%;
        header {
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            width: 100%;
        }
    }
</style>
