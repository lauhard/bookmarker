<script lang="ts">
    let { children, showModal = $bindable(), styleDialog = "" } = $props();
    let dialog: HTMLDialogElement = $state() as HTMLDialogElement;
    $effect(() => {
        if (showModal) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    });
</script>

<dialog
    class="modal"
    bind:this={dialog}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    onclose={() => (showModal = false)}
>
    <div class="modal-box {styleDialog}">
        <!-- "X"-Button oben rechts (nur mobil sichtbar) -->
        <button
            type="button"
            class="btn btn-circle btn-ghost btn-error btn-xs m-1 p-0.5 absolute top-2 right-2 sm:hidden"
            aria-label="Modal schließen"
            onclick={() => {
                dialog.close();
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x-icon lucide-x"
                ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
            >
        </button>
        {@render children()}
        <button
            type="button"
            class="btn btn-error mt-4 hidden sm:inline-flex"
            id="close-button"
            aria-label="Close modal"
            aria-controls="modal-title modal-description"
            aria-describedby="modal-description"
            tabindex="0"
            onclick={() => {
                dialog.close();
            }}
        >
            Close
        </button>
    </div>
</dialog>

<style lang="scss">
</style>
