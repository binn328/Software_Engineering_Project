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
 * @param {Object} data
 */
export async function insertRecord(locals, data) {
	const record = await locals.pb.collection('Grade').create(data);

	return record;
}
