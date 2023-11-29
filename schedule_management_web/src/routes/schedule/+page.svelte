<script>
	import Component_addSchedule from '$lib/component/addSchedule_ver2.svelte';
	export let data;
	// db에서 가져온 스케줄 목록
	const scheduleList = data.scheduleList;

	/* 페이지 동작에 필요한 변수들 */
	let showAddSchedule = false;

	/* 페이지 동작에 필요한 함수들 */
	function addSchedule() {
		showAddSchedule = true;
	}
	function closeAddSchedule() {
		showAddSchedule = false;
	}

	/** 중요도를 보고 배경 색을 반환한다.
	 * @param {number} importance_level
	 */
	function getBgColor(importance_level) {
		if (importance_level == 1) {
			return 'pink';
		} else if (importance_level == 2) {
			return 'yellow';
		} else if (importance_level == 3) {
			return 'green';
		} else {
			return 'gray';
		}
	}
</script>

<div class="container">
	{#each scheduleList as schedule}
		<form method="post" action="?/updateSchedule">
			<div class="schedule-item" style="background-color: {getBgColor(schedule.importance_level)};">
				<div class="date-day" style="color:black;">{schedule.start_date}</div>
				<div class="event-container">
					<div class="event" style="background-color: rgba(255, 255, 255, 0.8);">
						{schedule.schedule_name}
						<input name="id" type="text" value={schedule.id} hidden />
					</div>
					<div class="buttons">
						<button class="button pink" type="submit" formaction="?/deleteSchedule">Delete</button>
					</div>
				</div>
			</div>
		</form>
	{/each}
	{#if showAddSchedule}
		<Component_addSchedule on:close={closeAddSchedule} />
	{/if}

	<div class="add-schedule" on:click={addSchedule}>
		<div class="add-schedule-btn">+</div>
		<div>Schedule 추가하기</div>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 20px auto;
		font-family: 'Arial', sans-serif;
		transition: background-color 0.3s ease;
	}

	.add-schedule {
		border: 2px dashed #000;
		border-radius: 10px;
		padding: 20px;
		text-align: center;
		margin-bottom: 20px;
		cursor: pointer;
	}
	.add-schedule:hover {
		background-color: #eee; /* 마우스가 올라가 있을때 배경색 변경 */
	}
	.add-schedule:active {
		/*마우스 클릭시 */
		background-color: #ddd;
	}

	.add-schedule-btn {
		font-size: 24px;
		margin-bottom: 10px;
	}

	.schedule-item {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 15px;
		border-radius: 8px;
		margin-bottom: 15px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.year {
		font-size: 20px;
		color: #333;
		margin-bottom: 8px;
	}

	.date-day {
		font-size: 16px;
		color: #555;
		margin-bottom: 8px;
	}

	.event-container {
		display: flex;
		flex-direction: column;
	}

	.event {
		background-color: #f0f0f0;
		padding: 10px;
		border-radius: 5px;
		margin-bottom: 10px;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
	}

	.button {
		margin-left: 10px;
		padding: 8px 12px;
		font-size: 14px;
		cursor: pointer;
		border-radius: 5px;
	}

	.pink {
		background-color: #ff7979; /* Light Pink */
		color: #fff;
	}

	.blue {
		background-color: #3498db; /* Dodger Blue */
		color: #fff;
	}

	.yellow {
		background-color: #f9ca24; /* Yellow */
		color: #fff;
	}
</style>
