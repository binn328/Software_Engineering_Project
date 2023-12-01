<script>
   import { createEventDispatcher } from 'svelte';
   const dispatch = createEventDispatcher();
 
   function close() {
      dispatch('close');
   }
   
   function handleSubmit(event) {
    const startDate = event.target.start_date.value;
    const endDate = event.target.end_date.value;
 
    // Convert string dates to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
 
    if (startDateObj > endDateObj) {
      alert("시작일은 마감일보다 늦을 수 없습니다.");
      event.preventDefault(); // Prevent form submission
    }
   }
 
 </script>
 
 <div class="add-schedule-modal">
   <form method="post" action="?/addSchedule" on:submit={handleSubmit}>
      <h2>일정</h2>
      
      
      <label>
        일정 이름
        <input name="schedule_name" type="text" required />
      </label>
      <label>
        시작일
        <input  name="start_date" type="date" required />
      </label>
      <label>
        마감일
        <input  name="end_date" type="date" />
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
      background-color: rgb(255, 255, 255);
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
   button{
      background-color: #3498db;
   }
 </style>