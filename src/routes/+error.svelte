<script>
    let { status, error } = $props();
</script>

<h1>{status}</h1>
<p>{error?.message}</p>
<p class="text-sm text-gray-500 mt-1">
    {error?.message || "Ein unbekannter Fehler ist aufgetreten."}
</p>
