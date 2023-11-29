<script>
  // @ts-nocheck
  export let data;
   const TimeTableList = data.TimeTableList;
  
      let timetable = Array.from({ length: 24 }, () => Array.from({ length: 7 }, () => ({ event: '', eventColor: '' })));
      let eventsList = [];
      let selectedStartHour = 0;
      let selectedEndHour = 0;
      let selectedDay = '일';
      let eventName = '';
      let showOptionsFor = null;
    
      let currentDate = new Date();
      let startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Set to previous Sunday
      startDate.setHours(0, 0, 0, 0);
    
      let endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // Set to current Saturday
      endDate.setHours(23, 59, 59, 999);
    
      let selectedCell = { hour: null, day: null };
  
      let tempEditingEvent = null;
      let editingEvent = null;
  
  
    
      function showOptions(hour, day, eventId) {
      if (showOptionsFor === eventId) {
        showOptionsFor = null;
      } else {
        showOptionsFor = eventId;
        selectedCell = { hour, day };
      }
    
      timetable.forEach((hours, i) => {
        hours.forEach((cell, j) => {
          timetable[i][j].showOptionsFor = j === day ? showOptionsFor : null;
        });
      });
    }
    
    
      function addEvent() {
        if (selectedEndHour <= selectedStartHour) {
          alert('종료 시간은 시작 시간보다 늦어야 합니다.');
          return;
        }
    
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const lighterColor = hexToRGBA(randomColor, 0.5);
    
        const dayIndex = ['일', '월', '화', '수', '목', '금', '토'].indexOf(selectedDay);
    
        const overlappingEvents = eventsList.filter(event => {
          return (
            event.day === selectedDay &&
            event.startHour < selectedEndHour &&
            event.endHour > selectedStartHour
          );
        });
    
        if (overlappingEvents.length > 0) {
          alert('이미 일정이 있는 시간대입니다.');
          return;
        }
    
        const newEvent = {
          eventId: eventsList.length + 1,
          day: selectedDay,
          startHour: selectedStartHour,
          endHour: selectedEndHour,
          eventName: eventName,
          eventColor: lighterColor,
        };
    
        eventsList.push(newEvent);
        updateTimetable();
    
        selectedStartHour = 0;
        selectedEndHour = 0;
        selectedDay = '일';
        eventName = '';
      }
    
      function updateTimetable() {
    timetable = Array.from({ length: 24 }, () => Array.from({ length: 7 }, () => ({ event: '', eventColor: '' })));
  
    eventsList.forEach(event => {
      const dayIndex = ['일', '월', '화', '수', '목', '금', '토'].indexOf(event.day);
      const eventDuration = event.endHour - event.startHour;
  
      // Display the existing or modified event in the timetable
      const displayEvent = showOptionsFor ? tempEditingEvent : event;
  
      timetable[displayEvent.startHour][dayIndex].event = displayEvent.eventName;
      timetable[displayEvent.startHour][dayIndex].eventColor = displayEvent.eventColor;
  
      for (let i = 1; i < eventDuration; i++) {
        timetable[displayEvent.startHour + i][dayIndex].event = '';
        timetable[displayEvent.startHour + i][dayIndex].eventColor = displayEvent.eventColor;
      }
    });
  }
  
    
      function hexToRGBA(hex, opacity) {
        hex = hex.replace(/^#/, '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
    
        return `rgba(${r},${g},${b},${opacity})`;
      }
    
      function editEvent(hour, day) {
    const selectedEventIndex = eventsList.findIndex(
      (event) =>
        event.startHour === hour &&
        event.day === selectedDay &&
        event.endHour > hour
    );
  
    if (selectedEventIndex !== -1) {
      const selectedEvent = eventsList[selectedEventIndex];
  
      // Create a temporary copy of the existing event
      const tempEvent = { ...selectedEvent };
  
      // Set the form fields with the values of the existing event
      selectedStartHour = tempEvent.startHour;
      selectedEndHour = tempEvent.endHour;
      selectedDay = tempEvent.day;
      eventName = tempEvent.eventName;
  
      // Remove the selected event from the eventsList array
      eventsList.splice(selectedEventIndex, 1);
  
      // Update the timetable with the temporary event
      updateTimetable();
  
      // Optionally, you can keep the temporary event in a variable for later use
      // tempEditingEvent = tempEvent;
    }
  }
  
  
  
    
    
    $: {
      updateTimetable();
      // Include startDate and endDate in the reactive statement
      resetToStartOfWeek(startDate);
      resetToEndOfWeek(endDate);
    }
    
    function previousWeek() {
      console.log("Previous week button clicked");
      $: {
        startDate = new Date(startDate.getTime());
        startDate.setDate(startDate.getDate() - 7);
        resetToStartOfWeek(startDate);
    
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        resetToEndOfWeek(endDate);
    
        updateTimetable();
      }
    }
    
    function nextWeek() {
      console.log("Next week button clicked");
      $: {
        startDate = new Date(startDate.getTime());
        startDate.setDate(startDate.getDate() + 7);
        resetToStartOfWeek(startDate);
    
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        resetToEndOfWeek(endDate);
    
        updateTimetable();
      }
    }
    
    
    
    
    function resetToStartOfWeek(date) {
      date.setDate(date.getDate() - date.getDay());
      date.setHours(0, 0, 0, 0);
    }
    
    function resetToEndOfWeek(date) {
      date.setDate(date.getDate() - date.getDay() + 6);
      date.setHours(23, 59, 59, 999);
    }
    
    
    
    
  </script>
    
  
    
  <div>
      <div>
          <h2 class="combo">
          <button class="btn1" on:click={previousWeek}>&lt;</button>
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          <button class= "btn2" on:click={nextWeek}>&gt;</button>
          </h2>    
      </div>
  
  
  
      <div class="container">
          <div class="timetable-container">
              <table>
              <thead>
                  <tr>
                  <th></th>
                  {#each ['일', '월', '화', '수', '목', '금', '토'] as day}
                      <th>{day}</th>
                  {/each}
                  </tr>
              </thead>
  
              <tbody>
                  {#each timetable as hour, i}
                  <tr>
                      <td>{i}:00</td>
                      {#each timetable[i] as { event, eventColor, eventId }, j}
                      <td style="background-color: {eventColor}" on:click={() => showOptions(i, j, eventId)}>
                          {#if event !== ''}
                          <div style="position: relative;">
                              {event}
                              <div style="position: absolute; top: 100%; left: 0; width: 100%; display: {showOptionsFor === eventId ? 'block' : 'none'};" class="options-buttons">
                              {#if selectedCell.hour === i && selectedCell.day === j}
                                  <button on:click={() => editEvent(i, j)}>수정</button>
                                  <button on:click={() => deleteEvent(eventId)}>삭제</button>
                              {/if}
                              </div>                    
                          </div>
                          {/if}
                      </td>
                      {:else}
                      <td style="background-color: {eventColor}"></td>
                      {/each}
                  </tr>
                  {/each}
              </tbody>
              </table>
          </div>
  
          <div class="event-form-container">
              <div>
              <label for="selectedDay">요일:</label>
              <select bind:value={selectedDay}>
                  {#each ['일', '월', '화', '수', '목', '금', '토'] as day}
                  <option value={day}>{day}</option>
                  {/each}
              </select>
              </div>
  
              <div>
              <label for="selectedStartHour">시작 시간:</label>
              <select bind:value={selectedStartHour}>
                  {#each Array.from({ length: 24 }) as _, i}
                  <option value={i}>{i}:00</option>
                  {/each}
              </select>
              </div>
  
              <div>
              <label for="selectedEndHour">종료 시간:</label>
              <select bind:value={selectedEndHour}>
                  {#each Array.from({ length: 24 }) as _, i}
                  <option value={i}>{i}:00</option>
                  {/each}
              </select>
              </div>
  
              <div>
              <label for="eventName">일정 이름:</label>
              <input type="text" bind:value={eventName} />
              </div>
  
              <button on:click={addEvent}>
              일정 추가
              </button>
          </div>
      </div>  
  </div>
  
  <style>
      .container {
          display: flex;
          justify-content: space-between;
      }
      
      .timetable-container {
          width: 60%;
      }
      
      .event-form-container {
          width: 35%;
          display: flex;
          flex-direction: column;
      }
      
      table {
          height: 100%;
          border-collapse: collapse;
          margin-top: 20px;
      }
      
      th,
      td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
      }
      
      th {
          background-color: #f2f2f2;
      }
      
      .options-buttons button {
          font-size: 12px;
          padding: 4px 8px;
      }
      
      .combo{
          display:flex;
          justify-content:space-between;
      }
      .btn1{
          width:15%;
      }
      .btn2{
          width:15%;
      }
      </style>