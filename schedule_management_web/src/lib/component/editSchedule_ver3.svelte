<script>
    // @ts-nocheck
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    function close() {
       dispatch('close');
    }
  
    export let editedSchedule;
  
    function convert_date(datetime) {
       console.log(datetime.split('T')[0]);
       return datetime.split(' ')[0];
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
  
  <div class="update-schedule-modal">
    <form method="post" action="?/updateSchedule" on:submit={handleSubmit}>
       <h2>일정</h2>
       <label>
         일정 이름
         <input name="schedule_name" type="text" required value={editedSchedule.schedule_name} />
       </label>
       <label>
         시작일
         <input name="start_date" type="date" required value={convert_date(editedSchedule.start_date)} />
       </label>
       <label>
         마감일
         <input name="end_date" type="date" value={convert_date(editedSchedule.end_date)} />
       </label>
       <label>
         장소
         <input name="location" type="text" value={editedSchedule.location} />
       </label>
       <label>
         중요도
         <input
           name="importance_level"
           type="number"
           value={editedSchedule.importance_level}
           min="1"
           max="3"
         />
       </label>
       <input name="id" type="text" value={editedSchedule.id} hidden />
       <label>
         반복
         <input name="repeat" type="checkbox" class="re-che" />
       </label>
       <div class="buttons">
         <button type="submit" style="background-color: rgb(107, 107, 161);">수정하기</button>
         <button type="reset" on:click={close} style="background-color: rgb(107, 107, 161);">닫기</button>
       </div>
    </form>
  </div>
  
  <style>
    /* updateSchedule 컴포넌트에 대한 스타일 추가 */
    .update-schedule-modal {
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
       background-color: rgb(107, 107, 161);
    }
  </style>