import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

/**
 *
 * @param {App.Locals} locals 현재 로그인된 유저의 정보들이 담겨있다.
 * @returns
 */
export async function findRecordByOwner(locals) {
	const records = await locals.pb.collection('TimeTable').getFullList({
		// 현재 로그인된 유저가 생성한 TimeTable 레코드들만 가져온다.
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
		memo: formData.get('memo'),
		start_time: formData.get('start_time'),
		end_time: formData.get('end_time')
	};
	const record = await locals.pb.collection('TimeTable').create(data);
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
		owner: locals.pb.authStore.model?.id,
		memo: formData.get('memo'),
		start_time: formData.get('start_time'),
		end_time: formData.get('end_time')
		
	};

	const record = await locals.pb.collection('TimeTable').update(id, data);
	return record;
}

/**
 *
 * @param {App.Locals} locals
 * @param {*} formData
 */
export async function deleteRecord(locals, formData) {
	const id = formData.get('id');
	const record = await locals.pb.collection('TimeTable').delete(id);
	return record;
}