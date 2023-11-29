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
		start_date: formData.get('start_date'),
		end_date: formData.get('end_date'),
		location: formData.get('location'),
		schedule_name: formData.get('schedule_name'),
		importance_level: formData.get('importance_level'),
		repeat: formData.get('repeat'),
		bg_color: formData.get('bg_color')
	};
	const record = await locals.pb.collection('Schedule').create(data);

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
		start_date: formData.get('start_date'),
		end_date: formData.get('end_date'),
		location: formData.get('location'),
		schedule_name: formData.get('schedule_name'),
		importance_level: formData.get('importance_level'),
		repeat: formData.get('repeat'),
		bg_color: formData.get('bg_color')
	};

	const record = await locals.pb.collection('Schedule').update(id, data);

	return record;
}

/**
 *
 * @param {App.Locals} locals
 * @param {*} formData
 */
export async function deleteRecord(locals, formData) {
	const id = formData.get('id');
	const record = await locals.pb.collection('Schedule').delete(id);

	return record;
}
