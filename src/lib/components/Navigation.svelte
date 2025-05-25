<script lang="ts">
    import { page } from "$app/state";
    import { getUserState } from "$lib/state.svelte";
    import Avatar from "./Avatar.svelte";
    let { user } = $props();
</script>

<nav class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
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
            </div>
            {#if user && user.name !== ""}
                <ul
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/bookmarks">Bookmarks</a></li>
                </ul>
            {/if}
        </div>
        <a class="btn btn-ghost text-xl" href="/">Bookmarker</a>
    </div>
    <div class="navbar-center hidden lg:flex">
        {#if user && user.name !== ""}
            <ul class="menu menu-horizontal px-1">
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/bookmarks">Bookmarks</a></li>
            </ul>
        {/if}
    </div>
    <div class="navbar-end">
        {#if user && user.name !== ""}
            <div class="dropdown dropdown-end">
                <Avatar {user} />
                <ul
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                    <li>
                        <a
                            class="justify-between"
                            href="/profile"
                        >
                            Profile
                        </a>
                    </li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </div>
        {:else}
            <ul class="menu menu-horizontal px-1">
                <li class="mr-2"><a href="/login" class="btn">Login</a></li>
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
</style>
