<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import { applyAction, enhance } from "$app/forms";
    import { setUserSettingStore } from "$lib/state/userSetting.svelte";
    import { getListStore, setListStore } from "$lib/state/list.svelte";
    import type { ActionResult } from "@sveltejs/kit";
    import { invalidateAll } from "$app/navigation";
    import { slide } from "svelte/transition";
    let {
        showCollectionModal = $bindable(false),
        collectionId = $bindable(null),
    } = $props();
    let isPublic = $state(false);

    let listStore = getListStore();
    let action = $state("/lists/?/create");
    let title = $state("Create new List");
    let btnText = $state("Create List");
    let listName = $state("");
    $effect(() => {
        if (collectionId) {
            action = "/lists/?/update";
            title = "Update List";
            btnText = "Update List";
            listName =
                $listStore.find((list) => list.id === collectionId)?.name || "";
            isPublic =
                $listStore.find((list) => list.id === collectionId)?.isPublic ||
                false;
        }
    });

    const formEnhance = ({
        formElement,
        formData,
        action,
        cancel,
    }: {
        formElement: HTMLFormElement;
        formData: FormData;
        action: string | URL;
        cancel: () => void;
    }) => {
        return async ({ result }: { result: ActionResult }) => {
            if (result.type !== "success") {
                console.error("Error on saving bookmark:", result);
                await applyAction(result);
            } else {
                console.log("List created successfully:", result);
                const listData = result.data; //TODO: FIX result data
                listStore.add({
                    id: listData?.data?.id,
                    name: formData.get("name") as string,
                    isPublic: isPublic,
                });
                await invalidateAll(); // Reload all data to reflect the new bookmark
                // Reload the page to reflect the new bookmark
                showCollectionModal = false;
            }
        };
    };
</script>

<Modal bind:showModal={showCollectionModal}>
    <div class="pb-4" transition:slide>
        <h2
            class="text-2xl font-bold sm:mt-0 mt-6 my-5 sm:text-center text-primary"
        >
            {title}
        </h2>

        <form
            class="flex flex-col gap-6"
            method="POST"
            {action}
            use:enhance={formEnhance}
        >
            <!-- list public -->
            <div class="form-control mb-4">
                <input type="text" name="id" value={collectionId} hidden />
                <label class="label cursor-pointer mb-1">
                    <span class="label-text" class:public={isPublic}
                        >Public List</span
                    >
                    <input
                        type="checkbox"
                        name="isPublic"
                        value={isPublic}
                        class="toggle toggle-accent"
                        bind:checked={isPublic}
                    />
                </label>
                <p class="label-text-alt text-base-content/70">
                    A public list can be viewed by anyone.
                </p>
            </div>
            <div class="form-control">
                <label for="name" class="label">List Name</label>
                <div class="flex flex-row flex-wrap items-start gap-4">
                    <div class="flex-[1_1_200px] grow">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            bind:value={listName}
                            placeholder="Enter list name"
                            class="input input-md w-full"
                            required
                        />
                    </div>
                    <button type="submit" class="btn btn-primary"
                        >{btnText}</button
                    >
                </div>
            </div>
        </form>
    </div>
</Modal>
