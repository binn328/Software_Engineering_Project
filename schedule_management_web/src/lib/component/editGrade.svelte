<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
	export let editData;
	const year = editData.year;
	const semester = editData.semester;
	const subject = editData.subject;
	const credit = editData.credit;
	const is_major = editData.is_major;
	const grade = editData.grade;
	const id = editData.id;
</script>

<div class="edit-grade-modal">
	<form method="post" action="?/editGrade">
		<h2>학점 수정하기</h2>
		<div class="scrollable-content">
			<label>
				과목 이름
				<input name="subject" type="text" required value={subject} />
			</label>
			<label>
				학점
				<input name="credit" type="number" required min="1" max="6" value={credit} />
			</label>
			<label>
				구분
				<select name="is_major" required value={is_major}>
					<option value="true">전공</option>
					<option value="false">교양</option>
				</select>
			</label>
			<label>
				학년
				<input name="year" type="number" value={year} required min="1" max="6" />
			</label>
			<label>
				학기
				<input name="semester" type="number" value={semester} required min="1" max="2" />
			</label>
			<label>
				점수
				<input name="grade" type="number" required min="0.0" max="4.5" step="0.5" value={grade} />
			</label>
			<input name="id" type="text" value={id} hidden />
		</div>

		<div class="buttons">
			<div style="display: flex; justify-content: space-between">
				<button type="submit" style="width: 45%">수정하기</button>
				<button type="submit" formaction="?/deleteGrade" style="width: 45%" class="pink"
					>삭제하기</button
				>
			</div>
			<button type="reset" on:click={close}>닫기</button>
		</div>
	</form>
</div>

<style>
	.edit-grade-modal {
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

	.scrollable-content {
		max-height: 550px; /* 스크롤 가능한 최대 높이 설정 */
		overflow-y: auto; /* 세로 스크롤 활성화 */
	}
	.pink {
		background-color: #ff7979; /* Light Pink */
		color: #fff;
	}

	.blue {
		background-color: #3498db; /* Dodger Blue */
		color: #fff;
	}
</style>
