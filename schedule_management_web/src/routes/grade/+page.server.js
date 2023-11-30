import { redirect } from '@sveltejs/kit';
import {
	deleteRecord,
	findGradeBySemester,
	findRecordByOwner,
	findgraduateCredit,
	insertRecord,
	updateRecord
} from '$lib/grade/grade_sql';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	//로그인 상태가 아니면 로그인 페이지로 가게 함
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/auth/login');
	}

	// 데이터베이스에서 유저가 생성해두었던 grade 데이터를 가져온다.
	const gradeList = findRecordByOwner(locals);
	// const graduate_credit = findgraduateCredit(locals);
	// const one_one_gradeList = findGradeBySemester(locals, 1, 1);

	return {
		gradeList: gradeList
		// graduate_credit: graduate_credit,
		// one_one_gradeList: one_one_gradeList
	};
}

export const actions = {
	addGrade: async ({ locals, request }) => {
		const result = await insertRecord(locals, await request.formData());

		return result;
	},
	updateGrade: async ({ locals, request }) => {
		const result = await updateRecord(locals, await request.formData());

		console.log(result);
		return result;
	},
	deleteGrade: async ({ locals, request }) => {
		const result = await deleteRecord(locals, await request.formData());

		if (result) {
			return {
				code: 204
			};
		} else {
			return {
				code: 400
			};
		}
	},
	getGrades: async ({ locals, request }) => {
		const formData = await request.formData();

		const result = await findGradeBySemester(locals, formData.year, formData.semester);

		return result;
	}
};
