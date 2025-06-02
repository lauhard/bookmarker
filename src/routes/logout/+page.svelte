<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import { redirect } from "@sveltejs/kit";
    import { getCookieCache } from "better-auth/cookies";
    $effect(() => {
        authClient
            .signOut({
                fetchOptions: {
                    onSuccess: (data) => {
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
