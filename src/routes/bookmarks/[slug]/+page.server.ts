import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "../$types";
import type { Bookmark } from "../../../app";

export const load: PageServerLoad = async ({ params, fetch, locals }) => {
    console.log("Loading bookmark with slug:", params);
    const API_URL = env.API_URL;
    const bookmarkID = params?.slug;
    // fetch bookmkark from api
    if (bookmarkID == 'add') {
        return {
            bookmark: null, // Return null if no bookmark ID is provided
        }
    }
    const response = await fetch(`${API_URL}/api/bookmarks/${bookmarkID}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include", // means cookies will be sent with the request
        referrerPolicy: "no-referrer", // this is useful to prevent CSRF attacks
        // referrerPolicy: "strict-origin-when-cross-origin", // this is useful to prevent CSRF attacks
        redirect: "follow", // redirects will be followed means if the API returns a 301 or 302, the fetch will follow it
        headers: {
            //Authorization: `Bearer ${locals.token}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-Token": locals?.csrfToken || "", // Use CSRF token from locals if available
        },
    });
    const data = await response.json();
    console.log("Response data:", data);
    if (!response.ok) {
        console.error("Error fetching bookmark:", data);
        throw new Error("Failed to fetch bookmark");
    } else {
        const bookmark: { data: Bookmark } | undefined = data;
        console.log("Bookmark data:", bookmark);
        return {
            bookmark: bookmark?.data[0] || null, // Return the first bookmark or null if not found
        };
    }
}


export const actions = {
    create: async ({ request, fetch, locals }) => {
        const formData = await request.formData();
        const bookmark: Bookmark = {
            user_id: locals.user?.id || 0, // Ensure userId is set from locals
            url: formData.get("url") as string,
            page_title: formData.get("title") as string,
        };
        console.log("Creating bookmark...", JSON.stringify(bookmark));
        let newBookmarkID = null;
        //post the bookmark to the API
        try {
            const response = await fetch(`${env.API_URL}/api/bookmarks`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "include", // means cookies will be sent with the request
                redirect: "follow", // redirects will be followed means if the API returns a 301 or 302, the fetch will follow it
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": locals?.csrfToken || "", // Use CSRF token from locals if available
                },
                body: JSON.stringify(bookmark),
            });
            const data = await response.json();
            console.log("Response data:", data);
            if (!response.ok) {
                console.error("Error creating bookmark:", data);
                throw new Error("Failed to create bookmark");
            }
            newBookmarkID = data.data.id;
            console.log("Created bookmark dataxxxx:", newBookmarkID);

        } catch (error) {
            console.error("Error creating bookmark:", error);
            throw new Error("Failed to create bookmark");
        }
        return {
            success: true,
            message: "Bookmark created successfully",
            bookmarkID: newBookmarkID, // Return the new bookmark ID
        }
    },
    update: async ({ request, fetch, params, locals }) => {
        const formData = await request.formData();
        const bookmarkID = params?.slug;
        const bookmark: Bookmark = {
            user_id: locals.user?.id || 0, // Ensure userId is set from locals
            id: bookmarkID, // Ensure ID is set from params
            url: formData.get("url") as string,
            page_title: formData.get("title") as string,
        }
        try {
            const response = await fetch(`${env.API_URL}/api/bookmarks/${bookmarkID}`, {
                method: "PATCH",
                mode: "cors",
                cache: "no-cache",
                credentials: "include", // means cookies will be sent with the request
                redirect: "follow", // redirects will be followed means if the API returns a 301 or 302, the fetch will follow it
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": locals?.csrfToken || "", // Use CSRF token from locals if available
                },
                body: JSON.stringify(bookmark),
            });
            const data = await response.json();
            console.log("Response data:", data);
            if (!response.ok) {
                console.error("Error creating bookmark:", data);
                throw new Error("Failed to create bookmark");
            }
            console.log("Updated bookmark dataxxxx:", bookmarkID);

        } catch (error) {
            console.error("Error creating bookmark:", error);
            throw new Error("Failed to create bookmark");
        }
        return {
            success: true,
            message: "Bookmark updated successfully",
            bookmarkID: bookmarkID, // Return the new bookmark ID
        }
    },
    delete: async ({ params, fetch, locals }) => {
        console.log("Deleting bookmark with slug:", params);
        const bookmarkID = params?.slug;
        if (!bookmarkID) {
            throw new Error("Bookmark ID is required for deletion");
        }
        try {
            const response = await fetch(`${env.API_URL}/api/bookmarks/${bookmarkID}`, {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                credentials: "include", // means cookies will be sent with the request
                redirect: "follow", // redirects will be followed means if the API returns a 301 or 302, the fetch will follow it
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": locals?.csrfToken || "", // Use CSRF token from locals if available
                },
            });
            const data = await response.json();
            console.log("Response data:", data);
            if (!response.ok) {
                console.error("Error deleting bookmark:", data);
                throw new Error("Failed to delete bookmark");
            }
            console.log("Deleted bookmark ID:", bookmarkID);
        } catch (error) {
            console.error("Error deleting bookmark:", error);
            throw new Error("Failed to delete bookmark");
        }
        return {
            success: true,
            message: "Bookmark deleted successfully",
            bookmarkID: bookmarkID, // Return the deleted bookmark ID
        }
    }
}