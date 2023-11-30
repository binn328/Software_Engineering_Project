import {
	deleteRecord,
	findRecordByOwner,
	insertRecord,
	updateRecord
} from '$lib/todoList/todoList.js';

export async function load({ locals }) {
	// 데이터베이스에서 유저가 생성해두었던 todoList 데이터를 가져온다.
	const todoList = await findRecordByOwner(locals);

	return {
		todoList
	};
}

export const actions = {
	addTodo: async ({ locals, request }) => {
		const result = await insertRecord(locals, await request.formData());

		return result;
	},
	updateTodo: async ({ locals, request }) => {
		const result = await updateRecord(locals, await request.formData());

		console.log(result);
		return result;
	},
	deleteTodo: async ({ locals, request }) => {
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
