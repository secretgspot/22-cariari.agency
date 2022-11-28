<script>
	/** @type {import('./$types').PageData} */
	import JsonDump from "$lib/JSONDump.svelte";
	import ErrorImage from "$lib/ErrorImage.svelte";
	import Property from "./Property.svelte";
	import Filter from "./Filter.svelte";

	export let data;

	let filter;
	let view_style = "grid";

	const filters = {
		is_active: (is_active) => is_active == filter.active,
		land_use: (land_use) => land_use == filter.filter_type,
		property_for: (property_for) =>
			property_for.find((x) => filter.filter_for.includes(x)),
		rent: (rent) => rent <= filter.rent,
		price: (price) => price <= filter.price,
		beds: (beds) => beds <= filter.beds,
		baths: (baths) => baths <= filter.baths,
		rooms: (rooms) => rooms <= filter.rooms,
		msl: (msl) => msl.includes(filter.msl),
	};

	$: filtered = (filter && filterArray(data.properties, filters)) || [];

	function filterArray(array, filters) {
		const filterKeys = Object.keys(filters);
		return array.filter((item) => {
			// validates all filter criteria
			return filterKeys.every((key) => {
				if (typeof filters[key] !== "function") return true; // ignores non-function predicates
				if (!filters[key].length) return true; // passing an empty filter means that filter is ignored.
				console.log("🎈", filters[key](item[key]));
				return filters[key](item[key]);
			});
		});
	}
</script>

<main>
	<!-- {#if filtered.length > 0} -->
	<div class="properties_list {view_style}">
		{#each data.properties as property (property.id)}
			<Property {property} />
		{/each}
	</div>
	<!-- {:else}
		<div class="nothing_to_see">
			<ErrorImage type="empty" />
		</div>
	{/if} -->

	<aside class="filter-wrapper">
		<div class="filters-menu">
			<div class="view_type">
				<input
					type="radio"
					id="radio_grid"
					bind:group={view_style}
					value="grid"
				/>
				<label class="radio radio_grid" for="radio_grid"
					><span>☷<!-- &#9783; --></span></label
				>

				<input
					type="radio"
					id="radio_list"
					bind:group={view_style}
					value="list"
				/>
				<label class="radio radio_list" for="radio_list"
					><span>☰<!-- &#9776; --></span></label
				>
			</div>

			<h3>{filtered.length} / {data.properties.length}</h3>

			<!-- {#if isAdmin}
					<Button href="/property">Add new</Button>
				{/if} -->
		</div>

		<Filter bind:filter />
	</aside>
</main>

<JsonDump name="data" {data} />

<style>
	main {
		display: grid;
		height: 100vh;
		width: 100vw;
		grid-template-rows: 30vh 1fr;
	}

	@media (min-width: 768px) {
		.filter-wrapper {
			height: 100vh;
			display: grid;
			position: relative;
		}
		main {
			grid-template-rows: 1fr;
			grid-template-columns: 1fr 369px;
		}
		/* main :global(.map) {
			width: 70vw;
		} */
	}

	/*
		PROPERTIES LIST SECTION
	 */
	/* .properties_list {
		grid-area: list;
		display: grid;
		grid-template-columns: minmax(min-content, auto);
		grid-template-rows: max-content;
		grid-auto-flow: dense;
		grid-gap: 1rem;
		background: var(--bg-tertiary);
		padding: 3rem 0;
	}
	@media (min-width: 768px) {
		.properties_list.grid {
			grid-template-columns: repeat(auto-fit, minmax(min-content, 252px));
		}
	}
	@media (min-width: 1024px) {
		.properties_list.grid {
			grid-template-columns: repeat(auto-fit, minmax(min-content, 313px));
		}
	} */

	/*
		NOTHING TO SEE LIST SECTION
	 */
	.nothing_to_see {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: var(--bg-secondary);
	}
	.nothing_to_see :global(svg) {
		max-width: 63%;
		/* filter: brightness(var(--brightness)); */
	}

	/*
		FILTER SECTION
	 */
	.filters-wrappers {
		position: sticky;
		top: 0px;
	}
	.filters-menu {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		justify-items: center;
		margin: 0 2rem;
	}
	.filters-menu h3 {
		white-space: nowrap;
	}
	.view_type {
		display: none;
	}
	@media (min-width: 720px) {
		.view_type {
			display: flex;
		}
	}
	.view_type label {
		border: 1px solid var(--border);
		padding: 0.5rem 1rem;
		color: var(--txt-primary);
		border-radius: 9px;
		box-shadow: 1px 1px 3px var(--shadow);
		cursor: pointer;
	}

	.view_type label:not(:first-of-type) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.view_type label:not(:last-of-type) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	.view_type input[type="radio"] {
		display: none;
	}
	.view_type input[type="radio"]:checked + label {
		border: 1px solid var(--color-success);
	}
</style>
