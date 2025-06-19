<script lang="ts">
    let { showModal = $bindable(false) } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<label
    class="sm:input group relative flex items-center justify-center rounded-full border-1 border-gray-500 p-2.5 transition-all sm:w-[210px] sm:justify-start sm:gap-2 sm:rounded-3xl"
>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <svg
        class="h-[1em] opacity-50 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
    >
        <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </g>
    </svg>
    <input
        type="search"
        required
        placeholder="Search"
        class="hidden sm:block flex-1 bg-transparent sm:outline-none shadow-none text-base-content placeholder:text-gray-500"
        onclick={() => (showModal = true)}
        aria-label="Search"
    />
    <div class=" absolute bottom-1.7 right-3 opacity-60 sm:inline-block hidden">
        <kbd class="kbd">CTRL</kbd>
        +
        <kbd class="kbd">F</kbd>
    </div>
</label>

<style>
    label.input {
        border-radius: 2rem;
    }
</style>
