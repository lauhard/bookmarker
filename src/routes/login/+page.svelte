<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { type ActionResult } from "@sveltejs/kit";
    import { invalidateAll } from "$app/navigation";
    import { authClient } from "$lib/auth-client";
    import type { ActionData } from "./$types";

    let { form }: { form: ActionData } = $props();
    let betterForm = $state(form);

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
            let email = formData.get("email") as string;
            let password = formData.get("password") as string;
            if (result.type !== "success") {
                await applyAction(result);
            } else {
                authClient.signIn.email(
                    {
                        email,
                        password,
                        /**
                         * remember the user session after the browser is closed.
                         * @default true
                         */
                        callbackURL: "/dashboard",
                        //rememberMe: true,
                    },
                    {
                        onSuccess: async (data) => {
                            //redirect to dashboard with invalidating all pages and callbackURL
                            await invalidateAll();
                            await applyAction(result);
                        },
                        onError: async (error) => {
                            console.error("Error:", error);
                            betterForm = {
                                ...betterForm,
                                success: false,
                            };
                            const { status, message } = error.error;
                            betterForm.error = message;
                            betterForm.success = false;
                            await applyAction(result);
                        },
                    },
                );
            }
        };
    };
</script>

<section class="section">
    <h1>Login</h1>
    <form
        class=""
        method="POST"
        action="?/login"
        use:enhance={(data) => formEnhance({ ...data })}
    >
        {#if form?.success === false}
            <p class="error">{form?.error}</p>
        {/if}
        {#if betterForm?.success === false}
            <p class="error">{betterForm?.error}</p>
        {/if}
        <fieldset class="fieldset border-base-200 rounded-box w-xs border p-4">
            <label class="label" for="login_email"> Email </label>
            <input
                class="input"
                type="email"
                name="email"
                id="login_email"
                required
                autocomplete="username"
            />
            {#if form?.errors && form.values.email}
                <p class="error">{form?.errors["email"]}</p>
            {/if}
            <label class="label" for="login_password"> Password </label>
            <input
                class="input"
                type="password"
                name="password"
                id="login_password"
                required
                autocomplete="current-password"
            />
            {#if form?.errors && form.values.password}
                <p class="error">{form?.errors["password"]}</p>
            {/if}
            <button class="btn btn-primary mt-5" type="submit">Login</button>
        </fieldset>
    </form>
</section>

<style lang="scss">
</style>
