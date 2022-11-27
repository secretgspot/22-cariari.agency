<script>
	import { computeClasses, getDomAttributes } from "./utils.js";
	export let disabled = false;
	export let isLink = false;
	export let href = null;
	export let external = false;
</script>

{#if isLink || href}
	<a
		class:disabled
		data-sveltekit-prefetch
		{...$$restProps}
		role="button"
		href={href ?? "javascript:void(0);"}
		target={external ? "_blank" : null}
		on:click
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:focus
		on:blur
	>
		<slot />
	</a>
{:else}
	<button on:click|preventDefault {...$$restProps} class:disabled {disabled}>
		<slot />
	</button>
{/if}

<style>
	button,
	a {
		border: none;
		background: none;

		cursor: pointer;
		font-size: inherit;
		text-decoration: none;
		/* font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgba(62, 207, 142); */
		box-shadow: var(--accent) 0 -2px 0 -1px inset;
		color: var(--primary-content);
		padding-bottom: 2px;
		transition: box-shadow 93ms ease-in-out;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
	button:hover,
	a:hover {
		box-shadow: var(--accent) inset 0 -3px 0 -1px;
		color: var(--accent);
	}
	button.active,
	a.active {
		box-shadow: var(--accent) inset 0 -5px 0 -1px;
		color: var(--accent);
	}
</style>
