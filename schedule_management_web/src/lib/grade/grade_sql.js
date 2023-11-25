/**
 *
 * @param {App.Locals} locals 현재 로그인된 유저의 정보들이 담겨있다.
 * @returns
 */
export async function findRecordByOwner(locals) {
	const records = await locals.pb.collection('Grade').getFullList({
		// 현재 로그인된 유저가 생성한 grade 레코드들만 가져온다.
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
		credit: formData.get('credit'),
		is_major: formData.get('is_major'),
		subject: formData.get('subject'),
		grade: formData.get('grade'),
		semester: formData.get('semester'),
		year: formData.get('year')
	};
	const record = await locals.pb.collection('Grade').create(data);

	return record;
}

/**
 * @param {App.Locals} locals
 * @param {*} formData
 */
export async function updateRecord(locals, formData) {
	const data = {
		owner: locals.pb.authStore.model?.id,
		credit: formData.get('credit'),
		is_major: formData.get('is_major'),
		subject: formData.get('subject'),
		grade: formData.get('grade'),
		semester: formData.get('semester'),
		year: formData.get('year')
	};

	const record = await locals.pb.collection('Grade').update(formData.get('id'), data);

	return record;
}
/**
 *
 * @param {App.Locals} locals
 * @param {*} formData
 * @returns
 */
export async function deleteRecord(locals, formData) {
	const result = await locals.pb.collection('Grade').delete(formData.get('id'));

	return result;
}
