import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async (event) => {

    if (!event.locals.user || !event.cookies.get("better-auth.session_token")) {
        const originUrl = event.url.origin;
        throw redirect(302, originUrl);
    }
}