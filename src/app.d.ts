// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    declare namespace App {
        interface Locals {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            session?: any; // Add session property
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            user?: User | null;    // Add user property if needed
            csrfToken?: string; // Add csrfToken property
        }
        interface User {
            name: string,
            email: string
            emailVerified?: boolean,
            image?: string | null,
            createdAt?: Date,
            updatedAt?: Date,
            id?: string
        };

        interface List {
            id?: string;
            userId: string; // Assuming userId is a string, adjust if it's a number
            name: string;
            isPublic: boolean;
            createdAt?: Date;
            updatedAt?: Date;
        }

        interface Bookmark {
            id?: string | null; // Optional field for bookmark ID
            url: string;
            pageTitle: string;
            userId: string; // Assuming user_id is a string, adjust if it's a number
            pageCapture?: string | null; // Optional field for page capture
            faviconUrl?: string | null; // Optional field for favicon URL
            screenshotUrl?: string | null; // Optional field for screenshot URL
            createdAt?: Date | null; // Optional field for creation date
            updatedAt?: Date | null; // Optional field for update date
            bookmarkListIds?: string | null; // Optional field for new bookmark ID
        }

        interface ListBookmark {
            id?: string | null; // Optional field for bookmark ID
            url: string;
            pageTitle: string;
            userId: string; // Assuming user_id is a string, adjust if it's a number
            pageCapture?: string | null; // Optional field for page capture
            faviconUrl?: string | null; // Optional field for favicon URL
            screenshotUrl?: string | null; // Optional field for screenshot URL
            createdAt?: Date | null; // Optional field for creation date
            updatedAt?: Date | null; // Optional field for update date
            lists?: List[] | null; // Optional field for associated lists
        }

        interface ApiResponse<T> {
            status: number;
            ok: boolean;
            message?: string;
            data: T;
        }

        interface Route {
            name: string;
            path: string;
            isPublic: boolean;
            target?: string;
        }

        interface UserSettings {
            id?: string;
            userId?: string; // Assuming userId is a string, adjust if it's a number
            theme?: string;
            showDescription?: boolean;
            showDate?: boolean;
            showLists?: boolean;
            showTags?: boolean;
        }

        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { Locals, User, Bookmark, List, ListBookmark, ApiResponse, Route, UserSettings };
