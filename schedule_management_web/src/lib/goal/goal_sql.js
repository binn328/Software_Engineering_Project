import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

/**
 *
 * @param {App.Locals} locals 현재 로그인된 유저의 정보들이 담겨있다.
 * @returns
 */
export async function findRecordByOwner(locals) {
	const records = await locals.pb.collection('Schedule').getFullList({
		// 현재 로그인된 유저가 생성한 schedule 레코드들만 가져온다.
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
		owner: locals.pb.authStore.model?.id,
		is_complete: formData.get('is_complete'),
		goal_name: formData.get('goal_name'),
	};
	const record = await locals.pb.collection('Goal').create(data);

	return record;
}

/**
 *
 * @param {App.Locals} locals
 * @param {*} formData
 */
export async function updateRecord(locals, formData) {
	const id = formData.get('id');
	const data = {
		is_complete: formData.get('is_complete'),
		goal_name: formData.get('goal_name'),
	};

	const record = await locals.pb.collection('Goal').update(id, data);

	return record;
}

/**
 *
 * @param {App.Locals} locals
 * @param {*} formData
 */
export async function deleteRecord(locals, formData) {
	const id = formData.get('id');
	const record = await locals.pb.collection('Goal').delete(id);

	return record;
}