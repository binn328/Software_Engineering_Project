import {
	deleteRecord,
	findRecordByOwner,
	insertRecord,
	updateRecord
} from '$lib/timetable/timetable_sql.js';

export async function load({ locals }) {
	// 데이터베이스에서 유저가 생성해두었던 timetable 데이터를 가져온다.
	const TimeTableList = findRecordByOwner(locals);
	return {
		TimeTableList
	};
}

export const actions = {
	addTimeTable: async ({ locals, request }) => {
		const result = insertRecord(locals, await request.formData());

		return result;
	},
	updateTimeTable: async ({ locals, request }) => {
		const result = updateRecord(locals, await request.formData());

		return result;
	},
	deleteTimeTable: async ({ locals, request }) => {
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
