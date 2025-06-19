import { getListData, getBookmarkData, getListsForUserData, createBookmark, updateBookmark, deleteBookmark } from "$lib/api";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { Bookmark, List, ListBookmark } from "../../../app";

export const load: PageServerLoad = async (event) => {
    type Params = { slug: string };
    const params = event.params as Params;
    const userId = event.locals.user?.id || null; // Ensure userId is set from locals
    const listId = event.url.searchParams.get("collectionId");
    const pathName = event.url.pathname;
    const bookmarkId = params?.slug as string | undefined; // Ensure bookmarkId is set from params

    let bookmarkList: List | null = null;
    let userLists: List[] | null = null;

    console.debug("userId:", userId);
    console.debug("listId:", listId);
    console.debug("bookmarkId:", bookmarkId);
    console.debug("pathName:", pathName);

    // Get list for new bookmark
    if (listId && userId) {
        const response = await getListData(userId, listId);
        if (response.ok === false) {
            console.error("Error fetching list:", response.message);
            // no error handling here, just return null
        }
        bookmarkList = response.data || null;
    }

    //load all lists for the user
    if (userId) {
        const response = await getListsForUserData(userId); // Assuming "all" is a special ID to fetch all lists
        if (response.ok === false) {
            console.error("Error fetching user lists:", response.message);
            // no error handling here, just return null
            //throw redirect(307, '/error'); // oder: throw error(500, 'Interner Fehler');
        }
        userLists = response.data || null; // Ensure userLists is set from response data
    }

    // New bookmark
    if (pathName === "/bookmarks/add") {
        const bookmark = {} as ListBookmark; // Create an empty bookmark object
        return {
            bookmark: bookmark, // Return null if no bookmark ID is provided
            bookmarkList: bookmarkList || null, // Return the list if available
            userLists: userLists || null,
        }
    }

    if (bookmarkId) {
        const response: ListBookmark | null = await getBookmarkData(bookmarkId);
        if (response.ok === false) {
            console.error("Error fetching bookmark:", response.message);
            throw redirect(307, '/error'); // oder: throw error(500, 'Interner Fehler');
        }
        return {
            bookmark: response.data[0] || null, // Return the first bookmark or null if not found
            userLists: userLists || null,
        };
    }
}


export const actions = {
    create: async ({ request, locals }) => {
        const formData = await request.formData();
        const bookmark: Bookmark = {
            userId: locals.user?.id || 0, // Ensure userId is set from locals
            url: formData.get("url") as string,
            pageTitle: formData.get("pageTitle") as string,
            bookmarkListIds: formData.get("bookmarkListIds") as string || null // Ensure bookmarkListIds is set from form data
        };
        let newBookmarkId = null;
        //post the bookmark to the API
        try {
            const response = await createBookmark(bookmark);
            if (!response.ok) {
                return fail(500, {
                    success: false,
                    error: response?.error || 'Fehler beim Speichern.',
                    errors: response?.errors || {},
                    values: Object.fromEntries(formData)
                });
            }
            newBookmarkId = response.data.id;
            console.debug("Created bookmark - id:", newBookmarkId);

        } catch (error) {
            console.error("Error creating bookmark:", error);
            return fail(500, {
                success: false,
                error: error || 'Error creating bookmark.',
            });
        }
        return {
            success: true,
            message: "Bookmark created successfully",
            bookmarkId: newBookmarkId, // Return the new bookmark ID
        }
    },
    update: async ({ request, params, locals }) => {
        const formData = await request.formData();
        const bookmarkId = params?.slug;
        const bookmark: Bookmark = {
            userId: locals.user?.id || 0, // Ensure userId is set from locals
            id: bookmarkId, // Ensure ID is set from params
            url: formData.get("url") as string,
            pageTitle: formData.get("pageTitle") as string,
            bookmarkListIds: formData.get("bookmarkListIds") as string || null // Ensure bookmarkListIds is set from form data
        }
        try {
            const response = await updateBookmark(bookmark);
            if (!response.ok) {
                return fail(500, {
                    success: false,
                    error: response?.error || 'Error updating bookmark.',
                    errors: response?.errors || {},
                    values: Object.fromEntries(formData)
                });
            }
            console.debug("Updated bookmark - id:", response.data);

        } catch (error) {
            console.error("Error updating bookmark:", error);
            return fail(500, {
                success: false,
                error: error || 'Error updating bookmark.',
            });
        }
        return {
            success: true,
            message: "Bookmark updated successfully",
            bookmarkId: bookmarkId, // Return the new bookmark ID
        }
    },
    delete: async ({ params }) => {
        console.debug("Deleting bookmark with slug:", params);
        const bookmarkId = params?.slug;
        if (!bookmarkId) {
            throw new Error("Bookmark ID is required for deletion");
        }
        try {
            const response = await deleteBookmark(bookmarkId);
            if (!response.ok) {
                fail(500, {
                    success: false,
                    error: response.error || 'Fehler beim Löschen des Lesezeichens.',
                    errors: response.errors || {},
                });
            }
            console.debug("Deleted bookmark ID:", bookmarkId);
        } catch (error) {
            console.error("Error deleting bookmark:", error);
            return fail(500, {
                success: false,
                error: error || 'Error creating bookmark.',
            });
        }
        return {
            success: true,
            message: "Bookmark deleted successfully",
            bookmarkId: bookmarkId, // Return the deleted bookmark ID
        }
    }
}