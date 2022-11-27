<script>
	export let type = "";
</script>

<span
	{...$$restProps}
	class:error={type == "error"}
	class:success={type == "success"}
>
	<slot />
</span>

<style>
	.error {
		color: var(--error);
	}
	.success {
		color: var(--success-content);
	}
</style>
