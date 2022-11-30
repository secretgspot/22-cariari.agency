<script>
	/** @type {import('./$types').PageData} */
	import { navigating, page } from "$app/stores";
	import { goto } from "$app/navigation";
	import Logo from "$lib/Logo.svelte";
	import Nav from "$lib/Nav.svelte";
	import { confetti } from "@neoconfetti/svelte";
	import JsonDump from "$lib/JSONDump.svelte";
	import Editor from "$lib/Editor.svelte";

	export let data;

	// export let form;

	let loading = false,
		error = "",
		message = "",
		isAdmin = true,
		won = false;
</script>

{#if !$navigating}
	<Logo type="regular" color="bw" fixed="fixed" on:click={() => goto("/")} />
	<Nav />
{/if}

<Editor {data} />

<!-- CONFETTI -->
{#if won}
	<div
		style="position: fixed; left: 50%; top: 0; z-index:10"
		use:confetti={{
			force: 0.6,
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight,
			colors: ["#FFF8DC", "#FFFACD", "#F0E68C", "#FFD700"],
		}}
	/>
{/if}

<!-- <JsonDump name="data" {data} /> -->
