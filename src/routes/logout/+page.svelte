<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import { getBookmarkStore } from "$lib/state/bookmarks.svelte";
    import { getListStore } from "$lib/state/list.svelte";
    import { redirect } from "@sveltejs/kit";
    const bookmarkStore = getBookmarkStore();
    const listStore = getListStore();
    $effect(() => {
        authClient
            .signOut({
                fetchOptions: {
                    onSuccess: (data) => {
                        bookmarkStore.set([]);
                        listStore.set([]);
                        console.log("logout onSuccess", data);
                        window.location.href = "/";
                    },
                },
            })
            .catch((error) => {
                console.error("Error during logout:", error);
                throw redirect(500, "/error");
            })
            .then(() => {
                console.log("Logout successful");
            });
    });
</script>
