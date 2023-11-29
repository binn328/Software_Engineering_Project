import { redirect } from '@sveltejs/kit';
import { updateRecord } from '$lib/user/users_sql';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	//로그인 상태가 아니면 로그인 페이지로 가게 함
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/auth/login');
	}
}
export const actions = {
	updateUsers: async ({locals, request}) => {
		const result = updateRecord(locals, await request.formData());

		return result;
	}
}
