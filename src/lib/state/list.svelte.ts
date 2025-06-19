import { ListStore } from "$lib/store/listStore";
import { getContext, setContext } from "svelte";

const LIST_CTX = Symbol('list');
export function setListStore() {
    const listStore = new ListStore();
    const listState = $state(listStore);
    setContext(LIST_CTX, listState);
    return listState as ListStore;
}
export function getListStore() {
    return getContext<ListStore>(LIST_CTX) as ListStore;
}