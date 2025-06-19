import { env } from "$env/dynamic/public";
import { _fetch } from "$lib";
import type { ApiResponse, Bookmark, List, ListBookmark, UserSettings } from "../app";



//#region API Bookmkarks
export async function createBookmark(bookmark: Bookmark): Promise<ApiResponse<Bookmark | null>> {
    const ENDPOINT_CREATE_BOOKMARK = `${env.PUBLIC_API_URL}/api/bookmarks`;
    console.debug('Creating bookmark at endpoint:', ENDPOINT_CREATE_BOOKMARK);
    const response = await _fetch(ENDPOINT_CREATE_BOOKMARK, {
        method: 'POST',
        body: JSON.stringify(bookmark),
    });
    console.debug('Response from createBookmark:', JSON.stringify(response, null, 2));
    return response as ApiResponse<Bookmark | null>;
}

export async function updateBookmark(bookmark: Bookmark): Promise<ApiResponse<string | null>> {
    const ENDPOINT_UPDATE_BOOKMARK = `${env.PUBLIC_API_URL}/api/bookmarks/${bookmark.id}`;
    console.debug('Updating bookmark at endpoint:', ENDPOINT_UPDATE_BOOKMARK);
    const response = await _fetch(ENDPOINT_UPDATE_BOOKMARK, {
        method: 'PATCH',
        body: JSON.stringify(bookmark),
    });
    console.debug('Response from updateBookmark:', JSON.stringify(response, null, 2));
    return response as ApiResponse<string | null>;
}

export async function deleteBookmark(bookmarkId: string): Promise<ApiResponse<string | null>> {
    const ENDPOINT_DELETE_BOOKMARK = `${env.PUBLIC_API_URL}/api/bookmarks/${bookmarkId}`;
    console.debug('Deleting bookmark at endpoint:', ENDPOINT_DELETE_BOOKMARK);
    const response = await _fetch(ENDPOINT_DELETE_BOOKMARK, {
        method: 'DELETE',
    });
    console.debug('Response from deleteBookmark:', JSON.stringify(response, null, 2));
    return response as ApiResponse<string | null>;
}

export async function getBookmarkData(bookmarkId: string): Promise<ApiResponse<ListBookmark[] | null>> {
    const ENDPOINT_BOOKMARK = `${env.PUBLIC_API_URL}/api/bookmarks/${bookmarkId}`;
    console.debug('Fetching bookmark from endpoint:', ENDPOINT_BOOKMARK);
    const bookmarkData = await _fetch(ENDPOINT_BOOKMARK);
    console.debug('Bookmark data:', JSON.stringify(bookmarkData, null, 2));
    return bookmarkData as ApiResponse<ListBookmark[] | null>;
}

export async function getBookmarksForUser(userId: string): Promise<ApiResponse<ListBookmark[] | null>> {
    const ENDPOINT_BOOKMARKS_BY_USER = `${env.PUBLIC_API_URL}/api/users/${userId}/bookmarks`;
    console.debug('Fetching bookmarks for user from endpoint:', ENDPOINT_BOOKMARKS_BY_USER);
    const bookmarkData = await _fetch(ENDPOINT_BOOKMARKS_BY_USER);
    console.debug('Bookmark data:', JSON.stringify(bookmarkData, null, 2));
    return bookmarkData as ApiResponse<ListBookmark[] | null>;
}

export async function getBookmarksForUserByList(userId: string, listId: string): Promise<ApiResponse<ListBookmark[] | null>> {
    const ENDPOINT_BOOKMARKS_FOR_USER_BY_LIST = `${env.PUBLIC_API_URL}/api/users/${userId}/lists/${listId}/bookmarks`;
    console.debug('Fetching bookmarks for user and list from endpoint:', ENDPOINT_BOOKMARKS_FOR_USER_BY_LIST);
    const bookmarkData = await _fetch(ENDPOINT_BOOKMARKS_FOR_USER_BY_LIST);
    console.debug('Bookmark data:', JSON.stringify(bookmarkData, null, 2));
    return bookmarkData as ApiResponse<ListBookmark[] | null>;
}

