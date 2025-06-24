import { deleteList } from "$lib/api";


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