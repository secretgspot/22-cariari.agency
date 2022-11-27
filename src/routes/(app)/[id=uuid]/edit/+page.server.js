/** @type {import('./$types').PageServerLoad} */
// import { getSupabase } from '@supabase/auth-helpers-sveltekit';
// import { redirect, error, invalid } from '@sveltejs/kit';
// import { isEmpty } from '$lib/utils/helpers.js';

// export async function load(event) {
// 	// console.log('/formulario/edit/[msl]+page.server.js event: ', event);
// 	// something returned from +layout.server.js
// 	// const { something } = await parent();
// 	const { params, route } = event;

// 	const { session, supabaseClient } = await getSupabase(event);
// 	if (session?.user.app_metadata.claims_admin) {
// 		console.log('🌟');
// 	}

// 	// Get the SLUG
// 	const { id: property_id } = params;
// 	console.log('params:', params);


// 	const getPropertyDetails = async () => {
// 		const { data: propertyData, error: propertyErr } = await supabaseClient
// 			.from('properties')
// 			.select('*')
// 			.eq('id', property_id).single();
// 		if (propertyErr) throw error(500, `Can't get property with id: ${property_id}, ${propertyErr.message}`)

// 		if (propertyData) {
// 			console.log(`📷 check photos for ${propertyData.msl}`)
// 			const { data: photosData, error: photosErr } = await supabaseClient
// 				.from("photos")
// 				.select("*")
// 				.eq("msl", propertyData.msl);
// 			if (!isEmpty(photosData)) {
// 				console.log('📷📷 photos detected', photosData.length)
// 				propertyData.photos = photosData;
// 			};
// 		}

// 		return propertyData;
// 	}

// 	return {
// 		property: getPropertyDetails(),
// 	};
// };
