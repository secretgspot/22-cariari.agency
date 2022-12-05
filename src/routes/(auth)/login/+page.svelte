<script>
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
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

		const { error: err } = await supabase.auth.signInWithOtp({
			email,
			sendOtp: true,
		});
		// const { error: err } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo:  "https://example.com/login" } });

		if (err) error = err.message;
		else {
			message = "Check your email for magic link!";
			goto("/");
		}

		loading = false;
	}

	// async function verify() {
	// 	error = "";
	// 	message = "";
	// 	loading = true;

	// 	const { session, error: verifyError } = await supabase.auth.verifyOTP({
	// 		email,
	// 		token,
	// 		type: "magiclink",
	// 	});

	// 	if (verifyError) error = verifyError.message;
	// 	else message = "Verified!";

	// 	loading = false;
	// }
</script>

<form on:submit|preventDefault={submit}>
	<p>
		No password or personal information is required to list your properties.<br
		/>
		Email will is used to correlate your property, only you can edit properties you've
		listed. After confirming your email you will be redirected back to the site with
		access to add and edit forms.
	</p>

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

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: var(--gap-small);
	}
	input[type="email"] {
		display: block;
		padding: var(--padding-small);
		color: var(--primary-content);
		border: var(--border);
		border-radius: var(--border-radius);
		width: 100%;
		background: transparent;
	}
	p {
		max-width: 369px;
	}
</style>
