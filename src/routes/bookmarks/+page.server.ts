import { redirect } from '@sveltejs/kit';
//import type { Bookmark } from '../../app';
import type { PageServerLoad } from './$types';
import type { ListBookmark, UserSettings } from '../../app';
import { getBookmarksForUser, getBookmarksForUserByList, getUserSettings } from '$lib/api';
import { getListnameOfBookmark } from '$lib';
//import { getBookmarksForUser } from '$lib/api';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user || !event.cookies.get("better-auth.session_token")) {
        const originUrl = event.url.origin;
        throw redirect(302, originUrl);
    }

    // Get userId from event locals
    const userId = event.locals.user?.id;
    if (userId === undefined) {
        console.error('User ID not found in locals:', event.locals.user);
        throw new Error('User not authenticated');
    }

    let bookmarks: ListBookmark[] = [];
    let listName: string = "";
    // Check if we have query parameter collectionId in the url
    // If so, we will fetch bookmarks for that collection
    const collectionId = event.url.searchParams.get('collectionId');
    if (collectionId) {
        // Get bookmarks for the user by collectionId
        const response = await getBookmarksForUserByList(userId, collectionId);
        if (!response.ok) {
            console.error('Error fetching bookmarks by collection:', response.message);
            throw new Error('Failed to fetch bookmarks for the collection');
        }
        bookmarks = response.data;
    }
    else {
        const response = await getBookmarksForUser(userId);
        if (!response.ok) {
            console.error('Error fetching bookmarks:', response.message);
            throw new Error('Failed to fetch bookmarks');
        }
        bookmarks = response.data;
    }

    // Order bookmarks by createdAt descending
    if (bookmarks.length > 0) {
        bookmarks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        listName = getListnameOfBookmark(bookmarks[0]);
    }

    let settings: UserSettings = {};
    if (userId) {
        // load settings for the user
        const response = await getUserSettings(userId);
        if (!response.ok) {
            console.error('Error fetching user settings:', response.message);
            throw new Error('Failed to fetch user settings');
        }
        settings = response.data;
    }

    return {
        bookmarks: bookmarks || [],
        listName: listName,
        settings: settings
    };
}

export const actions = {

}