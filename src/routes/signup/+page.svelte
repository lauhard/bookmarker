<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { type ActionResult } from "@sveltejs/kit";
    import { authClient } from "$lib/auth-client";
    import { invalidateAll } from "$app/navigation";
    import type { ActionData } from "./$types";
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
                            window.location.href = "/bookmarks";
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

<section
    class="signup flex flex-col items-center justify-center vertical-center"
>
    <form
        class="form flex flex-col items-center justify-center px-4 py-8 bg-base-200 rounded-box shadow-md w-full max-w-md"
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

        <h1
            class="text-2xl text-left
        pb-2 pl-4 w-full text-primary font-bold mb-4"
        >
            Create an Account
        </h1>
        <fieldset class="fieldset rounded-box mx-4 px-4 w-full flex flex-col">
            <legend class="text-base px-2 text-gray-400"></legend>
            <label class="label text-base" for="name"> Name </label>
            <input
                class="input input-md w-full mb-3"
                type="text"
                name="name"
                id="name"
                required
                autocomplete="name"
            />
            {#if form?.errors && form.values.name}
                <p class="error">{form?.errors["name"]}</p>
            {/if}
            <label class="label text-base" for="email"> Email </label>
            <input
                class="input input-md w-full mb-3"
                type="email"
                name="email"
                id="email"
                required
                autocomplete="username"
            />
            {#if form?.errors && form.values.email}
                <p class="error">{form?.errors["email"]}</p>
            {/if}
            <label class="label text-base" for="password"> Password </label>
            <input
                class="input input-md w-full mb-3"
                type="password"
                name="password"
                id="password"
                required
                autocomplete="new-password"
            />
            {#if form?.errors && form.values.password}
                <p class="error">{form?.errors["password"]}</p>
            {/if}
            <button class="btn btn-primary uppercase" type="submit"
                >Signup</button
            >
            <p class="text-base text-gray-500 mt-4">
                Already have an account? <a
                    href="/login"
                    class="link text-primary">Login</a
                >
            </p>
        </fieldset>
    </form>
</section>

<style lang="scss">
    .signup {
        margin: auto 0;
    }
</style>
