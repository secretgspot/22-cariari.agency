<script>
	import { LinkButton } from "$lib/buttons";
</script>

<nav>
	<li><LinkButton href="/properties">Properties</LinkButton></li>
	<li><LinkButton href="/add">Add</LinkButton></li>
	<li><LinkButton href="/about">About</LinkButton></li>
</nav>

<style>
	nav {
		display: flex;
		gap: var(--gap-extra-small);
		list-style: none;
		position: fixed;
		top: var(--padding-small);
		right: var(--padding-small);
		z-index: 3;
		backdrop-filter: blur(3px);
		padding: var(--padding-extra-small);
		border-radius: var(--border-radius);
	}
</style>
