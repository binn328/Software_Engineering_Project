/**
 *
 * @param {App.Locals} locals 현재 로그인된 유저의 정보들이 담겨있다.
 * @returns
 */
export async function findRecordByOwner(locals) {
	const records = await locals.pb.collection('TodoList').getFullList({
		// 현재 로그인된 유저가 생성한 TodoList 레코드들만 가져온다.
		filter: `owner = "${locals.pb.authStore.model?.id}"`
	});
	return records;
}

/**
 *
 * @param {App.Locals} locals
 * @param {*} formData
 */
export async function insertRecord(locals, formData) {
	const data = {
		start_date: formData.get('start_date'),
		end_date: formData.get('end_date'),
		is_complete: formData.get('is_complete'),
		memo: formData.get('memo'),
		owner: locals.pb.authStore.model?.id,
		category: formData.get('category')
	};
	const record = await locals.pb.collection('TodoList').create(data);

	throw redirect(303, '/todoList');
}

/**
 * @param {App.Locals} locals
 * @param {*} formData
 */
export async function updateRecord(locals, formData) {
	const data = {
		start_date: formData.get('start_date'),
		end_date: formData.get('end_date'),
		is_complete: formData.get('is_complete'),
		memo: formData.get('memo'),
		owner: locals.pb.authStore.model?.id,
		category: formData.get('category')
	};

	const record = await locals.pb.collection('TodoList').update(formData.get('id'), data);

	throw redirect(303, '/todoList');
}
/**
 *
 * @param {App.Locals} locals
 * @param {*} formData
 * @returns
 */
export async function deleteRecord(locals, formData) {
	const result = await locals.pb.collection('TodoList').delete(formData.get('id'));

	throw redirect(303, '/todoList');
}
