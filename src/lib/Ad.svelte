<script>
	export let width;
	export let height;
</script>

<div class="advertising" style="width:{width}px; height:{height}px;">
	<slot>
		<small>{width}x{height}<br />AD</small>
	</slot>
</div>

<style>
	.advertising {
		position: relative;
		background: var(--neutral);
		color: var(--neutral-content);
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: var(--shadow-small);
		/* margin: 2rem 0; */
		text-align: center;
		opacity: var(--brightness);
	}
	.advertising::after {
		content: "ad";
		position: absolute;
		bottom: 100%;
		right: 0;
		font-size: 9px;
		color: var(--secondary-content);
		line-height: 1;
		text-transform: uppercase;
	}
	.advertising small {
		font-size: 12px;
	}
</style>
