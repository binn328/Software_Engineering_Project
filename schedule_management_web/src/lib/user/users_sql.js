import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

/**
 *
 * @param {App.Locals} locals 현재 로그인된 유저의 정보들이 담겨있다.
 * @returns
 */
export async function findRecordByOwner(locals) {
	const records = await locals.pb.collection('users').getFullList({
		// 현재 로그인된 유저가 생성한 user 레코드들만 가져온다.
		filter: `id = "${locals.pb.authStore.model?.id}"`
	});
	return records;
}

/**
 *
 * @param {App.Locals} locals
 * @param {*} formData
 */
export async function updateRecord(locals, formData) {
	const id = formData.get('id');
	const data = {
		password: formData.get('password'),
        passwordConfirm: formData.get('passwordConfirm'),
		oldPassword: formData.get('oldPassword'),
	};

	const record = await locals.pb.collection('users').update(id, data);

	throw redirect(303, '/');
}

/**
 *
 * @param {App.Locals} locals
 * @param {*} formData
 */
export async function deleteRecord(locals, formData) {
	const id = formData.get('id');
	const deleteUser = await locals.pb.collection('users').delete(id);
	
	throw redirect(303, '/');
}
