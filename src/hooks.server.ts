import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import type { User } from "./app";

export const handle = async ({ event, resolve }) => {
    console.log('HOOKS ausgeführt für:', event.url.pathname);

    const session = await auth.api.getSession({
        headers: event.request.headers
    })
    if (session && session?.user) {
        event.locals.user = session?.user as User;
    }
    else {
        event.locals.user = null;
    }
    return svelteKitHandler({ event, resolve, auth });

    // Add your logic here
    //const token = event.cookies.get('auth_token');
    //if (token) {
    //    try {
    //        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    //        if (decoded) {
    //            event.locals.user = {
    //                id: decoded['uid']?.toString() || '',
    //                nickname: decoded['nickname'] || '',
    //                email: decoded.email || '',
    //                role: decoded.role || ''
    //            };
    //        }
    //    } catch (error) {
    //        console.error("JWT verification failed", error);
    //        event.cookies.delete('auth_token', { path: '/' });
    //    }
    //}
    //return await resolve(event);
};

