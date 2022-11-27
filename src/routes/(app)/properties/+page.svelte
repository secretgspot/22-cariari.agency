<script>
	/** @type {import('./$types').PageData} */
	import JsonDump from "$lib/JSONDump.svelte";
	export let data;
</script>

List of properties
<JsonDump name="data" {data} />
