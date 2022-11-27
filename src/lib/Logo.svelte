<script>
	export let type = "regular"; // full | regular | minimal | coin
	export let color = "gold"; // gold | bw
	export let size = "36"; // in px
	export let fixed = "";
</script>

<img
	class="logo {fixed} {color}"
	src="/logo/logo_{type}_{color}.svg"
	width={size}
	alt="CR logo"
	on:click
	on:keydown
/>

<style lang="scss">
	.logo {
		z-index: 10;
		cursor: pointer;
	}
	.fixed {
		position: fixed;
		top: var(--padding-small);
		left: var(--padding-small);
	}
</style>
