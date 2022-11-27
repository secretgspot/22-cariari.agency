<script>
	import { page } from "$app/stores";
	import { supabase } from "$lib/db.js";
	import Text from "$lib/Text.svelte";
	import { Button } from "$lib/buttons";

	let error = "",
		message = "",
		loading = false,
		email = "";

	async function submit() {
		error = "";
		message = "";
		loading = true;

		const { error: err } = await supabase.auth.signInWithOtp({ email });

		if (err) error = err.message;
		else message = "Check your email for magic link!";

		loading = false;
	}
</script>

<form on:submit|preventDefault={submit}>
	<input
		type="email"
		name="email"
		bind:value={email}
		placeholder="Your email"
	/>
	<Button shadow size="block" {loading} disabled={loading}
		>Request a magic link</Button
	>
	{#if message}
		<Text type="success">{message}</Text>
	{/if}

	{#if error}
		<Text type="error">{error}</Text>
	{/if}
</form>
