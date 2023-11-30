<script>
    import { onMount } from 'svelte';
    import Component_editGoal from '$lib/component/editGoal.svelte';

    let currentDate = new Date(); // 현재 날짜
    let todayDate = new Date(); // 오늘 날짜
    let selectedDate = new Date(); // 선택한 날짜
    let isModalOpen = false; // 모달 창 열림 여부
    let daysInMonth = []; // 월의 날짜 배열
    let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // 요일 배열
    let daysDifference = 0; // 선택 날짜와 현재 날짜의 차이
  
    let isAddingEvent = false; // 이벤트 추가 중 여부
    let isSelectingDeadline = false; // 마감일 선택 중 여부
    let eventDetails = {
      deadline: "",
      eventName: "",
      location: "",
      color: "",
      isRepeating: false,
    };
  
    let checklistItems = []; // 체크리스트 아이템 배열
    let newChecklistItemText = '';
    let isChecklistVisible = true; // 체크리스트 표시 여부
    let eventsByDate = {}; // 날짜별 이벤트 저장 객체
    let isCalendarInitialized = false; // 캘린더 초기화 여부

    export let data;
    const goalList = data.goalList;

    let showEditGoal = false;

    function editGoal() {
		showEditGoal = true;
	}
	function closeEditGoal() {
		showEditGoal = false;
	}

  
  
    // 이벤트 추가 함수
    const addEvent = () => {
      isAddingEvent = true;
    };
  
    // 이벤트 저장 함수
    const saveEvent = () => {
    const daysInRange = getDaysInRange(selectedDate, new Date(eventDetails.deadline));
  
    daysInRange.forEach((dayInRange) => {
      const dateString = dayInRange.toISOString().split('T')[0];
  
      if (!eventsByDate[dateString]) {
        eventsByDate[dateString] = [];
      }
  
      // Find the existing event on this date
      const existingEventIndex = eventsByDate[dateString].findIndex((event) => event.eventName === eventDetails.eventName);
  
      if (existingEventIndex !== -1) {
        // Update the existing event
        eventsByDate[dateString][existingEventIndex] = { ...eventDetails, date: dayInRange };
      } else {
        // Add a new event
        eventsByDate[dateString].push({ ...eventDetails, date: dayInRange });
      }
    });
  
    // Reset eventDetails
    eventDetails = {
      deadline: "",
      eventName: "",
      location: "",
      color: "",
      isRepeating: false,
    };
  
    isAddingEvent = false;
    closeModal();
  
    // Update day styles after saving the event
    updateDayStyles();
  };
  
  
  
  
    // 이벤트 추가 취소 함수
    const cancelAddEvent = () => {
      isAddingEvent = false;
    };
  
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
    };
  
    // 날짜 셀의 스타일 업데이트 함수
    const updateDayStyles = () => {
      if (isCalendarInitialized) {
        // 캘린더가 초기화되면 즉시 스타일 업데이트
        const dayCells = document.querySelectorAll('.day');
      dayCells.forEach((dayCell) => { //각 날짜 셀에 대해 반복
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
  
  
  
    // 수정된 부분: 날짜셀의 배경색을 결정하는 함수
    const getEventColor = (day) => {
    const eventsInRange = events.filter((event) => {
      const eventStartDate = new Date(event.date);
      const eventEndDate = new Date(event.deadline);
  
      return (
        day.getTime() >= eventStartDate.getTime() &&
        day.getTime() <= eventEndDate.getTime()
      );
    });
  
    if (eventsInRange.length === 0) {
      return ""; // No events for this day
    } else if (eventsInRange.length === 1) {
      return eventsInRange[0].color; // Only one event, return its color
    } else {
      return "#b3d7f0"; // Set a specific color for cells with multiple events
    }
  };
  
  
  // 날짜 범위 내의 모든 날짜 반환 함수
    function getDaysInRange(startDate, endDate) {
      const days = [];
      const currentDate = new Date(startDate);
  
      while (currentDate <= endDate) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      return days;
    }
  
    const closeModal = () => {
      isModalOpen = false;
      selectedDate = new Date();
      calculateDaysDifference();
    };
  
    const openDeadlineSelector = () => {
      isSelectingDeadline = true;
    };
  
  // 마감일 선택 함수
    const selectDeadline = (selectedDate) => {
      eventDetails.deadline = selectedDate.toLocaleDateString();
      isSelectingDeadline = false;
    };
  
    const cancelDeadlineSelection = () => {
      isSelectingDeadline = false;
    };
  
    
  // 선택한 날짜의 이벤트 가져오기 함수
    const getEventsForSelectedDate = () => {
      const dateString = selectedDate.toISOString().split('T')[0];
      const eventsOnDate = eventsByDate[dateString] || [];
      return eventsOnDate.map(event => ({
        date: event.date,
        content: `${event.date.toLocaleDateString()} - ${event.deadline.toLocaleDateString()}\n${event.eventName}\n${event.location}`
      }));
    };
  
    const modifyEvent = (event) => {
    // Remove the existing event from eventsByDate
    const dateString = event.date.toISOString().split('T')[0];
    const eventsOnDate = eventsByDate[dateString] || [];
    const existingEventIndex = eventsOnDate.findIndex((e) => e.eventName === event.eventName);
  
    if (existingEventIndex !== -1) {
      eventsOnDate.splice(existingEventIndex, 1);
    }
  
    // Set the event details for modification
    eventDetails = { ...event };
    isAddingEvent = true; // Open the modal for modification
  };
  
  
  // Modify the deleteEvent function
  const deleteEvent = (event) => {
    // Loop through all dates in eventsByDate
    Object.keys(eventsByDate).forEach((dateString) => {
      const eventsOnDate = eventsByDate[dateString];
      
      // Find the index of the event in the eventsOnDate array
      const eventIndex = eventsOnDate.findIndex((e) => e.eventName === event.eventName);
  
      if (eventIndex !== -1) {
        // Remove the event if it exists on this date
        eventsOnDate.splice(eventIndex, 1);
      }
    });
  
    // Update day styles after deletion
    updateDayStyles();
  
    // Close the modal after deletion
    closeModal();
  };
  
  
  // 체크리스트 아이템 편집 토글 함수
    const toggleEditChecklistItem = (id) => {
      checklistItems = checklistItems.map(item =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      );
    };
  
  // 체크리스트 아이템 추가 함수
    const addChecklistItem = () => {
      if (newChecklistItemText.trim() !== '') {
        const newItem = { id: checklistItems.length + 1, text: newChecklistItemText, completed: false };
        checklistItems = [...checklistItems, newItem];
        newChecklistItemText = '';
      }
    };
  
    // 체크리스트 아이템 삭제 함수
    const removeChecklistItem = (id) => {
      checklistItems = checklistItems.filter(item => item.id !== id);
    };
  
    // 체크리스트 표시 여부 토글 함수
    const toggleChecklistVisibility = () => {
      isChecklistVisible = !isChecklistVisible;
    };
  
  
  
  </script>
  
  <style>
  
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
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
      max-height: 800px;
      margin: 20px auto 0; /* Center the calendar horizontally and add margin-top */
    }
  
    .month-navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      padding: 16px;
      background-color: #3498db;
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
      background-color: #b3d7f0;
      color: white;
    }
  
    .selected {
      background-color: #b3d7f0;
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
      background-color: #3498db;
      color: white;
      border-radius: 50%;
    }
  
    .add-event-button {
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }
  
    .add-event-button button {
      background-color: #3498db;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .add-event-button button:hover {
      background-color: #297fb8;
    }
  
    .event {
      background-color: var(--event-color, #b3d7f0);
      color: white;
    }
  
    .checklist-container {
      width: 300px; /* Adjust the width as needed */
      margin-left: 20px;
      max-height: 700px;
      overflow-y: auto;
    }
  
    .checklist-container h2 {
      color: #3498db;
      margin-bottom: 8px;
      text-align: center;
    }
  
    .checklist-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
  
    .checklist-item input {
      margin-right: 8px;
    }
  
    .checklist-item button {
      padding: 0; /* Adjust padding as needed */
      font-size: 12px; /* Adjust font size as needed */
      margin: 0 4px;
      border: 0;
    }
  
    .checklist-item button.edit-button {
      width: 50px;
    }
  
    .text-container {
      word-break: break-all;
      display: flex;
      align-items: center;
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
  
    .container {
      display: flex;
    }
  
    .checklist-container {
      width: 300px;
      margin-left: 20px;
      max-height: 700px;
      overflow-y: auto;
      display: block; /* Set the default display value */
    }
  
    .checklist-container-hidden {
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
  
  .day.multiple-events {
      background-color: rgba(255, 255, 255, 0.5); /* Adjust as needed */
    }
  
    .day.multiple-events:hover {
      background-color: rgba(255, 255, 255, 0.7); /* Adjust as needed */
      color: black; /* Adjust text color as needed */
    }
  
  
    .event-details-container {
    max-height: 200px; /* Set the maximum height for the event details container */
    overflow-y: auto; /* Enable vertical scrolling when content exceeds the height */
  }
  
  </style>

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
              class:event={getEventsForSelectedDate(day).length > 0}
              style={`background-color: ${getEventColor(day)}`}
              on:click={() => selectDate(day)}
              data-date={day.toISOString()}>
              {day.getDate()}
              {#if getEventsForSelectedDate(day).length > 0}
                <div class="event-indicator"></div>
              {/if}
            </div>
          {/if}
        {/each}
  
      </div>
  
      <div class="modal {isModalOpen ? 'active' : ''}" on:click={closeModal}>
        <div class="modal-content" on:click={(e) => e.stopPropagation()}>
          <!-- Inside the modal-content div -->
          {#if isAddingEvent}
          <!-- Content for adding an event -->
          <p>Adding Event from {selectedDate.toLocaleDateString()} to {eventDetails.deadline}</p>
  
          <label for="deadline">Deadline:</label>
          {#if isSelectingDeadline}
            <!-- Display date selector -->
            <div>
              <input type="date" bind:value={eventDetails.deadline} />
              <button on:click={() => selectDeadline(new Date(eventDetails.deadline))}>Select</button>
              <button on:click={cancelDeadlineSelection}>Cancel</button>
            </div>
          {:else}
            <!-- Display selected deadline -->
            <div>
              <span>{eventDetails.deadline}</span>
              <button on:click={openDeadlineSelector}>Change</button>
            </div>
          {/if}
  
          <label for="eventName">Event Name:</label>
          <input type="text" bind:value={eventDetails.eventName} />
  
          <label for="location">Location:</label>
          <input type="text" bind:value={eventDetails.location} />
  
          <div class="add-event-button">
            <button on:click={saveEvent}>Save</button>
            <button on:click={cancelAddEvent}>Cancel</button>
          </div>
          {:else}
          <!-- Default modal content -->
          <p>Modal content goes here</p>
          {#if eventDetails.length > 0}
          <div class="event-details-container">
            <p>{selectedDate.toLocaleDateString()}</p>
            {#each eventDetails as event (event.eventName)}
              <p>{selectedDate.toLocaleDateString()} - {event.deadline}</p>
              <p>Event Name: {event.eventName}</p>
              <p>Location: {event.location}</p>
              <!-- Add buttons for modifying and deleting events -->
              <div class="button-container">
                <button on:click={() => modifyEvent(event)}>Modify</button>
                <button on:click={() => deleteEvent(event)}>Delete</button>
              </div>
            {/each}
          </div>
          
          {/if}
  
          <div class="add-event-button">
            <button on:click={addEvent}>Add</button>
          </div>
          {/if}
  
        </div>
      </div>
    </div>
  
    <div class="checklist-container">
      <h2>목표 노트</h2>
      {#each goalList as goal}
        <div class="checklist-item">
          {#if goal.is_complete==true}
          <input type="checkbox" checked disabled/>
          {:else}
          <input type="checkbox" disabled/>
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
            <input name="id" type="text" value={goal.id} hidden>
            <button type="submit" onclick="alert('삭제되었습니다.')" formaction="?/deleteGoal">삭제</button>
          </form>
          </div>
        </div>
      {/each}
  
      <div class="add-checklist-item">
        <form method="post" action="?/addGoal">
        <input type="text" placeholder="새 목표" name="goal_name" />
        <select name="is_complete" value="false" hidden></select>
        <button type="submit">추가</button>
      </form>
      </div>
    </div>
  </div>

 