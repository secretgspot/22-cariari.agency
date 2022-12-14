/** @type {import('./$types').PageServerLoad} */
import { AuthApiError } from '@supabase/supabase-js';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, error, fail } from '@sveltejs/kit';
import { isEmpty } from '$lib/utils/helpers.js';

export async function load(event) {
	// console.log('/formulario/edit/[msl]+page.server.js event: ', event);
	// something returned from +layout.server.js
	// const { something } = await parent();
	const { params, route } = event;

	const { session, supabaseClient } = await getSupabase(event);

	// if (!session) {
	// 	throw redirect(303, '/login');
	// }

	if (session?.user.app_metadata.claims_admin) {
		console.log('🌟');
	}

	// Get the SLUG
	const { id: property_id } = params;
	console.log('params:', params);


	// const getPropertyDetails = async () => {
	// 	const { data: propertyData, error: propertyErr } = await supabaseClient
	// 		.from('properties')
	// 		.select('*')
	// 		.eq('id', property_id).single();
	// 	if (propertyErr) throw error(500, `Can't get property with id: ${property_id}, ${propertyErr.message}`)

	// 	if (propertyData) {
	// 		console.log(`📷 check photos for ${propertyData.msl}`)
	// 		const { data: photosData, error: photosErr } = await supabaseClient
	// 			.from("photos")
	// 			.select("*")
	// 			.eq("msl", propertyData.msl);
	// 		if (!isEmpty(photosData)) {
	// 			console.log('📷📷 photos detected', photosData.length)
	// 			propertyData.photos = photosData;
	// 		};
	// 	}

	// 	return propertyData;
	// }

	return {
		// property: getPropertyDetails(),
		logged_in: session,
	};
};
export const actions = {

	// EDIT PROPERTY
	edit: async (event) => {

		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);

		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'You need to log in to edit your listing' });
		}

		const formData = await request.formData();

		const property = {
			id: formData.get('id'),
			updated_at: new Date().toISOString(),
			msl: formData.get('msl'),
			is_active: (formData.get('is_active') == 'Listed' ? true : false),
			description: formData.get('description'),
			address: formData.get('address'),
			location: JSON.parse(formData.get('location')),
			land_use: formData.get('land_use'),
			property_for: JSON.parse(formData.get('property_for')),
			lot_size: Number(formData.get('lot_size')),
			year_built: Number(formData.get('year_built')),
			building_size: Number(formData.get('building_size')),
			building_style: formData.get('building_style'),
			rooms: Number(formData.get('rooms')),
			beds: Number(formData.get('beds')),
			baths: Number(formData.get('baths')),
			half_baths: Number(formData.get('half_baths')),
			parking_spaces: Number(formData.get('parking_spaces')),
			features: JSON.parse(formData.get('features')),
			price: Number(formData.get('price')),
			rent: Number(formData.get('rent')),
			fees: Number(formData.get('fees')),
			taxes: Number(formData.get('taxes')),
			contact_email: formData.get('contact_email'),
			contact_phone: formData.get('contact_phone'),
			contact_realtor: formData.get('contact_realtor'),
		}

		// console.log('/[uuid]/+layout.server.js action -> edit: ', property);

		// push it to the server
		const { data: resData, error: resErr } = await supabaseClient.from('properties').update(property).eq('id', property.id).select().maybeSingle();
		if (resErr) {
			if (resErr instanceof AuthApiError && resErr.status === 400) {
				return fail(400, {
					error: true,
					message: `Unable to add property, ${resErr.message}`,
					property,
				});
			}
			return fail(500, {
				error: true,
				message: `Unable to add property, ${resErr.message}`,
				property,
			});
		}

		return {
			success: true,
			message: `Property ${resData.msl} updated successfully!`
		}

	},

	// DELETES PROPERTY
	delete: async (event) => {

		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);

		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'You need to log in to delete your listing' });
		}

		const formData = await request.formData();

		const property_id = formData.get('id');

		// push it to the server
		const { error: resErr } = await supabaseClient.from('properties').delete().eq('id', property_id);
		if (resErr) {
			if (resErr instanceof AuthApiError && resErr.status === 400) {
				return fail(400, {
					error: true,
					message: `Unable to delete property, ${resErr.message}`,
				});
			}
			return fail(500, {
				error: true,
				message: `Unable to delete property, ${resErr.message}`,
			});
		} else {
			throw redirect(303, '/properties');
		}
		// console.log('RESDATA DELETE', resData);
		// if (resData) throw redirect(302, '/properties');

		// return {
		// 	success: true,
		// 	message: `Property ${resData} has been deleted!`
		// }
	},

	// DELISTS PROPERTY
	remove: async (event) => {

		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);

		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'You need to log in to remove your listing' });
		}

		const formData = await request.formData();

		const property_id = formData.get('id');

		// push it to the server
		const { data: resData, error: resErr } = await supabaseClient.from('properties').update({ is_active: false }).eq('id', property_id).select().single();
		if (resErr) {
			if (resErr instanceof AuthApiError && resErr.status === 400) {
				return fail(400, {
					error: true,
					message: `Unable to delist property, ${resErr.message}`,
					property,
				});
			}
			return fail(500, {
				error: true,
				message: `Unable to delist property, ${resErr.message}`,
				property,
			});
		}

		return {
			success: true,
			message: `Property ${resData.msl} has been delisted!`
		}
	},
}