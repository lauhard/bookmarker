import type { User } from "../app";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    console.log("Request Origin:", event.request.headers.get("origin"));
    let user: User = null;
    if (event.locals.user) user = event.locals.user;
    return { user: user };
};