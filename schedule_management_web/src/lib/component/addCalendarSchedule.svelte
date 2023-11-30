<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
	export let componentData;
	const start_date = componentData.selectedDate;
	const next_date = new Date(start_date);
	next_date.setDate(start_date.getDate() + 1);
</script>

<div class="add-schedule-modal">
	<form method="post" action="?/addSchedule">
		<h2>일정</h2>
		<label>
			일정 이름
			<input name="schedule_name" type="text" required />
		</label>
		<label>
			<input name="start_date" value={next_date.toISOString().slice(0, 10)} required hidden />
		</label>
		<label>
			마감일
			<input name="end_date" type="date" />
		</label>
		<label>
			장소
			<input name="location" type="text" />
		</label>
		<label>
			중요도
			<input name="importance_level" type="number" value="1" min="1" max="3" />
		</label>
		<label>
			반복
			<input name="repeat" type="checkbox" class="re-che" />
		</label>
		<div class="buttons">
			<button type="submit">추가하기</button>
			<button type="reset" on:click={close}>닫기</button>
		</div>
	</form>
</div>

<style>
	/* AddSchedule 컴포넌트에 대한 스타일 추가 */
	.add-schedule-modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		width: 500px;

		padding: 30px;
		border-radius: 8px;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	.re-che {
		margin-left: 360px;
	}
	h2 {
		text-align: center;
	}
</style>
