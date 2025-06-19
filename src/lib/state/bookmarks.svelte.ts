import { BookmarkStore } from "$lib/store/bookmarkStore";
import { getContext, setContext } from "svelte";
const BOOKMARK_LIST_CTX = Symbol('bookmarkList');

export function setBookmarkStore() {
    const bookmarkStore = new BookmarkStore();
    const bookmarkState = $state<BookmarkStore>(bookmarkStore);
    setContext(BOOKMARK_LIST_CTX, bookmarkState);
    return bookmarkState as BookmarkStore;
}

export function getBookmarkStore() {
    return getContext<BookmarkStore>(BOOKMARK_LIST_CTX) as BookmarkStore;
}