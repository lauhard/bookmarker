import { redirect } from '@sveltejs/kit';
import type { List } from '../../app';
import type { PageServerLoad } from './$types';
import { getListsForUserData } from '$lib/api';


export const load: PageServerLoad = async (event) => {
    if (!event.locals.user || !event.cookies.get("better-auth.session_token")) {
        const originUrl = event.url.origin;
        console.log("originUrl", originUrl);
        throw redirect(302, originUrl);
    }
    //get userid
    const userId = event.locals.user?.id;
    if (userId === undefined) {
        console.error('User ID not found in locals:', event.locals.user);
        throw new Error('User not authenticated');
    }

    const response = await getListsForUserData(userId);
    if (!response.ok) {
        console.error('Error fetching bookmarks:', response.message);
        throw redirect(307, '/error'); // oder: throw error(500, 'Interner Fehler');

    } else {
        const lists: List[] = response.data;
        // order bookmarks by created_at descending
        lists.sort((a, b) => (new Date(b.createdAt || 0).getTime()) - (new Date(a.createdAt || 0).getTime()));
        return {
            lists: lists || [],
        };
    }

}