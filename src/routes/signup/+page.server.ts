import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { SignUpUser } from "$lib/zod";

export const load: PageServerLoad = async (event) => {
    if (event.locals.user || event.cookies.get("better-auth.session_token")) {
        // User is already logged in, redirect to home or another page
        throw redirect(302, "/");
    }
}

export const actions: Actions = {
    signup: async (event) => {
        const form = await event.request.formData();
        const formData = Object.fromEntries(form);

        const name = form.get("name");
        const email = form.get("email");
        const password = form.get("password");

        //zod save parse
        const result = await SignUpUser.safeParseAsync(formData);
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            return fail(401, {
                success: false,
                error: "Validation failed",
                errors: fieldErrors,
                values: {
                    name,
                    email,
                    password
                }
            });
        }

        return {
            success: true
        }
    }
    // validation passed
}