import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

/**
 *
 * @param {string} userId user의 id값
 */
async function getGradeList(userId) {
	const gradeList = await pb.collection('Grade').getList(1, 50, {
		filter: 'owner = ' + userId
	});
}
