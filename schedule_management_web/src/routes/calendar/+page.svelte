<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import AddSchedule from '$lib/component/AddCalendar.svelte';

  let currentDate = new Date();
  let todayDate = new Date();
  let selectedDate = new Date();
  let isModalOpen = false;
  let daysInMonth = [];
  let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let daysDifference = 0;

  let isAddingEvent = false;
  let isChecklistVisible = false;
  let selectedColor = '#ff7979'; // Default color: Light Pink

  let startDate = '';
  let endDate = '';
  let scheduleName = '';
  let location = '';
  let repeat = false;
  let editModeData = null;

  let newChecklistItemText = '';

  let yourScheduleArray = [];

  function getBackgroundColor(day) {
  // Check if the current day is the selected date
  const isSelectedDate = day.getTime() === selectedDate.getTime();

  // If adding an event and the current day is in the selected date range, use the selectedColor
  if (isAddingEvent && isDateInRange(day, startDate, endDate)) {
    return selectedColor;
  }

  // Check if the current day is in the range of any events
  const isEventDay = yourScheduleArray.some(schedule =>
    isDateInRange(day, schedule.startDate, schedule.endDate)
  );

  // Highlight dates with added schedules
  const hasSchedule = yourScheduleArray.some(schedule =>
    day.toDateString() === new Date(schedule.startDate).toDateString()
  );

  // Set a different color for days with schedules
  return isSelectedDate ? selectedColor : (hasSchedule ? '#8bc34a' : isEventDay ? selectedColor : '');
}


