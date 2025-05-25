// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        interface Locals {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            session?: any; // Add session property
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            user?: User | null;    // Add user property if needed
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

        interface Bookmark {
            id: string;
            title: string;
            url: string;
        }

        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { Locals, User, Bookmark };
