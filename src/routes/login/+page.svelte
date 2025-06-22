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
                        callbackURL: "/bookmarks",
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

<section
    class="login flex flex-col items-center justify-center vertical-center"
>
    <form
        class="form flex flex-col items-center justify-center px-4 py-8 bg-base-200 rounded-box shadow-md w-full max-w-md"
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
        <h1
            class="text-2xl text-left
        pb-2 pl-4 w-full text-primary font-bold mb-4"
        >
            Login
        </h1>

        <fieldset class="fieldset rounded-box mx-4 px-4 w-full flex flex-col">
            <legend class="text-base px-2 text-gray-400"></legend>
            <label class="label text-base" for="login_email"> Email </label>
            <input
                class="input input-md w-full mb-3"
                type="email"
                name="email"
                id="login_email"
                required
                autocomplete="username"
            />
            {#if form?.errors && form.values.email}
                <p class="error">{form?.errors["email"]}</p>
            {/if}
            <label class="label text-base" for="login_password">
                Password
            </label>
            <input
                class="input input-md w-full mb-3"
                type="password"
                name="password"
                id="login_password"
                required
                autocomplete="current-password"
            />
            {#if form?.errors && form.values.password}
                <p class="error">{form?.errors["password"]}</p>
            {/if}
            <button class="btn btn-primary" type="submit">Login</button>
            <p class="text-base mt-4 text-gray-500">
                Don't have an account?
                <a class="link link-primary" href="/signup">Sign up</a>
            </p>
            <p class="text-base">
                <a class="link link-primary" href="/forgot-password"
                    >Forgot Password?</a
                >
            </p>
        </fieldset>
    </form>
</section>

<style lang="scss">
    .login {
        margin: auto 0;
    }
</style>
