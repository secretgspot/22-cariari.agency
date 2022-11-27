<script>
	import { navigating, page } from "$app/stores";
	import { supabase } from "$lib/db";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { Toasts } from "$lib/toasts";
	// import { FixedLine } from "$lib/loaders";
	import Splash from "$lib/Splash.svelte";

	// export let data;
	// console.log("/+layout.svelte previousPage: ", previousPage);

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			invalidate("supabase:auth");
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Toasts />

{#if $navigating}
	<Splash />
	<!-- <FixedLine /> -->
{/if}

<slot />
