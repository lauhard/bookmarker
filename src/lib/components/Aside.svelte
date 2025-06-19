<script lang="ts">
    import { page } from "$app/state";

    import type { Route } from "../../app";
    let { routes, fromLeft = true, show = $bindable() } = $props();

    let isActive = (routePath: string) => {
        if (
            page.url.pathname == routePath ||
            (page.url.pathname.includes(routePath.toLocaleLowerCase()) &&
                routePath.toLocaleLowerCase() != "/")
        ) {
            return true;
        }
        return false;
    };
    const translateX = fromLeft === true ? -50 : 50;
    const close = () => {
        open = false; // fade out the links
        setTimeout(() => {
            show = false;
        }, 300); // close the aside
    };

    let open = $state(false);
    $effect(() => {
        if (show) {
            setTimeout(() => {
                open = show as boolean;
            }, 0); //fix: first open the aside, then show the links
        }
    });
</script>

<!-- svelte-ignore slot_element_deprecated -->
<aside
    class="fixed top-0 m-0 p-0 flex flex-col items-center justify-between w-0 h-screen bg-base-300 right-[-100%] z-[999999] ease-in-out opacity-[0.99] shadow-2xl rounded-l-lg transition-all duration-500"
    class:show
    class:open
    class:from-left-open={fromLeft}
    class:from-left={fromLeft}
>
    <ul
        class="flex items-center justify-between w-full m-0 p-0"
        style={fromLeft == true
            ? " flex-direction: row-reverse;"
            : "flex-direction: row;"}
    >
        <li>
            <button
                onmouseup={close}
                class="m-3 p-0.5 btn-xs btn btn-ghost btn-accent btn-circle shadow-2xl close"
                type="button"
                title="Close Aside"
                aria-live="polite"
                aria-label="button close"
            >
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
                    class="lucide lucide-x-icon lucide-x"
                    ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
                >
            </button>
        </li>
    </ul>
    <ul
        class="p-0 m-0 flex flex-col w-full h-full items-center mt-2 routes-aside"
    >
        {#each routes as route, i}
            <li
                class="m-0 p-0 w-full flex items-center bg-base-100/50 text-base-content justify-center vertical-center max-inline-size-full h-[3rem] rounded-lg"
                class:active={isActive(route.path)}
                style:transform="translateX( {fromLeft == true
                    ? translateX - i * 50
                    : translateX + i * 50}%)"
            >
                <a
                    class="w-full h-full hover:text-accent text-center flex justify-center items-center vertical-center route-aside"
                    href={(route as Route).path}
                    onmouseup={close}
                >
                    {route.name}
                </a>
            </li>
        {/each}
    </ul>
</aside>

<style lang="scss">
    aside {
        --animation-time: 400ms;
        .routes-aside {
            li {
                .route-aside {
                    transition: all var(--animation-time) ease-in-out;
                }
            }
        }
        transition: all var(--animation-time) ease-in-out;
    }
    .open {
        width: clamp(250px, 30%, 350px);
        right: 0%;
        .routes-aside {
            li {
                opacity: 0;
                transform: translateX(50%);
                animation: slideIn var(--animation-time) ease-out forwards;
                animation-fill-mode: both;
                animation-delay: 300ms;
            }
        }
        transition: all var(--animation-time) ease-out !important;
    }
    .open.from-left-open {
        left: 0%;
    }

    aside.from-left {
        left: -100%;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            background: var(--color-accent);
        }
        to {
            transform: translateX(0);
            opacity: 1;
            margin-block: 0.1rem;
        }
    }
</style>
