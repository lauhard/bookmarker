import { deleteList, getListData } from "$lib/api";
import type { List } from "../../../app";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
    console.log("Loading list with slug:", params);
    let list: List | null = null;
    const listId = params?.slug as string | null; // Ensure listId is a string or null
    //grab the user ID from locals
    const userId = locals.user?.id || null; // Ensure userId is set from locals

    //fetch current list from API
    const response = await getListData(userId, listId);
    if (!response.ok) {
        console.error('Error fetching list:', response.message);
        throw new Error('Failed to fetch list');
    }
    // get the data from the response
    list = response.data;
    return {
        list: list || null, // Return the list data or null if not found
    };
}

export const actions = {
    delete: async ({ params }) => {
        const listId = params?.slug;
        if (!listId) {
            console.error('List ID is required for deletion');
            throw new Error('List ID is required');
        }
        const response = await deleteList(listId);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error deleting list:', errorData);
            throw new Error(`Failed to delete list: ${errorData.message}`);
        }
        console.log('List deleted successfully');
        return { success: true };
    }
}