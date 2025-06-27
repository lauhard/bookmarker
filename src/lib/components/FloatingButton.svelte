<script lang="ts">
    import { cubicOut } from "svelte/easing";
    import type { TransitionConfig } from "svelte/transition";
    let { dir = "left", shape = "rounded-full", element1, element2 } = $props();

    // Svelte 5 Rune für den reaktiven Zustand
    let isOpen = $state(false);

    function toggleMenu() {
        isOpen = !isOpen;
    }

    //bottom config
    let absolutePosBot = "top-16";
    let directionBot = "flex-col-reverse";
    let translateBot = "translateY(-";

    //top config
    let absolutePosTop = "bottom-16";
    let absolutePosTopRight = "bottom-16 right-1 items-end";
    let directionTop = "flex-col";
    let translateTop = "translateY(";

    //left config
    let absolutePosLeft = "right-12 ";
    let directionLeft = "flex-row";
    let translateLeft = "translateX(";

    //right config
    let absolutePosRight = "left-12 ";
    let directionRight = "flex-row-reverse";
    let translateRight = "translateX(-";

    let absolutePos = $state("");
    let direction = $state("");
    let translate = $state("");

    $effect(() => {
        if (dir === "top") {
            absolutePos = absolutePosTop;
            direction = directionTop;
            translate = translateTop;
        } else if (dir === "top-right") {
            absolutePos = absolutePosTopRight;
            direction = directionTop;
            translate = translateTop;
        } else if (dir === "bottom") {
            absolutePos = absolutePosBot;
            direction = directionBot;
            translate = translateBot;
        } else if (dir === "left") {
            absolutePos = absolutePosLeft;
            direction = directionLeft;
            translate = translateLeft;
        } else if (dir === "right") {
            absolutePos = absolutePosRight;
            direction = directionRight;
            translate = translateRight;
        }
    });

    // Eine wiederverwendbare Svelte-Transition für den "Pop"-Effekt
    function pop(
        node: Element,
        { delay = 0, duration = 300 },
    ): TransitionConfig {
        return {
            delay,
            duration,
            css: (t) => {
                const eased = cubicOut(t);
                return `
                    transform-origin:  center center;
                    transform: scale(${0.5 + eased * 0.5}) ${translate}${(1 - eased) * 60}%);
                    opacity: ${eased};
                `;
            },
        };
    }
</script>

<div
    class="relative flex vertical-center align-center justify-center {direction} w-fit h-full lg:hidden"
>
    {#if isOpen}
        <ul
            class="absolute {absolutePos} flex {direction}  w-fit self-center gap-2 vertical-center align-center justify-center h-fit"
        >
            <li
                transition:pop={{ delay: 100, duration: 300 }}
                class="flex bg-base-300 shadow-sm {shape}  w-fit h-fit vertical-center align-center justify-center"
            >
                {@render element1()}
            </li>

            <li
                transition:pop={{ duration: 300 }}
                class="flex bg-base-300 shadow-sm {shape} w-fit h-fit vertical-center align-center justify-center"
            >
                {@render element2()}
            </li>
        </ul>
    {/if}

    <label
        class="swap swap-rotate rounded-full transition-all duration-300 ease-in-out lg:hidden shadow-3xl"
    >
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" bind:checked={isOpen} />

        <!-- sun icon -->
        <button
            type="button"
            class="btn btn-warning btn-lg btn-circle swap-off shadow-3xl"
            aria-label="Open menu"
            onclick={toggleMenu}
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
                class="lucide lucide-pencil-icon lucide-pencil"
                ><path
                    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                /><path d="m15 5 4 4" /></svg
            >
        </button>

        <!-- moon icon -->
        <button
            type="button"
            class="btn btn-error btn-lg btn-circle swap-on"
            aria-label="Close menu"
            onclick={toggleMenu}
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
                class="lucide lucide-circle-minus-icon lucide-circle-minus"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
            </svg>
        </button>
    </label>
</div>
