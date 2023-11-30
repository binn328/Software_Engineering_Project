import { redirect } from '@sveltejs/kit';
import { deleteRecord, findRecordByOwner, insertRecord, updateRecord } from '$lib/schedule/schedule_sql';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	//로그인 상태가 아니면 로그인 페이지로 가게 함
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/auth/login');
	}

		// 데이터베이스에서 유저가 생성해두었던 schedule 데이터를 가져온다.
	const scheduleList = findRecordByOwner(locals);

	return {
		scheduleList: scheduleList
	};
}

export const actions = {
	addSchedule: async ({ locals, request }) => {
		const result = insertRecord(locals, await request.formData());

		return result;
	},
	updateSchedule: async ({ locals, request }) => {
		const result = updateRecord(locals, await request.formData());

		return result;
	  },
	deleteSchedule: async({ locals, request }) => {
		const result = deleteRecord(locals, await request.formData());

		return result;
	}
};


