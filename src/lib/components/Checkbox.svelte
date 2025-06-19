<script lang="ts">
    import { getUserSettingStore } from "$lib/state/userSetting.svelte";

    let { text = "checkbox", checked = $bindable(false) } = $props();
</script>

<fieldset>
    <label class="label">
        <input
            type="checkbox"
            {checked}
            onchange={() => {
                checked = !checked;
                console.log("Checkbox changed:", checked);
            }}
        />
        {text}
    </label>
</fieldset>
