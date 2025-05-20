<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { redirect, type ActionResult } from "@sveltejs/kit";
    import { authClient } from "$lib/auth-client";
    import { goto, invalidateAll } from "$app/navigation";
    import type { ActionData } from "./$types";
    import { getUserState } from "$lib/state.svelte";
    let { form }: { form: ActionData } = $props();
    let betterAuthStatus = $state("");
    const formEnhance = ({
        formElement,
        formData,
        action,
        cancel,
    }: {
        formElement: HTMLFormElement;
        formData: FormData;
        action: string | URL;
        cancel: () => void;
    }) => {
        return async ({ result }: { result: ActionResult }) => {
            let name = formData.get("name") as string;
            let email = formData.get("email") as string;
            let password = formData.get("password") as string;
            betterAuthStatus = "";
            if (result.type !== "success") {
                await applyAction(result);
            } else {
                authClient.signUp.email(
                    {
                        email,
                        password,
                        name,
                    },
                    {
                        onSuccess: async (data) => {
                            console.log("onSuccess", data);
                            await invalidateAll();
                            await applyAction(result);
                            window.location.href = "/dashboard";
                        },
                        onError: async (error) => {
                            const { status, message } = error.error;
                            console.error("Error:", error);
                            betterAuthStatus = message;
                            await applyAction(result);
                        },
                    },
                );
            }
        };
    };
</script>

<section class="section">
    <h1>Signup</h1>
    <form
        method="POST"
        action="?/signup"
        use:enhance={(data) => formEnhance({ ...data })}
    >
        {#if form?.success === false}
            <p class="error">{form?.error}</p>
        {/if}
        {#if betterAuthStatus}
            <p class="error">{betterAuthStatus}</p>
        {/if}

        <fieldset class="fieldset border-base-300 rounded-box w-xs border p-4">
            <label class="label" for="name"> Name </label>
            <input
                class="input"
                type="text"
                name="name"
                id="name"
                required
                autocomplete="name"
            />
            {#if form?.errors && form.values.name}
                <p class="error">{form?.errors["name"]}</p>
            {/if}
            <label class="label" for="email"> Email </label>
            <input
                class="input"
                type="email"
                name="email"
                id="email"
                required
                autocomplete="username"
            />
            {#if form?.errors && form.values.email}
                <p class="error">{form?.errors["email"]}</p>
            {/if}
            <label class="label" for="password"> Password </label>
            <input
                class="input"
                type="password"
                name="password"
                id="password"
                required
                autocomplete="new-password"
            />
            {#if form?.errors && form.values.password}
                <p class="error">{form?.errors["password"]}</p>
            {/if}
            <button class="btn btn-primary mt-5" type="submit">Signup</button>
        </fieldset>
    </form>
</section>

<style lang="scss">
</style>
