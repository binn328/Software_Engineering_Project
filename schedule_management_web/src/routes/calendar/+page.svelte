<script>
	import { onMount } from 'svelte';
	import Component_editGoal from '$lib/component/editGoal.svelte';
	import Component_addSchedule from '$lib/component/addCalendarSchedule.svelte';
	import Component_editSchedule from '$lib/component/editSchedule_ver3.svelte';

	let currentDate = new Date(); // 현재 날짜
	let todayDate = new Date(); // 오늘 날짜
	let selectedDate = new Date(); // 선택한 날짜
	let selectedDatePlus = new Date();
	let isModalOpen = false; // 모달 창 열림 여부
	let daysInMonth = []; // 월의 날짜 배열
	let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // 요일 배열
	let daysDifference = 0; // 선택 날짜와 현재 날짜의 차이
	
	let eventDetails = {
		deadline: '',
		eventName: '',
		location: '',
		color: '',
		isRepeating: false
	};

	let eventsByDate = {}; // 날짜별 이벤트 저장 객체
	let isCalendarInitialized = false; // 캘린더 초기화 여부

	export let data;
	const goalList = data.goalList;
	const scheduleList = data.scheduleList;
	
	let filteredScheduleList = scheduleList;
	let showEditGoal = false;
	let showAddSchedule = false;
	let editedSchedule = null;

	export let componentData = {
		selectedDate
	};

	function editGoal() {
		showEditGoal = true;
	}
	function closeEditGoal() {
		showEditGoal = false;
	}
	function addSchedule() {
		componentData = {
			selectedDate
		};
		showAddSchedule = true;
	}
	function closeAddSchedule() {
		showAddSchedule = false;
	}

	function editSchedule(schedule) {
      editedSchedule = schedule;
   }

   function closeEditSchedule() {
      editedSchedule = null;
   }

   //각 날짜에 해당하는 일정을 가져오는 함수
	function filterschedule(scheduleList, selectedDate) {
		const start_date = selectedDate;
		const next_date = new Date(start_date);
		next_date.setDate(start_date.getDate() + 1);
	   const filteredschedule = scheduleList.filter(
		  (schedule) => schedule.start_date.slice(0, 10) == next_date.toISOString().slice(0, 10)
	   );
 
		filteredScheduleList = filteredschedule;
	}

	// 캘린더 업데이트 함수
	const updateCalendar = () => {
		daysInMonth = [];

		const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
		const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

		// 이전 달의 공백 날짜 추가
		for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
			daysInMonth.push(null);
		}

		// 현재 달의 날짜 추가
		for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
			daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
		}
		isCalendarInitialized = true; // 캘린더 초기화 완료
	};

	// 선택한 날짜와 현재 날짜의 차이 계산 함수
	const calculateDaysDifference = () => {
		const timeDifference = selectedDate.getTime() - currentDate.getTime();
		daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
	};

	// Svelte 라이프사이클 훅: 컴포넌트가 마운트되면 실행
	onMount(() => {
		updateCalendar(); // 캘린더 업데이트
		todayDate = new Date(); // 오늘 날짜 업데이트
		updateDayStyles(); // 날짜 스타일 업데이트 함수 실행
	});

	// 이전 달로 이동 함수
	const prevMonth = () => {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
		updateCalendar();
	};

	// 다음 달로 이동 함수
	const nextMonth = () => {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
		updateCalendar();
	};

	let events = []; // 이벤트 배열

	// 날짜 선택 함수
	const selectDate = (date) => {
		selectedDate = date; // 선택한 날짜 업데이트
		const select_date = date;
		const next_date = new Date(select_date);
		next_date.setDate(select_date.getDate() + 1);
		selectedDatePlus = next_date;
		calculateDaysDifference(); // 선택한 날짜와 현재 날짜의 차이 계산
		isModalOpen = true; // 모달 창 열기

		const dateString = selectedDate.toISOString().split('T')[0];
		const selectedEvents = eventsByDate[dateString] || [];

		if (selectedEvents && selectedEvents.length > 0) {
			// 선택한 날짜에 여러 이벤트가 있으면 처리
			// 간단하게 모든 이벤트를 eventDetails 배열에 저장
			eventDetails = [...selectedEvents];
		} else {
			eventDetails = [];
		}

		// 선택한 날짜의 이벤트에 따라 날짜 셀의 스타일 업데이트
		updateDayStyles();
		filterschedule(scheduleList, selectedDate);
	};

	// 날짜 셀의 스타일 업데이트 함수
	const updateDayStyles = () => {
		if (isCalendarInitialized) {
			// 캘린더가 초기화되면 즉시 스타일 업데이트
			const dayCells = document.querySelectorAll('.day');
			dayCells.forEach((dayCell) => {
				//각 날짜 셀에 대해 반복
				const date = new Date(dayCell.getAttribute('data-date'));
				const dateString = date.toISOString().split('T')[0];
				const eventsOnDate = eventsByDate[dateString] || [];

				dayCell.classList.toggle('event', eventsOnDate.length > 0);

				const eventIndicator = dayCell.querySelector('.event-indicator');
				if (eventIndicator) {
					eventIndicator.style.display = eventsOnDate.length > 0 ? 'block' : 'none';

					// If there are multiple events on the same date, adjust the position of the event indicator
					if (eventsOnDate.length > 1) {
						const height = 100 / eventsOnDate.length;
						eventsOnDate.forEach((event, index) => {
							const top = height * index;
							const eventIndicatorClone = eventIndicator.cloneNode(true);
							eventIndicatorClone.style.top = `${top}%`;
							dayCell.appendChild(eventIndicatorClone);
						});
					}
				}
			});
		}
	};

	// 날짜셀의 배경색을 결정하는 함수
	const getEventColor = (day) => {
		const start_date = day;
		const next_date = new Date(start_date);
		next_date.setDate(start_date.getDate() + 1);
	   const filteredschedule = scheduleList.filter(
		  (schedule) => schedule.start_date.slice(0, 10) == next_date.toISOString().slice(0, 10)
	   );

		if (filteredschedule.length == 0) {
			return ''; // 일정이 없으면 기본색
		} else if (filteredschedule.length == 1) {
			return '#b3d7f0'; // 일정이 하나
		} else if (filteredschedule.length >= 2)
			return '#ade0e8' // 일정이 둘 이상
	};
	const closeModal = () => {
		isModalOpen = false;
		selectedDate = new Date();
		calculateDaysDifference();
	};

	// 선택한 날짜의 이벤트 가져오기 함수
	const getEventsForSelectedDate = () => {
		const dateString = selectedDate.toISOString().split('T')[0];
		const eventsOnDate = eventsByDate[dateString] || [];
		return eventsOnDate.map((event) => ({
			date: event.date,
			content: `${event.date.toLocaleDateString()} - ${event.deadline.toLocaleDateString()}\n${
				event.eventName
			}\n${event.location}`
		}));
	};

