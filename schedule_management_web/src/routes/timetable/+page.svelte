<script>
  // @ts-nocheck
  export let data;
   const TimeTableList = data.TimeTableList;
   import { onMount } from 'svelte';

  
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
          selectedCell = { hour, day, eventId }; // Store eventId in selectedCell
        }

        timetable.forEach((hours, i) => {
          hours.forEach((cell, j) => {
            timetable[i][j].showOptionsFor = j === day ? showOptionsFor : null;
          });
        });
      }


      function updateTimetable() {
  timetable = Array.from({ length: 24 }, () => Array.from({ length: 7 }, () => ({ event: '', eventColor: '' })));

  eventsList.forEach(event => {
    const dayIndex = ['일', '월', '화', '수', '목', '금', '토'].indexOf(event.day);
    const eventDate = new Date(event.date);

    // Display the existing or modified event in the timetable
    const displayEvent = showOptionsFor ? tempEditingEvent : event;

    // Check if the event date is within the current week's date range
    if (eventDate >= startDate && eventDate <= endDate) {
      const eventDuration = displayEvent.endHour - displayEvent.startHour;

      timetable[displayEvent.startHour][dayIndex].event = displayEvent.eventName;
      timetable[displayEvent.startHour][dayIndex].eventColor = displayEvent.eventColor;

      for (let i = 1; i < eventDuration; i++) {
        timetable[displayEvent.startHour + i][dayIndex].event = '';
        timetable[displayEvent.startHour + i][dayIndex].eventColor = displayEvent.eventColor;
      }
    }
  });
}




    $: {
      updateTimetable();
      resetToStartOfWeek(startDate);
      resetToEndOfWeek(endDate);
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
    date: new Date(startDate), // Set to the current start date by default
    day: selectedDay,
    startHour: selectedStartHour,
    endHour: selectedEndHour,
    eventName: eventName,
    eventColor: lighterColor,
  };


  eventsList.push(newEvent);

  // Store eventId in the timetable
  timetable[selectedStartHour][dayIndex].eventId = newEvent.eventId;

  updateTimetable();

  selectedStartHour = 0;
  selectedEndHour = 0;
  selectedDay = '일';
  eventName = '';

  localStorage.setItem('eventsList', JSON.stringify(eventsList));
}


      //deleteEvent추가됨!! 삭제기능이 없어서 추가했어요
      function deleteEvent(eventId) {
        console.log('Deleting event with ID:', eventId);

        // Find the eventIndex using the timetable
        const eventIndex = eventsList.findIndex(
          (event) => timetable[event.startHour][['일', '월', '화', '수', '목', '금', '토'].indexOf(event.day)].eventId === eventId
        );

        if (eventIndex !== -1) {
          console.log('Event found at index:', eventIndex);
          eventsList.splice(eventIndex, 1);
          console.log('Event removed:', eventsList);
          showOptionsFor = null; // Reset showOptionsFor
          updateTimetable();
        } else {
          console.log('Event not found');
        }
        localStorage.setItem('eventsList', JSON.stringify(eventsList));
      }


    
      $: {
        updateTimetable();
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


      const overlappingEvents = eventsList.filter(event => {
        return (
          event.date.toLocaleDateString() === selectedDate &&
          event.startHour < selectedEndHour &&
          event.endHour > selectedStartHour
        );
      });


      const selectedEventIndex = eventsList.findIndex(
        (event) =>
          event.startHour === selectedStartHour &&
          event.date.toLocaleDateString() === selectedDay &&
          event.endHour > selectedStartHour
      );


  

      function previousWeek() {
  console.log("Previous week button clicked");
  $: {
    startDate = new Date(startDate.getTime());
    startDate.setDate(startDate.getDate() - 7);
    resetToStartOfWeek(startDate);

    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    resetToEndOfWeek(endDate);

    // Update the timetable with the new date range
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

    // Update the timetable with the new date range
    updateTimetable();
  }
}


    //여기부터 추가!! 추가된 일정 저장
    function loadEventsFromStorage() {
      const storedEvents = localStorage.getItem('eventsList');
      if (storedEvents) {
        eventsList = JSON.parse(storedEvents);
        updateTimetable();
      }
    }


    onMount(() => {
      loadEventsFromStorage();
    });


    //loadEventsFromStorage();
    //여기까지


    
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
          <h2 class="combo" style="color: white;">
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
                              <div style="position: absolute; top: 100%; left: 0; width: 100%; display: {showOptionsFor === eventId ? 'block' : 'none'}; z-index: 1;" class="options-buttons">
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
          background-color: rgb(107, 107, 161);
          border-color: rgb(107, 107, 161);
      }
      .btn2{
          width:15%;
          background-color: rgb(107, 107, 161);
          border-color: rgb(107, 107, 161);
      }


       /* Add the following styles for the event form */
  .event-form-container label {
    padding: 8px;
    margin-bottom: 8px;
    color: black;
  }

  .event-form-container input,
  .event-form-container select {
    background-color: white;
    padding: 8px;
    margin-bottom: 16px;
  }

  .event-form-container button {
    background-color: rgb(107, 107, 161); /* Set the background color for the button */
    color: white;
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
      </style>