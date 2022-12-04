<script>
	import { page } from "$app/stores";
	import { LinkButton } from "$lib/buttons";

	export let sticky = false;

	$: url = $page.url.pathname;
</script>

<nav class:sticky>
	{#if url != "/"}
		<li><LinkButton href="/">Map</LinkButton></li>
	{/if}
	{#if url != "/properties"}
		<li><LinkButton href="/properties">Properties</LinkButton></li>
	{/if}
	{#if url != "/properties/add"}
		<li><LinkButton href="/properties/add">Add</LinkButton></li>
	{/if}
	{#if url != "/about"}
		<li><LinkButton href="/about">About</LinkButton></li>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		gap: var(--gap-extra-small);
		list-style: none;
		position: absolute;
		top: var(--padding-small);
		right: var(--padding-small);
		z-index: 3;
		background: hsl(var(--p) / 0.9);
		backdrop-filter: blur(3px);
		padding: var(--padding-extra-small);
		border-radius: var(--border-radius);
	}
	.sticky {
		position: sticky;
		top: 0;
	}
</style>
