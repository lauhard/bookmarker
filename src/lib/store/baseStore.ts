import { writable, type Writable } from "svelte/store";


export class BaseStore<T extends { id: string }> {

    //base writable store
    protected store: Writable<T[]>;

    constructor() {
        this.store = writable<T[]>([]);
    }

    subscribe(callback: (data: T[]) => void) {
        return this.store.subscribe(callback);
    }

    updateStore(id: string, newData: Partial<T>) {
        this.store.update((currentData): T[] => {
            return currentData.map((currentItem: T) => currentItem.id === id ? { ...currentItem, ...newData } : currentItem);
        });
    }

    add(data: T) {
        this.store.update((currentData): T[] => [...currentData, data]);
    }

    set(allData: T[]) {
        this.store.set(allData);
    }
    remove(id: string) {
        this.store.update((currentData): T[] => currentData.filter((currentItem: T) => currentItem.id !== id));
    }

    clear() {
        this.store.set([]);
    }

}