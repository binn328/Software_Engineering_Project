import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	//로그인 상태가 아니면 로그인 페이지로 가게 함
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/auth/login');
	}
}
