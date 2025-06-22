//create a production ready svelte5 store for bookmarks
import type { List } from '../../app';
import { BaseStore } from './baseStore';
export class ListStore extends BaseStore<List> {
    constructor() {
        super();
    }
}