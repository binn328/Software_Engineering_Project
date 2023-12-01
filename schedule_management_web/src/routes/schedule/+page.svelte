<script>
   import Component_addSchedule from '$lib/component/addSchedule_ver2.svelte';
   import Component_editSchedule from '$lib/component/editSchedule_ver2.svelte';

   export let data;
   const scheduleList = data.scheduleList;

   const sortedScheduleList = scheduleList.sort((a, b) => {
      const dateComparison = new Date(a.start_date) - new Date(b.start_date);

      // If start dates are equal, sort by importance level in ascending order
      if (dateComparison === 0) {
      return a.importance_level - b.importance_level;
      }

      return dateComparison;
   });


   // New variables to track the edited schedule
   let showAddSchedule = false;
   let editedSchedule = null;

   function addSchedule() {
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

   /** 중요도를 보고 배경 색을 반환한다.
    * @param {number} importance_level
    */
    function getBgColor(importance_level) {
      if (importance_level == 1) {
        return '#5e5e91';
      } else if (importance_level == 2) {
        return '#9292b9';
      } else if (importance_level == 3) {
        return '#c1c1d6';
      } else {
        return 'gray';
      }
   }
 
 
   /**
    * @param {string} datetime
    */
   function convert_date(datetime) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short' };
      return new Date(datetime).toLocaleDateString('ko-KR', options);
   }


</script>


<!--<div class="background-box"></div>
<div class="background-upbox"></div>-->

<div class="container">
    <div class="add-schedule" on:click={addSchedule}>
        <div class="add-schedule-btn">+</div>
        <div>Schedule 추가하기</div>
    </div>

    <div class="schedule-container">
        {#each sortedScheduleList as schedule}
            <form method="post">
                <div class="schedule-item" style="background-color: {getBgColor(schedule.importance_level)};">
                    <div class="date-day" style="color:black;">{convert_date(schedule.start_date)}</div>
                    <div class="event-container">
                        <div class="event" style="background-color: rgba(255, 255, 255, 0.8);">
                            {schedule.schedule_name}
                            <input name="id" type="text" value={schedule.id} hidden />
                        </div>
                        {#if editedSchedule === schedule}
                            <Component_editSchedule {schedule} on:close={closeEditSchedule} />
                        {/if}
                        <div class="buttons">
                            <button class="button blue" type="button" on:click={() => editSchedule(schedule)}>수정</button>
                            <button class="button pink" type="submit" formaction="?/deleteSchedule">삭제</button>
                        </div>
                    </div>
                </div>
            </form>
        {/each}
        {#if showAddSchedule}
            <Component_addSchedule on:close={closeAddSchedule} />
        {/if}
    </div>
</div>


 <style>
   .container {
      max-width: 800px;
      margin: 20px auto;
      font-family: 'Arial', sans-serif;
      transition: background-color 0.3s ease;
      background-color: white;
      padding: 30px;
      box-shadow: 10px 10px 10px 10px rgb(0,0,0, 0.5);
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
      justify-content:flex-end;
      
      
   }
 
   .button {
      margin-left: 10px;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 5px;
   }
 
   .pink {
      /*background-color: #ff7979; Light Pink */
      background-color: rgb(77, 44, 112);
      color: #fff;
      width:15%;
      border:none;
   }
 
   .blue {
      /*background-color: #3498db; /* Dodger Blue */
      background-color: #34347c;
      color: #fff;
      width:15%;
      border:none;
   }

 
 </style>