</script>

<div class="container">
	<div class="calendar-container">
		<div class="month-navigation">
			<button on:click={prevMonth}>&lt;</button>
			<h1>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h1>
			<button on:click={nextMonth}>&gt;</button>
		</div>
		<div class="calendar">
			{#each daysOfWeek as dayOfWeek}
				<div class="day" key={dayOfWeek}>{dayOfWeek}</div>
			{/each}
			{#each daysInMonth as day}
				{#if day === null}
					<div class="day" />
				{:else}
					<div
						class:day
						class:selected={day.getTime() === selectedDate.getTime()}
						class:today={todayDate.toDateString() === day.toDateString()}
						style={`background-color: ${getEventColor(day)}`}
						on:click={() => selectDate(day)}
						data-date={day.toISOString()}
					>
						{day.getDate()}
						{#if getEventsForSelectedDate(day).length > 0}
							<div class="event-indicator" />
						{/if}
					</div>
				{/if}
			{/each}
			{#if showAddSchedule}
				<Component_addSchedule {componentData} on:close={closeAddSchedule} />
			{/if}
			{#if editedSchedule != null }
			<Component_editSchedule {editedSchedule} on:close={closeEditSchedule} />
			{/if}
			<div class="modal {isModalOpen ? 'active' : ''}" on:click={closeModal}>
				<div class="modal-content">
					<p>선택 날짜 {selectedDatePlus.toISOString().slice(0, 10)}</p>
					{#if filteredScheduleList.length > 0}
					{#each filteredScheduleList as schedule (schedule.id)}
					<p>일정 마감일 {schedule.end_date.slice(0,11)}</p>
					<div class="scheduleList-item">
					<p>{schedule.schedule_name}<p>
					<form method="post">
						<button type="button" on:click={() => editSchedule(schedule)}>일정 수정</button>
						<input name="id" type="text" value={schedule.id} hidden />
						<button type="submit" onclick="alert('일정이 삭제되었습니다.')" formaction="?/deleteSchedule">일정 삭제</button>
					</form>
					</div>
					{/each}
				 	{/if}
					<button on:click={addSchedule}>일정 추가</button>
				</div>
			</div>
		</div>
	</div>

	<div class="checklist-container">
		<h2>목표 노트</h2>
		{#each goalList as goal}
			<div class="checklist-item">
				{#if goal.is_complete == true}
					<input type="checkbox" checked disabled />
				{:else}
					<input type="checkbox" disabled />
				{/if}
				<div class="text-container">
					<span>{goal.goal_name}</span>
				</div>
				{#if showEditGoal}
					<Component_editGoal {goal} on:close={closeEditGoal} />
				{/if}
				<div class="button-container">
					<form method="post">
						<button type="button" on:click={editGoal}>수정</button>
						<input name="id" type="text" value={goal.id} hidden />
						<button type="submit" onclick="alert('목표가 삭제되었습니다.')" formaction="?/deleteGoal"
							>삭제</button
						>
					</form>
				</div>
			</div>
		{/each}

		<div class="add-checklist-item">
			<form method="post" action="?/addGoal">
				<input type="text" placeholder="새 목표" name="goal_name" />
				<select name="is_complete" value="false" hidden />
				<button type="submit">추가</button>
			</form>
		</div>
	</div>
</div>

<style>
	.container {
      display: flex;
      background-color: #1f1f27;
      padding: 10px;
      margin-top: -30px;
      border-radius: 8px;
   }
   body {
      font-family: 'Arial', sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
   }
	.calendar-container {
		max-width: 700px;
		width: 100%;
		background-color: #fff;
		box-shadow: 10px 10px 10px 10px rgb(0, 0, 0, 0.5);
		border-radius: 8px;
		overflow: hidden;
		max-height: 800px;
		margin: 20px;
	}

	.month-navigation {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 8px;
		padding: 16px;
		background-color: rgb(73, 73, 111);
		color: white;
	}

	.month-navigation button {
		font-size: 16px;
		cursor: pointer;
		width: 50px;
		margin-bottom: 8px;
		background: none;
		border: none;
		color: white;
	}

	.month-navigation button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.month-navigation h1 {
		color: #ffffff; /* Change the text color to white or your desired color */
		margin-bottom: 0;
	}

	h1 {
		margin-bottom: 0;
	}

	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
		padding: 16px;
		max-height: 800px; /* Increase the max-height */
		overflow-y: auto;
	}

	.day {
		padding: 16px; /* Increase the padding for each day */
		text-align: center;
		cursor: pointer;
		user-select: none;
		height: 60px; /* Increase the height of each day */
		background-color: #fff;
		border-radius: 4px;
		transition: background-color 0.3s ease;
		position: relative;
	}

	.day:hover {
		background-color: #b3baf0;
		color: white;
	}

	.selected {
		background-color: #b3baf0;
		color: white;
		/*border-radius: 50%;*/
	}

	.modal {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		justify-content: center;
		align-items: center;
	}

	.modal.active {
		display: flex;
	}

	.modal-content {
		background: #fff;
		padding: 20px;
		border-radius: 8px;
		width: 300px;
	}

	.today {
		background-color: rgb(73, 73, 111);
		color: white;
		border-radius: 50%;
	}

	.add-event-button {
      display: flex;
      justify-content: center;
      margin-top: 16px;
   }

   .add-event-button button {
      background-color: rgb(107, 107, 161);
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
   }

   .add-event-button button:hover {
      background-color: rgb(73, 73, 111);
   }

   .add-checklist-item input{
      color: f5f5f5;
   }

	.event {
		background-color: var(--event-color, #b3d7f0);
		color: white;
	}

	.calendar-container {
      max-width: 700px;
      width: 100%;
      background-color: #fff;
      box-shadow: 10px 10px 10px 10px rgb(0, 0, 0, 0.5);
      border-radius: 8px;
      overflow: hidden;
      max-height: 800px;
      /*margin: 20px auto 0; /* Center the calendar horizontally and add margin-top */
      margin: 20px;
   }


	.checklist-container h2 {
		/*color: rgb(73, 73, 111);*/
		color: #f5f5f5;
		margin-bottom: 30px;
		text-align: center;
	}

	.checklist-container button{
      background-color: rgb(107, 107, 161);
      border-color: rgb(107, 107, 161);
   }

	.checklist-item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 8px;
		flex-wrap: wrap;
	}

	.checklist-item input {
		margin-right: 8px;
		color: white;
	}

	.checklist-item input:checked {
       background-color: #1f1f27;
    }

	.checklist-item button {
		padding: 0; /* Adjust padding as needed */
		font-size: 14px; /* Adjust font size as needed */
		margin: 0 5px;
		border: 0;
	}

	.text-container {
		word-break: break-all;
		display: flex;
		align-items: center;
		color: #f5f5f5;
		/*flex-wrap: wrap;*/
	}

	.text-container span {
		overflow-wrap: break-word;
		white-space: pre-wrap;
	}

	.button-container {
		display: flex;
		align-items: center;
	}

	.checklist-container {
		width: 300px;
		margin-left: 20px;
		max-height: 700px;
		overflow-y: auto;
		display: block; /* Set the default display value */
		/*background-color: #f5f5f5;*/
		padding: 20px;
		/*box-shadow: 10px 10px 10px 10px rgb(0, 0, 0, 0.5);*/
	}

	.day .event-indicator {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 8px;
		height: 8px;
		background-color: #ff7979; /* 이벤트 색상 */
		border-radius: 50%;
		display: none;
	}

	.day .event-indicator {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 8px;
		height: 8px;
		background-color: #ff7979; /* 이벤트 색상 */
		border-radius: 50%;
		display: none;
	}

	.day.event .event-indicator {
		display: block;
	}

	.day:hover .event-indicator,
	.day.selected .event-indicator {
		display: block;
	}

	.day.event {
		background-color: #b3d7f0;
		color: white;
	}

	.scheduleList-item{
		display: flex;
		align-items: center;
		margin-bottom: 8px;
		flex-wrap: wrap;
	}
	.scheduleList-item button {
		padding: 0; /* Adjust padding as needed */
		font-size: 18px; /* Adjust font size as needed */
		margin: 0 5px;
		border: 0;
	}
</style>
