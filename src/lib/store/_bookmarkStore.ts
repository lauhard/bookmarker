//create a production ready svelte5 store for bookmarks
import { writable, type Writable } from 'svelte/store';
import type { ListBookmark } from '../../app';
import { getBookmarksForUser } from '$lib/api';
import { browser } from '$app/environment';


const LOCAL_STORAGE_KEY = 'bookmarks';

export class BookmarkStore {
    private readonly store: Writable<ListBookmark[]>;

    constructor(userId: string) {
        const localStorage = this.loadFromLocalStorage();
        this.store = writable<ListBookmark[]>(localStorage);

        if (browser && localStorage.length === 0 && userId) {
            this.fetchByUser(userId);
        }
        //local storage - for persistence and offline support
        if (browser) {
            this.store.subscribe((bookmarks) => {
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
            });
        }
    }

    loadFromLocalStorage() {
        if (browser && window.localStorage) {
            try {
                const storedBookarks = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (storedBookarks) {
                    return JSON.parse(storedBookarks) as ListBookmark[];

                } else {
                    console.log('No bookmarks found in localStorage. Returning empty array.');
                    return [];
                }
            } catch (error) {
                console.error('Failed to parse bookmarks from localStorage:', error);
                return [];
            }
        } else {
            console.warn('LocalStorage is not available. Using empty bookmarks array.');
            return [];
        }
    }

    //standar subscribe method

    subscribe(callback: (bookmarks: ListBookmark[]) => void) {
        return this.store.subscribe(callback);
    }

    // Update bookmarks by id
    update(id: string, updatedBookmark: Partial<ListBookmark>) {
        this.store.update((bookmarks) => {
            return bookmarks.map((bookmark) => bookmark.id === id ? { ...bookmark, ...updatedBookmark } : bookmark);
        });
    }

    // Add bookmark to the store
    add(bookmark: ListBookmark) {
        this.store.update((bookmarks) => [...bookmarks, bookmark]);
    }

    // Overwrite the entire bookmarks array
    set(bookmarks: ListBookmark[]) {
        this.store.set(bookmarks);
    }

    // Remove bookmark by id
    remove(id: string) {
        this.store.update((bookmarks) => bookmarks.filter((bookmark) => bookmark.id !== id));
    }

    // Clear all bookmarks
    clear() {
        this.store.set([]);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    //fetch bookmarks from the database
    async fetchByUser(id: string) {
        try {
            const response = await getBookmarksForUser(id);
            if (!response.ok) {
                console.error('Error fetching bookmarks. Store could not be updated:', response.message);
            } else {
                const bookmarks: ListBookmark[] = response.data || [];
                // Order bookmarks by created_at descending
                if (bookmarks.length > 0) {
                    bookmarks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                }
                this.set(bookmarks);
            }
        } catch (error) {
            console.error('Failed to fetch bookmarks for user. Store could note be updated:', error);
        }
    }
}