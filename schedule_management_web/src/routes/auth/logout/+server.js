import { redirect } from '@sveltejs/kit';
import { toast } from '@zerodevx/svelte-toast';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals }) {
	//사용자 인증 정보 지우기
	locals.pb.authStore.clear();
	locals.user = null;

	toast.push('로그아웃');
	throw redirect(303, '/');
}
