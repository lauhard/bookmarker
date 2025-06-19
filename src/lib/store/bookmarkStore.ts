import type { ListBookmark } from "../../app";
import { BaseStore } from "./baseStore";

export class BookmarkStore extends BaseStore<ListBookmark> {
    constructor() {
        super();
    }
}