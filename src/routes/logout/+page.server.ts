
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    if (!event.cookies.get("better-auth.session_token")) throw redirect(302, "/login");
}