<script lang="ts">
    let { user } = $props();
    const imageLink =
        user?.imageLink ??
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
</script>

<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
    <div class="w-10 rounded-full">
        <img alt="UserImage" src={imageLink} />
    </div>
</div>
