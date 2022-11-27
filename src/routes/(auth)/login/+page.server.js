/** @type {import('./$types').PageServerLoad} */
import { invalid, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { isValidEmail } from "$lib/utils/validators.js";

export async function load(event) {
	// const { url } = event;
	// // console.log('url:-------> ', url)
	// const backpage = url.searchParams.get('redirect') ?? '/';

	// const { session, supabaseClient } = await getSupabase(event);
	// if (session) {
	// 	throw redirect(303, "/");
	// }
	// return { session };
};

export const actions = {
	signin: async (event) => {
		const { request, cookies, url } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return invalid(400, {
					error: true,
					message: 'Credenciales no válidas.',
					values: {
						email
					}
				});
			}
			return invalid(500, {
				error: true,
				message: 'Error del Servidor. Vuelva a intentarlo más tarde.',
				values: {
					email
				}
			});
		}

		// return {
		// 	success: true,
		// 	message: `Conectado`
		// }
		if (url.searchParams.has('redirect')) {
			throw redirect(303, url.searchParams.get('redirect'));
		} else {
			throw redirect(303, '/');
		}
	},

	password_reset: async (event) => {
		const { request, cookies, url } = event;
		const { session, supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');

		if (!isValidEmail(email)) return invalid(400, {
			error: true,
			message: 'Debe ingresar una dirección de correo electrónico válida',
			values: {
				email
			}
		});

		const { error } = await supabaseClient.auth.resetPasswordForEmail(email);

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return invalid(400, {
					error: true,
					message: 'Credenciales no válidas.',
					values: {
						email
					}
				});
			}
			return invalid(500, {
				error: true,
				message: 'Error del Servidor. Vuelva a intentarlo más tarde.',
				values: {
					email
				}
			});
		}

		return {
			success: true,
			message: `Felicitaciones, por favor revise su correo electrónico`
		}
	},

	signout: async (event) => {
		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();
		throw redirect(303, '/');
	}
};