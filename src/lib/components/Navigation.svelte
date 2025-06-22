<script lang="ts">
    import Avatar from "./Avatar.svelte";
    let {
        children = null,
        user,
        showAsideProfile = $bindable(false),
        showAsideMenu = $bindable(false),
    } = $props();
</script>

<nav class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
        {#if user && user.name !== ""}
            <button
                tabindex="0"
                aria-label="Open Menu"
                class="btn btn-ghost lg:hidden"
                onclick={() => {
                    showAsideMenu = true;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
            </button>
        {/if}

        <a
            class="btn btn-ghost text-xl w-fit text-primary flex items-center justify-center align-middle text-center vertical-center leading-snug"
            href="/bookmarks"
            >Book<svg
                class="inline w-[1em] align-middle text-accent text-center"
                height="auto"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16 4H24L32 14L40 4H48C50.2091 4 52 5.79086 52 8V56L33 46L12 60V8C12 5.79086 13.7909 4 16 4Z"
                    fill="currentColor"
                />
            </svg>
            arker</a
        >
        <div class="navbar-center hidden lg:flex">
            {#if user && user.name !== ""}
                <ul
                    class="menu menu-horizontal text-center flex items-center justify-center vertical-center align-middle text-md text-base-content/75 font-semibold"
                >
                    <li><a href="/dashboard">Dashboard</a></li>
                </ul>
            {/if}
        </div>
    </div>

    <div class="navbar-end">
        {#if children != null}
            {@render children()}
        {/if}

        {#if user && user.name !== ""}
            <button
                class="dropdown dropdown-end mr-2"
                onclick={() => {
                    showAsideProfile = true;
                }}
            >
                <Avatar {user} />
            </button>
        {:else}
            <ul class="menu menu-horizontal px-1 hidden min400-flex m-0">
                <li class="mr-1"><a href="/login" class="btn">Login</a></li>
                <li>
                    <a href="/signup" class="btn">SignUp</a>
                </li>
            </ul>
        {/if}
    </div>
</nav>

<style lang="scss">
    a {
        text-transform: uppercase;
    }
    @media (min-width: 400px) {
        .min400-flex {
            display: flex;
        }
    }
</style>
