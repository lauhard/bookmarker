<script lang="ts">
    type Bookmark ={
        name:string,
        url:string,
        description:string
    }
    import { onMount } from "svelte";
    let bookmarks:Array<Bookmark> = [];
    onMount(async() => {
        let response = await fetch('http://api.bookmarker.com/v1/bookmarks');
        let data = await response.json();
        bookmarks = data;   
    });
</script>
<h1>Welcome to the Bookmarker Demo</h1>
{#await bookmarks}
    <p>wait for data..</p>
{:then bookmarks}
    {#each bookmarks as bookmark}
        <li>
            <a href="{bookmark.url}">{bookmark.name}</a>
        </li>
    {/each}
{/await}
