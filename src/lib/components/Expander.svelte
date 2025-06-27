<script lang="ts">
    import { cubicOut } from "svelte/easing";
    import type { TransitionConfig } from "svelte/transition";
    let {
        dir = "left",
        shape = "rounded-full",
        element1 = undefined,
        element2 = undefined,
        element3 = undefined,
        element4 = undefined,
        element5 = undefined,
        element6 = undefined,
        element7 = undefined,
    } = $props();

    // Svelte 5 Rune für den reaktiven Zustand
    let isOpen = $state(false);

    function toggleMenu() {
        isOpen = !isOpen;
    }

    //bottom config
    let absolutePosBot = "top-12";
    let directionBot = "flex-col-reverse";
    let translateBot = "translateY(-";

    //top config
    let absolutePosTop = "bottom-12";
    let absolutePosTopRight = "bottom-12 right-0";
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
    class="relative flex vertical-center align-center justify-center {direction} w-fit h-full"
>
    {#if isOpen}
        <ul
            class="absolute {absolutePos} flex {direction}  w-fit self-center gap-2 items-center vertical-center align-center justify-center h-fit"
        >
            <li
                transition:pop={{ delay: 100, duration: 300 }}
                class="flex bg-base-300 shadow-sm {shape}  w-fit h-fit vertical-center align-center justify-center p-1"
                class:hidden={element1 === undefined}
            >
                {#if element1}
                    {@render element1()}
                {/if}
            </li>

            <li
                transition:pop={{ duration: 300 }}
                class="flex bg-base-300 shadow-sm {shape} w-fit h-fit vertical-center align-center justify-center p-1"
                class:hidden={element2 === undefined}
            >
                {#if element2}
                    {@render element2()}
                {/if}
            </li>
            <li
                transition:pop={{ duration: 300 }}
                class="flex bg-base-300 shadow-sm {shape} w-fit h-fit vertical-center align-center justify-center p-1"
                class:hidden={element3 === undefined}
            >
                {#if element3}
                    {@render element3()}
                {/if}
            </li>
            <li
                transition:pop={{ duration: 300 }}
                class="flex bg-base-300 shadow-sm {shape} w-fit h-fit vertical-center align-center justify-center p-1"
                class:hidden={element4 === undefined}
            >
                {#if element4}
                    {@render element4()}
                {/if}
            </li>
            <li
                transition:pop={{ duration: 300 }}
                class="flex bg-base-300 shadow-sm {shape} w-fit h-fit vertical-center align-center justify-center p-1"
                class:hidden={element5 === undefined}
            >
                {#if element5}
                    {@render element5()}
                {/if}
            </li>
            <li
                transition:pop={{ duration: 300 }}
                class="flex bg-base-300 shadow-sm {shape} w-fit h-fit vertical-center align-center justify-center p-1"
                class:hidden={element6 === undefined}
            >
                {#if element6}
                    {@render element6()}
                {/if}
            </li>
            <li
                transition:pop={{ duration: 300 }}
                class="flex bg-base-300 shadow-sm {shape} w-fit h-fit vertical-center align-center justify-center p-1"
                class:hidden={element7 === undefined}
            >
                {#if element7}
                    {@render element7()}
                {/if}
            </li>
        </ul>
    {/if}

    <label
        class="swap swap-rotate p-1 bg-base-300/70 rounded-full transition-all duration-300 ease-in-out"
    >
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" bind:checked={isOpen} />

        <!-- sun icon -->
        <button
            type="button"
            class="btn btn-ghost btn-sm btn-circle text-warning swap-off"
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
                class="lucide lucide-circle-plus-icon lucide-circle-plus"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
            </svg>
        </button>

        <!-- moon icon -->
        <button
            type="button"
            class="btn btn-ghost btn-sm btn-circle swap-on text-base-content/70 swap-on"
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
