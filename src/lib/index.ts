
// place files you want to import through the `$lib` alias in this folder.

import { browser } from "$app/environment";
import type { ListBookmark } from "../app";

// Standard timeout for requests is 8000 ms (8 seconds)
export async function _fetch(url: string, options?: RequestInit, timeoutMs = 108000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            //signal: controller.signal,
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            ...options
        });

        clearTimeout(timeout);

        const json = await response.json();
        if (!response.ok) {
            console.error('API error:', json);
            //throw new Error(json?.message || 'Request failed');
            return {
                status: response.status,
                ok: response.ok,
                message: json?.message || 'Request failed',
                data: null,
                error: json?.error || 'An error occurred',
                errors: json?.errors || {}
            };
        }

        return {
            status: response.status,
            ok: response.ok,
            data: json.data || null,
            message: json.message || 'Request successful'
        };
    } catch (error) {
        if ((error as Error).name === 'AbortError') {
            throw new Error('Request timeout');
        }
        console.error('Network or unexpected error:', error);
        throw error;
    }
}


export const getPreviousPage = () => {
    if (browser && sessionStorage) {
        const previousUrl = sessionStorage.getItem("previousUrl");
        console.log("Getting Previous URL:", previousUrl);

        return previousUrl

    }
}

export const setPreviousPage = (url: URL | null) => {
    if (browser && sessionStorage) {
        if (url) {
            console.log("Setting previous URL:", url.pathname + url.search);
            sessionStorage.setItem(
                "previousUrl",
                url.pathname + url.search,
            );
        }
    }
}

export const getListnameOfBookmark = (bookmark: ListBookmark, defaultName = "All Bookmarks"): string => {
    return bookmark?.lists[0]?.name || defaultName;
}

export function debounce(fn: (...args: unknown[]) => void, delay = 300) {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: unknown[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => fn(...args), delay)
    }
}

//write to localStorage with a key
// src/lib/utils/persist.ts
export function getLocalStorage<T>(key: string, fallback: T): T {
    try {
        const value = localStorage.getItem(key);
        if (value) return JSON.parse(value);
    } catch (err) {
        console.warn(`Could not load ${key} from localStorage`, err);
    }
    return fallback;
}

export function setLocalStorage<T>(key: string, value: T) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.warn(`Could not save ${key} to localStorage`, err);
    }
}

export function isValidGoogleFavicon(img: HTMLImageElement, callback: (isValid: boolean) => void) {
    let isGenericFavicon = true;
    // Google returns a 16x16 favicon as fallback for invalid domains
    if (img.naturalWidth <= 16 && img.naturalHeight <= 16) {
        // if its fallback we use the fallback function
        isGenericFavicon = false;
    }
    callback(isGenericFavicon)
}

export const onLoadFavicon = (event: Event, url: string) => {
    const img = event.currentTarget as HTMLImageElement;
    isValidGoogleFavicon(img, (isValid: boolean) => {
        if (!isValid) {
            img.src = `https://icons.duckduckgo.com/ip3/${new URL(url).hostname}.ico`;
        }
    });
};