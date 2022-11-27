<script>
	export let checked = false;
	export let label = "";
	export let name = "";
	export let disabled = false;
</script>

<div class="toggle">
	<input
		type="checkbox"
		bind:checked
		id={name}
		value={label}
		{name}
		on:change
		{disabled}
	/>
	<label for={name} />
</div>

<style>
	.toggle input[type="checkbox"] {
		display: none;
	}
	.toggle input[type="checkbox"] + label {
		display: block;
		position: relative;
		width: 3em;
		height: 1.8em;
		border-radius: var(--border-radius);
		border: var(--border);
		cursor: pointer;
		user-select: none;
	}
	.toggle input[type="checkbox"] + label:before {
		content: "";
		display: block;
		width: 1.2em;
		height: 1.2em;
		border-radius: 0.2em;
		background: var(--error);
		position: absolute;
		left: 0.2em;
		top: 0.2em;
	}
	.toggle input[type="checkbox"]:checked + label:before {
		background: var(--success);
		left: 1.6em;
	}
</style>
