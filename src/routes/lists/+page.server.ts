import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { List } from "../../app";
import { createList, getListsForUserData, updateList } from "$lib/api";


export const load: PageServerLoad = async (event) => {
    if (!event.locals.user || !event.cookies.get("better-auth.session_token")) {
        const originUrl = event.url.origin;
        console.log("originUrl", originUrl);
        throw redirect(302, originUrl);
    }
    //get userid
    const userId = event.locals.user?.id;
    if (userId === undefined) {
        console.error('User ID not found in locals:', event.locals.user);
        throw new Error('User not authenticated');
    }
    const response = await getListsForUserData(userId);
    let lists: List[] = [];
    if (!response.ok) {
        console.error('Error fetching bookmarks:', response.message);
        throw redirect(307, '/error'); // oder: throw error(500, 'Interner Fehler');
    } else {
        lists = response.data;
        // order by alphabetical order by name
        lists.sort((a, b) => a.name.localeCompare(b.name));
        return {
            lists: lists || [],
            totalCount: lists.length || 0,
        };
    }
}

export const actions = {
    // Define actions here if needed
    create: async ({ request, locals }) => {
        const formData = await request.formData();
        const list: List = {
            userId: locals.user?.id || '', // Ensure userId is set from locals
            name: formData.get("name") as string,
            isPublic: formData?.get("isPublic") == "true" ? true : false, // Ensure isPublic is set from form data
        }
        try {
            const response = await createList(list);
            //console.log("Response from createList:", response);
            if (!response.ok) {
                console.error("Error creating list:", response.message);
                return fail(500, {
                    success: false,
                    error: response?.message || 'Fehler beim Speichern.',
                });
            }
            return {
                success: true,
                message: "List created successfully.",
                data: response.data
            };
        } catch (error) {
            console.error("Error creating list:", error);
            return fail(500, {
                success: false,
                error: error || 'Fehler beim Speichern.',
            });
        }
    },
    update: async ({ request, locals }) => {
        const formData = await request.formData();
        const list: List = {
            id: formData.get("id") as string,
            userId: locals.user?.id || '', // Ensure userId is set from locals
            name: formData.get("name") as string,
            isPublic: formData?.get("isPublic") == "true" ? true : false, // Ensure isPublic is set from form data
        }
        try {
            const response = await updateList(list);
            if (!response.ok) {
                console.error("Error updating list:", response.message);
                return fail(500, {
                    success: false,
                    error: response?.message || 'Fehler beim Aktualisieren.',
                });
            }
            return {
                success: true,
                message: "List updated successfully.",
                data: response.data
            };
        } catch (error) {
            console.error("Error updating list:", error);
            return fail(500, {
                success: false,
                error: error || 'Fehler beim Aktualisieren.',
            });
        }
    }
};