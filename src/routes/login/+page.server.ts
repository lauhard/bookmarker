import type { Actions, PageServerLoad } from "./$types";
import { LoginUser } from "$lib/zod";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    if (event.locals.user || event.cookies.get("better-auth.session_token")) {
        // User is already logged in, redirect to home or another page
        throw redirect(302, "/");
    }
}

export const actions = {
    login: async (event) => {
        const form = await event.request.formData();
        const formData = Object.fromEntries(form);

        const email = form.get("email");
        const password = form.get("password");

        const result = await LoginUser.safeParseAsync(formData);
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            return fail(401, {
                success: false,
                error: "Validation failed",
                errors: fieldErrors,
                values: {
                    email,
                    password
                }
            });
        }
        // validaion passed
        return { success: true };
    }
} satisfies Actions;