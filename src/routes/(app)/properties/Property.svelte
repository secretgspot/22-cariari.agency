<script>
	import { goto } from "$app/navigation";
	import { formatter, ago } from "$lib/utils/helpers.js";
	import { Button, LinkButton } from "$lib/buttons";

	export let property;

	let isAdmin = true;
</script>

<section
	class="property"
	class:deactivated={!property.is_active}
	on:click={() => goto(`/${property.id}`)}
	on:keydown
>
	<figure class="property-image">
		<!-- <figure class="property-image" style="background-image: url({property.photos[0]})" loading="lazy"> -->
		{#if property.photo}
			<img
				src={property.photo}
				alt="{property.id} photo"
				loading="lazy"
				intrinsicsize="281x222"
			/>
		{:else}
			No Photo
		{/if}
		<!-- <caption>{property.photos.length} images</caption> -->
	</figure>

	<div class="property-header">
		<div class="land_use">
			{#each property.property_for as p_for}
				<span>{p_for}</span>
			{/each}
		</div>

		<div class="type_age">
			{#if property.land_use}<span>{property.land_use}</span>{/if}
			{#if property.building_style}<span>&bull; {property.building_style}</span
				>{/if}
			{#if property.year_built}<span
					>&bull; {ago(new Date(property.year_built))} old</span
				>{/if}
		</div>

		<div class="price_rent">
			{#if property.rent}<span>{formatter.format(property.rent)}/m</span>{/if}
			{#if property.price}<span>{formatter.format(property.price)}</span>{/if}
		</div>

		<div class="loc_address">
			<!-- {#if property.address}<span>{property.address}</span>{/if} -->
			{#if property.location}<span
					>{property.location.lat} / {property.location.lng}</span
				>{/if}
		</div>
	</div>

	<div class="property-details">
		<details class="column wrap">
			<summary>Details</summary>
			{#if property.beds}<span>{property.beds} beds</span>{/if}
			{#if property.baths}<span>{property.baths} baths</span>{/if}
			{#if property.half_baths}<span>{property.half_baths} half baths</span
				>{/if}
			{#if property.rooms}<span>{property.rooms} rooms</span>{/if}
			{#if property.parking_spaces}<span
					>{property.parking_spaces} parkings</span
				>{/if}
			{#if property.lot_size}<span>{property.lot_size}㎡ lot</span>{/if}
			{#if property.building_size}<span>{property.building_size}㎡</span>{/if}
			{#if property.fees}<span>fees: {property.fees}</span>{/if}
			{#if property.taxes}<span>taxes: {property.taxes}</span>{/if}
			<!-- {#if property.id}<span>id: {property.id}</span>{/if} -->
		</details>

		<details class="column">
			<summary>Contacts</summary>
			{#if property.contact_phone}<span>{property.contact_phone}</span>{/if}
			{#if property.contact_email}<span>{property.contact_email}</span>{/if}
		</details>
	</div>

	<footer class="property-footer">
		<div class="dates wrap">
			<span>added {ago(new Date(property.created_at))} ago</span>
			<span>updated {ago(new Date(property.updated_at))} ago</span>
		</div>

		<div class="details wrap">
			{#if property.location}<small class="loc"
					>{property.location.lat} / {property.location.lng}</small
				>{/if}
			<span>[{property.msl}]</span>
		</div>

		<div class="buttons">
			{#if isAdmin}
				<!-- <Button href="property/{property.id}">Edit</Button> -->
				<Button size="icon" on:click={() => goto(`property/${property.id}`)}
					>Edit</Button
				>
			{/if}
			<!-- <Button href="/{property.id}">View</Button> -->
		</div>
	</footer>
</section>

<style>
	.properties_list.grid > .property {
		grid-template-columns: 1fr;
		/* grid-template-rows: minmax(auto, 222px) min-content auto min-content; */
		grid-template-rows: minmax(auto, 222px) min-content min-content;
		grid-template-areas:
			"property-image"
			"property-header"
			/* "property-details" */
			"property-footer";
		/* padding: 1rem 0 0; */
	}

	/* PROPERTIES LIST -> PROPERTY */
	.property {
		display: grid;
		grid-template-columns: minmax(270px, min-content) auto;
		/* grid-template-columns: 1fr 1fr; */
		/* grid-template-rows: auto 1fr auto; */
		grid-template-rows: 1fr auto;
		grid-template-areas:
			"property-header property-header"
			/* "property-image property-details" */
			"property-footer property-footer";
		position: relative;
		border: 0px solid var(--border-color);
		border-radius: var(--border-radius);
		/* margin: 1rem; */
		background: var(--primary);
		box-shadow: var(--shadow-small);
		cursor: pointer;
	}
	@media (min-width: 1024px) {
		.property {
			grid-template-areas:
				"property-image property-header"
				/* "property-image property-details" */
				"property-image property-footer";
			margin: 1rem;
		}
	}

	/* PROPERTIES LIST -> PROPERTY -> HEADER */
	.property-header {
		grid-area: property-header;
		display: flex;
		flex-direction: column;
		/* padding: 1rem; */
		box-shadow: var(--shadow-small);
	}
	.property-header .land_use {
		display: flex;
		justify-content: space-between;
	}
	.property-header .type_age {
		text-transform: uppercase;
		color: var(--secondary-content);
	}
	.property-header .price_rent {
		/* font-size: 144%; */
		display: flex;
		justify-content: space-between;
		/* margin: 0.3rem 0; */
	}
	.property-header .loc_address {
		/* font-size: 90%; */
		display: flex;
		flex-direction: column;
		color: var(--secondary-content);
		display: none;
	}

	/* PROPERTIES LIST -> PROPERTY -> IMAGE */
	.property-image {
		grid-area: property-image;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* margin: 0; */
		position: relative;
		background-size: cover;
		border-radius: var(--border-radius) var(--border-radius) 0 0;
		filter: brightness(var(--brightness));
	}
	.property-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	/* .property-image caption { display: none; } */
	@media (min-width: 768px) {
		/* .property-image img { width: 208px; height: auto; } */
	}
	@media (min-width: 1024px) {
		.properties_list:not(.grid) > .property .property-image {
			border-radius: var(--border-radius) 0 0 var(--border-radius);
		}
	}

	/* PROPERTIES LIST -> PROPERTY -> DETAILS */
	.property-details {
		grid-area: property-details;
		/* padding: 1rem; */
		display: none;
	}
	.property-details details summary {
		cursor: pointer;
		color: var(--accent);
	}
	.property-details details > span {
		/* margin: 0.2rem; */
		display: inline-block;
		/* padding: 0.2rem; */
		border-radius: var(--border-radius);
		background: var(--secondary);
	}

	/* PROPERTIES LIST -> PROPERTY -> FOOTER */
	.property-footer {
		grid-area: property-footer;
		display: flex;
		flex-direction: column;
		background: var(--secondary);
		border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
	}
	.property-footer .dates {
		display: flex;
		justify-content: space-between;
		color: var(--accent-content);
		font-size: smaller;
		/* margin: 1rem; */
	}
	.property-footer .details {
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* margin: 0 1rem 1rem; */
	}
	.property-footer .details .loc {
		color: var(--accent-content);
	}

	.property:hover .property-footer .buttons {
		display: block;
	}
	.property-footer .buttons {
		display: none;
		position: absolute;
		top: 0;
		right: 0;
	}
	/* .property-footer :global(button) {
		height: auto;
		border-top-right-radius: 0;
		border-top-left-radius: 0;
		border-bottom-right-radius: 0;
		border-top-width: 0;
		border-right-width: 0;
		background: var(--bg-primary);
		color: var(--txt-primary);
	} */
	/* .property-footer :global(a) {
	flex: 0 1 auto;
} */
</style>
