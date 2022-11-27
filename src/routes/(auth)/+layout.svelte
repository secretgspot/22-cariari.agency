<script>
	/** @type {import('./$types').LayoutData} */
	// export let data;
</script>

<main>
	<slot />
</main>

<style>
	main {
		grid-column: 1 / -1;
		grid-row: 2 / -2;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-self: start;
		align-items: center;
		gap: var(--gap-medium);
		width: 100%;
		max-width: var(--max-width);
		margin-bottom: var(--padding-large);
	}
</style>
