<script>
	import { createEventDispatcher } from "svelte";
	import { fade } from "svelte/transition";

	const dispatch = createEventDispatcher();

	export let type = "";
	export let dismissible = true;
</script>

<i class={type} role="alert" transition:fade>
	{#if type === "success"}
		😅
	{:else if type === "error"}
		👀
	{:else}
		💁‍♀️
	{/if}

	<div class="text">
		<slot />
	</div>

	{#if dismissible}
		<button class="close" on:click={() => dispatch("dismiss")}> ❌ </button>
	{/if}
</i>

<style lang="postcss">
	i {
		display: flex;
		border-radius: var(--border-radius);
		align-items: center;
		padding: var(--padding-extra-small);
		gap: var(--gap-small);
	}
	.error {
		background: var(--error);
		color: var(--error-content);
	}
	.success {
		background: var(--success);
		color: var(--success-content);
	}
	.info {
		background: var(--info);
		color: var(--primary);
	}
	.text {
		margin-right: 1rem;
		font-size: 0.81rem;
	}
	button {
		background: transparent;
		border: 0 none;
		padding: 0;
		/* font-size: 0.63rem; */
		cursor: pointer;
	}
</style>
