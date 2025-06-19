<script lang="ts">
    import { getUserState } from "$lib/state/user.svelte";
</script>

<section class="flex-grow flex items-center justify-center text-center py-14">
    <div class="space-y-2 max-w-3xl px-6">
        <div
            class="text-md sm:text-xl lg:text-2xl tracking-wide uppercase font-semibold text-accent"
        >
            <span class="mx-1">Create. </span>
            <span class="mx-1">Organize. </span>
            <span class="mx-1">Find. </span>
            <span class="mx-1">Share. </span>
        </div>

        <h1
            class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-primary uppercase"
        >
            <span class="inline-flex items-center gap-2">
                Book<svg
                    class="inline w-[1em] h-[1em] align-middle text-primary"
                    height="auto"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M16 4H24L32 14L40 4H48C50.2091 4 52 5.79086 52 8V56L33 46L12 60V8C12 5.79086 13.7909 4 16 4Z"
                        fill="currentColor"
                    />
                </svg>
                arker
            </span>
        </h1>
        <p
            class=" text-base sm:text-lg lg:text-xl font-medium text-accent uppercase"
        >
            The last bookmark manager you'll ever need.
        </p>
        <p
            class="mt-8 text-base sm:text-lg lg:text-xl font-light text-base-800"
        >
            A free bookmark manager for everyone. Nothing more.
        </p>
        <div
            class="mt-6 flex flex-col sm:flex-row gap-4 justify-center vertical-center items-center"
        >
            <a href="/login" class="btn btn-primary btn-wide">Get Started</a>
            <a
                href="https://github.com/dein-repo"
                target="_blank"
                class="btn btn-outline btn-wide"
            >
                Star on GitHub
            </a>
        </div>
    </div>
</section>

<!-- Füge am besten in app.html oder global.css hinzu -->
<style lang="scss">
</style>
