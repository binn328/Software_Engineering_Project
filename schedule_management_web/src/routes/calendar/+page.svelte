<script>
    import { onMount } from 'svelte';
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentDate = new Date().getDate();
    let daysMarkup = [];
    let todayBtnDisplay = 'none';
  
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    function renderCalendar() {
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
      const totalDays = 35;
      const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  
      let newDays = [];
  
      // Fill in previous month's days
      for (let i = firstDay - 1; i >= 0; i--) {
        newDays.push({ value: prevMonthLastDay - i, class: 'prev' });
      }
  
      // Fill in current month's days
      for (let i = 1; i <= lastDay; i++) {
        newDays.push({
          value: i,
          class:
            i === currentDate &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
              ? 'today'
              : '',
        });
      }
  
      // Fill in next month's days if needed
      const remainingDays = totalDays - newDays.length;
      for (let i = 1; i <= remainingDays; i++) {
        newDays.push({ value: i, class: 'next' });
      }
  
      return newDays;
    }
  
    function updateCalendar() {
    daysMarkup = renderCalendar();
    todayBtnDisplay = hideTodayBtn();
  }
  
  function nextMonth() {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) currentYear++;
    updateCalendar();
  }
  
  function previousMonth() {
    currentMonth = (currentMonth + 11) % 12;
    if (currentMonth === 11) currentYear--;
    updateCalendar();
  }
  
  function goToToday() {
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    updateCalendar();
  }
  
  
    function hideTodayBtn() {
      return (
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
      ) ? 'none' : 'flex';
    }
  
    $: daysMarkup = renderCalendar();
    $: todayBtnDisplay = hideTodayBtn();
  
    onMount(() => {
      updateCalendar();
    });
  </script>
  
  
  <style>
    @import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
  :root {
    --primary-color: #f90a39;
    --text-color: #1d1d1d;
    --bg-color: #f1f1fb;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  body {
    background: #ffffff;
  }
  .container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left{
    width: 60%;
    padding: 20px;
  }
  .calendar {
    width: 100%;
    max-width: 600px;
    background: var(--bg-color);
    padding: 30px 20px;
    border-radius: 10px;
  }
  .calendar .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
  }
  .calendar .header .month {
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    color: var(--text-color);
  }
  .calendar .header .btns {
    display: flex;
    gap: 10px;
  }
  .calendar .header .btns .btn {
    width: 50px;
    height: 40px;
    background: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .calendar .header .btns .btn:hover {
    background: #db0933;
    transform: scale(1.05);
  }
  .calendar .weekdays {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  .calendar .weekdays .day {
    width: calc(100% / 7 - 10px);
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  .calendar .days {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .calendar .days .day {
    width: calc(100% / 7 - 10px);
    height: 50px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-color);
    transition: all 0.3s;
    user-select: none;
  }
  .calendar .days .day:not(.next):not(.prev):hover {
    color: #fff;
    background: var(--primary-color);
    transform: scale(1.05);
  }
  .calendar .days .day.next,
  .calendar .days .day.prev {
    color: #ccc;
  }
  .calendar .days .day.today {
    color: #fff;
    background: var(--primary-color);
  }
  .credits a {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #aaa;
  }
  .credits span {
    color: var(--primary-color);
  }
  .container.right{
    position: relative;
    width: 40%;
    min-height: 100%;
    padding: 20px 0;
  }
  .right.today-date{
    width: 100%;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    padding-left: 70px;
    margin-top: 50px;
    margin-bottom: 20px;
    text-transform: capitalize;
  }
  </style>
  
  <div class="container">
    <!-- Left side with the calendar -->
    <div class="left">
      <div class="calendar">
        <!-- Header -->
        <div class="header">
          <div class="month">{months[currentMonth]} {currentYear}</div>
          <div class="btns">
            <button on:click={previousMonth}>Previous</button>
            <button on:click={goToToday} style="display: {todayBtnDisplay}">Today</button>
            <button on:click={nextMonth}>Next</button>
          </div>
        </div>
  
        <!-- Weekdays -->
        <div class="weekdays">
          {#each days as day, i}
            <div class="day">{day}</div>
          {/each}
        </div>
  
        <!-- Days -->
        <div class="days">
          {#each daysMarkup as day, i}
            <div class="day" class:day.class style="order: {i}">
              {day.value}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>