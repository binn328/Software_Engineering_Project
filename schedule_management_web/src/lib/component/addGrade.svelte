<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
	export let data;
	const year = data.year;
	const semester = data.semester;
</script>

<div class="add-grade-modal">
	<form method="post" action="?/addGrade">
		<h2>학점 추가하기</h2>
		<label>
			과목 이름
			<input name="subject" type="text" required />
		</label>
		<label>
			학점
			<input name="credit" type="number" required min="1" max="6" />
		</label>
		<label>
			구분
			<select name="is_major" required>
				<option value="true">전공</option>
				<option value="false">교양</option>
			</select>
		</label>
		<label>
			학년
			<input name="year" type="number" required min="1" max="6" />
		</label>
		<label>
			학기
			<input name="semester" type="number" required min="1" max="2" />
		</label>
		<div class="buttons">
			<button type="submit">추가하기</button>
			<button type="reset" on:click={close}>닫기</button>
		</div>
	</form>
</div>

<style>
	/* AddSchedule 컴포넌트에 대한 스타일 추가 */
	.add-grade-modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: gray;
		width: 500px;

		padding: 30px;
		border-radius: 8px;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	h2 {
		text-align: center;
	}
</style>
