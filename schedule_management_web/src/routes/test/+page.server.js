import { deleteRecord, findRecordByOwner, insertRecord, updateRecord } from '$lib/grade/grade_sql';

export async function load({ locals }) {
	// 데이터베이스에서 유저가 생성해두었던 grade 데이터를 가져온다.
	const gradeList = await findRecordByOwner(locals);

	return {
		gradeList
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
	}
};
