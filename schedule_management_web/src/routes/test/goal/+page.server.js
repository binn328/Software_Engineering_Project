import { deleteGoalRecord, findGoalRecordByOwner, insertGoalRecord, updateGoalRecord } from '$lib/goal/goal_sql';

export async function load({ locals }) {
	// 데이터베이스에서 유저가 생성해두었던 goal 데이터를 가져온다.
	const goalList = await findGoalRecordByOwner(locals);

	return {
		goalList
	};
}

export const actions = {
	addGoal: async ({ locals, request }) => {
		const result = await insertGoalRecord(locals, await request.formData());

		return result;
	},
	updateGoal: async ({ locals, request }) => {
		const result = await updateGoalRecord(locals, await request.formData());

		console.log(result);
		return result;
	},
	deleteGoal: async ({ locals, request }) => {
		const result = await deleteGoalRecord(locals, await request.formData());

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