function saveSchedule() {
  const newSchedule = {
    startDate: startDate,
    endDate: endDate,
    scheduleName: scheduleName,
    location: location,
    bgColor: selectedColor,
    repeat: repeat,
  };

  yourScheduleArray.push(newSchedule);
  dispatch('save', newSchedule);
  resetForm();
  closeModal();
  isAddingEvent = false;

  // Update selectedDate to trigger reactivity in Svelte
  selectedDate = new Date(selectedDate.getTime());

  // Update days in the month to reflect the color change
  updateCalendar();
}




  const dispatch = createEventDispatcher();

  $: formattedStartDate = selectedDate.toISOString().split('T')[0];

  const addEvent = () => {
    // Set both startDate and endDate to the selectedDate
    startDate = selectedDate.toISOString().split('T')[0];
    endDate = selectedDate.toISOString().split('T')[0];

    // Update formattedStartDate after setting startDate and endDate
    formattedStartDate = startDate;

    dispatch('selectDate', startDate);

    // Now, you can set isAddingEvent to true
    isAddingEvent = true;
  };


  const cancelAddEvent = () => {
    isAddingEvent = false;
    closeModal();
  };

  const updateCalendar = () => {
    daysInMonth = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      daysInMonth.push(null);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
  };

  const calculateDaysDifference = () => {
    const timeDifference = selectedDate.getTime() - currentDate.getTime();
    daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  };

  onMount(() => {
    updateCalendar();
    todayDate = new Date();
  });

  const prevMonth = () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    updateCalendar();
  };

  const nextMonth = () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    updateCalendar();
  };

  const selectDate = (date) => {
    selectedDate = date;
    formattedStartDate = selectedDate.toISOString().split('T')[0];
    calculateDaysDifference();
    isModalOpen = true;
    isAddingEvent = false;

    // Find the schedule for the selected date
    editModeData = findScheduleForDate(selectedDate);

    // Set the selected color to the color of the current schedule or the default color
    selectedColor = editModeData ? editModeData.bgColor : '#ff7979';
  };

  function findScheduleForDate(date) {
    const scheduleForDate = yourScheduleArray.find(schedule => schedule.startDate === date.toISOString().split('T')[0]);
    return scheduleForDate;
  }

  const closeModal = () => {
    isModalOpen = false;
    selectedDate = new Date();
    calculateDaysDifference();
    editModeData = null;
  };

  function resetForm() {
    startDate = '';
    endDate = '';
    scheduleName = '';
    location = '';
    repeat = false;
  }

  let checklistItems = [];

  const toggleChecklistItem = (id) => {
    checklistItems = checklistItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
  };

  const addChecklistItem = () => {
    if (newChecklistItemText.trim() !== '') {
      const newItem = { id: checklistItems.length + 1, text: newChecklistItemText, completed: false };
      checklistItems = [...checklistItems, newItem];
      newChecklistItemText = '';
    }
  };

  const removeChecklistItem = (id) => {
    checklistItems = checklistItems.filter(item => item.id !== id);
  };

  const toggleChecklistVisibility = () => {
    isChecklistVisible = !isChecklistVisible;
  };

  function isDateInRange(date, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    return date >= start && date < end;
  }

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

  .container {
    display: flex;
    justify-content: space-between;
  }

  .checklist-container {
    width: 300px; /* Adjust the width as needed */
    margin-left: 20px;
  }

  .checklist-container h2 {
    color: #3498db;
    margin-bottom: 8px;
    text-align: center;
  }

  .checklist-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .checklist-item input {
    margin-right: 8px;
  }

  .remove-button {
    padding: 4px 8px; /* Adjust padding as needed */
    font-size: 12px; /* Adjust font size as needed */
  }
  .checklist-item button {
    padding: 4px 8px; /* Adjust padding as needed */
    font-size: 12px; /* Adjust font size as needed */
    width: 70px; /* Set a fixed width for the Remove buttons */
    margin: 0 0 0 auto;

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
      style={`background-color: ${getBackgroundColor(day)}`}
      on:click={() => selectDate(day)}>
      {day.getDate()}

      <!-- Display schedules for the current day -->
      {#each yourScheduleArray as schedule}
        {#if isDateInRange(day, schedule.startDate, schedule.endDate)}
          <div>
            <p>{schedule.scheduleName}</p>
            <!-- Add more schedule details as needed -->
          </div>
        {/if}
      {/each}
    </div>
  {/if}
{/each}
  </div>
  
  <div class="modal {isModalOpen ? 'active' : ''}" on:click={closeModal}>
    <div class="modal-content" on:click={(e) => e.stopPropagation()}>
      <!-- Inside the modal-content div -->
      {#if isAddingEvent}
      <AddSchedule
        bind:startDate={formattedStartDate}
        bind:endDate={endDate}
        bind:scheduleName={scheduleName}
        bind:location={location}
        bind:bgColor={selectedColor} 
        bind:repeat={repeat}
        on:save={saveSchedule}
        on:close={cancelAddEvent}
        selectedDate={formattedStartDate}
      />
      <!-- Move the "Add" button inside the AddSchedule component -->
      <div class="add-event-button">
        <button on:click={saveSchedule}>Add</button>
      </div>
{:else}
{#if editModeData}
  <!-- Display schedule content for the selected date -->
  <p>Schedule Name: {editModeData.scheduleName}</p>
  <p>Location: {editModeData.location}</p>
  <!-- Add more fields as needed -->

  <!-- Display checklist if visible -->
  {#if isChecklistVisible}
    <h3>Checklist</h3>
    <div class="checklist">
      <!-- Add checklist items here -->
    </div>
  {/if}

  <!-- Keep the "Add" button below the schedule content -->
  <div class="add-event-button">
    <button on:click={addEvent}>Add</button>
  </div>
{:else}
  <!-- Default modal content -->
  <p>Modal content goes here</p>
  <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
  <div class="add-event-button">
    <button on:click={addEvent}>Add</button>
  </div>
{/if}
{/if}

    </div>
  </div>
  </div>

<!-- Add the checklist container outside the calendar-container div -->
<div class="checklist-container">
  <h2>Checklist</h2>
  {#each checklistItems as item (item.id)}
    <div class="checklist-item">
      <input type="checkbox" bind:checked={item.completed} />
      <span>{item.text}</span>
      <button on:click={() => removeChecklistItem(item.id)}>Remove</button>
    </div>
  {/each}

  <!-- Add the input field and button for adding a new checklist item -->
  <div class="add-checklist-item">
    <input
      type="text"
      placeholder="New List"
      bind:value={newChecklistItemText}
    />
    <!-- Add the button to call the addChecklistItem function -->
    <button on:click={addChecklistItem}>Add</button>
  </div>
</div>
</div>