import { findRecordByOwner, insertRecord } from '$lib/grade/grade_sql';

export async function load({ locals }) {
	// 데이터베이스에서 유저가 생성해두었던 grade 데이터를 가져온다.
	const gradeList = findRecordByOwner(locals);

	return {
		gradeList
	};
}

export const actions = {
	addGrade: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = {
			owner: locals.pb.authStore.model?.id,
			credit: formData.get('credit'),
			is_major: formData.get('is_major'),
			subject: formData.get('subject'),
			grade: formData.get('grade'),
			semester: formData.get('semester'),
			year: formData.get('year')
		};
		const result = insertRecord(locals, data);

		return result;
	}
};
