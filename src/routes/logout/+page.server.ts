
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    console.log("Request Origin:", event.request.headers.get("origin"));
    console.log("Session Token:", event.cookies.get("better-auth.session_token"));
    if (!event.cookies.get("better-auth.session_token")) throw redirect(302, "/login");
}