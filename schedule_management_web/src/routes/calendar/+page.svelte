<script>
  import { onMount } from 'svelte';

  let currentDate = new Date();
  let selectedDate = new Date();
  let isModalOpen = false;

  let daysInMonth = [];
  let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  onMount(() => {
    updateCalendar();
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
    isModalOpen = true;
  };

  const closeModal = () => {
    isModalOpen = false;
  };
</script>

<style>
  .calendar-container {
    max-width: 400px;
    margin: 0 auto;
  }

  .month-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    flex-wrap: wrap; /* Allow the buttons to wrap to the next line if necessary */
  }

  .month-navigation button {
    font-size: 16px;
    cursor: pointer;
    width: 50px;
    margin-bottom: 8px; /* Add margin to separate buttons from the month text */
  }

  h1 {
    margin-bottom: 0;
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }

  .day {
    padding: 8px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }

  .day:hover {
    background-color: #eee;
  }

  .selected {
    background-color: #3498db;
    color: white;
    border-radius: 50%;
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

</style>

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
          on:click={() => selectDate(day)}
        >
          {day.getDate()}
        </div>
      {/if}
    {/each}
  </div>
  <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
  <div class="modal {isModalOpen ? 'active' : ''}" on:click={closeModal}>
    <div class="modal-content" on:click={(e) => e.stopPropagation()}>
      <p>Modal content goes here</p>
      <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
    </div>
  </div>
</div>