// src/lib/api/bookmarks.ts
export async function searchBookmarks(userId: string, query: string): Promise<ApiResponse<ListBookmark[] | null>> {
    const ENDPOINT_SEARCH_BOOKMARKS_BY_USER = `${env.PUBLIC_API_URL}/api/users/${userId}/bookmarks/search?q=${encodeURIComponent(query)}`;
    console.debug('Searching bookmarks for user from endpoint:', ENDPOINT_SEARCH_BOOKMARKS_BY_USER);
    const bookmarkData = await _fetch(ENDPOINT_SEARCH_BOOKMARKS_BY_USER);
    console.debug('Bookmark data:', JSON.stringify(bookmarkData, null, 2));
    return bookmarkData as ApiResponse<ListBookmark[] | null>;
}


//#endregion


//#region API Lists
export async function createList(List: List): Promise<ApiResponse<List | null>> {
    const ENDPOINT_CREATE_LIST = `${env.PUBLIC_API_URL}/api/lists`;
    console.debug('Creating list at endpoint:', ENDPOINT_CREATE_LIST);
    const response = await _fetch(ENDPOINT_CREATE_LIST, {
        method: 'POST',
        body: JSON.stringify(List),
    });
    console.debug('Response from createList:', JSON.stringify(response, null, 2));
    return response as ApiResponse<List | null>;
}

export async function getListData(userId: string | null, listId: string | null): Promise<ApiResponse<List | null>> {
    const ENDPOINT_LIST = `${env.PUBLIC_API_URL}/api/users/${userId}/lists/${listId}`;
    console.debug('Fetching list from endpoint:', ENDPOINT_LIST);
    const listData = await _fetch(ENDPOINT_LIST);
    console.debug('List data:', JSON.stringify(listData, null, 2));
    return listData as ApiResponse<List | null>;
}

export async function getListsForUserData(userId: string): Promise<ApiResponse<List | null>> {
    const ENDPOINT_LIST_BY_USER = `${env.PUBLIC_API_URL}/api/users/${userId}/lists`;
    console.debug('Fetching lists for user from endpoint:', ENDPOINT_LIST_BY_USER);
    const listData = await _fetch(ENDPOINT_LIST_BY_USER);
    console.debug('listData:', JSON.stringify(listData, null, 2));
    return listData as ApiResponse<List | null>;
}

export async function deleteList(listId: string): Promise<ApiResponse<string | null>> {
    const ENDPOINT_DELETE_LIST = `${env.PUBLIC_API_URL}/api/lists/${listId}`;
    console.debug('Deleting list at endpoint:', ENDPOINT_DELETE_LIST);
    const response = await _fetch(ENDPOINT_DELETE_LIST, {
        method: 'DELETE',
    });
    console.debug('Response from deleteList:', JSON.stringify(response, null, 2));
    return response as ApiResponse<string | null>;
}
//#endregion


//get user_settings
export async function getUserSettings(userId: string): Promise<ApiResponse<UserSettings | null>> {
    const ENDPOINT_USER_SETTINGS = `${env.PUBLIC_API_URL}/api/users/${userId}/settings`;
    console.debug('Fetching user settings from endpoint:', ENDPOINT_USER_SETTINGS);
    const userSettings = await _fetch(ENDPOINT_USER_SETTINGS);
    console.debug('User settings data:', JSON.stringify(userSettings, null, 2));
    return userSettings as ApiResponse<UserSettings | null>;
}


// update user_settings
export async function updateUserSettings(userId: string, settings: UserSettings): Promise<ApiResponse<UserSettings | null>> {
    const ENDPOINT_UPDATE_USER_SETTINGS = `${env.PUBLIC_API_URL}/api/users/${userId}/settings`;
    console.debug('Updating user settings at endpoint:', ENDPOINT_UPDATE_USER_SETTINGS);
    const response = await _fetch(ENDPOINT_UPDATE_USER_SETTINGS, {
        method: 'PATCH',
        body: JSON.stringify(settings),
    });
    console.debug('Response from updateUserSettings:', JSON.stringify(response, null, 2));
    return response as ApiResponse<UserSettings | null>;
}
