<script lang="ts">
    import type { List } from "../../app";
    let { lists }: { lists: List[] } = $props();
    import Collection from "$lib/components/Collection.svelte";
</script>

{#if lists?.length === 0}
    <div class="text-center py-16">
        <p class="text-base-content/70 text-lg mb-4">No Collections found</p>
    </div>
{:else}
    <ul class="list bg-base-100 rounded-box px-0">
        <li
            class="w-full p-4 pb-2 text-base opacity-70 flex flex-row justify-between items-center"
        >
            <div class="block w-fit">
                Created Collections
                <span class="text-accent">({lists.length})</span>
            </div>
        </li>
        {#each lists as list, index}
            <Collection {list} />
        {/each}
    </ul>
{/if}
