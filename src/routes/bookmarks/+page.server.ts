import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { Bookmark } from '../../app';
import type { PageServerLoad } from './$types';


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
    const endpoint = `${API_URL}/api/users/${userId}/bookmarks`;
    console.log('Endpoint:', endpoint);
    //fetch the bookmarks from the API
    const response = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    const data = await response.json();
    if (!response.ok) {
        console.error('Error fetching bookmarks:', data);
        throw new Error('Failed to fetch bookmarks');
    } else {
        // get the data from the response
        const bookmarks: { data: Bookmark[] } | undefined = data;
        // order bookmarks by created_at descending
        if (bookmarks?.data) {
            bookmarks.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
        return {
            bookmarks: bookmarks?.data || [],
        };
    }
}