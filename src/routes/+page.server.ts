import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./bookmarks/$types";

export const load: PageServerLoad = async (event) => {
    //If user is authentcated, redirect to dashboard
    console.log("root - page.sever.load - connectionId: ", event.url.searchParams);
    if (event.locals.user) {
        const originUrl = event.url.origin;
        console.log("originUrl", originUrl);
        throw redirect(302, `${originUrl}/dashboard`);
    }

}