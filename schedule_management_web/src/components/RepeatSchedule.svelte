<!-- src/components/RepeatSchedule.svelte -->

<script>
    let repeatType = "weekly"; // Default repeat type
    let repeatDays = {
      일요일: false,
      월요일: false,
      화요일: false,
      수요일: false,
      목요일: false,
      금요일: false,
      토요일: false,
    };
  
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
  
    function saveRepeatSchedule() {
      const repeatScheduleData = {
        repeatType,
        repeatDays,
      };
  
      dispatch("saveRepeat", repeatScheduleData);
      resetForm();

      dispatch("close");
    }
  
    function close() {
      dispatch("close");
      resetForm();
    }
  
    function resetForm() {
      repeatType = "weekly";
      repeatDays = {
        일요일: false,
        월요일: false,
        화요일: false,
        수요일: false,
        목요일: false,
        금요일: false,
        토요일: false,
      };
    }
  </script>
  
  <style>
    /* RepeatSchedule 컴포넌트에 대한 스타일 추가 */
    .repeat-schedule-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      width: 300px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
  
  h2{

    text-align:center;
    /*border-bottom :2px solid black;
    margin-bottom:10px;*/
  }
  </style>
  
  
  <div class="repeat-schedule-modal">
    <h2>일정 반복 </h2>
  
  
    <select id="repeat-type" bind:value={repeatType}>
      <option value="weekly">주간 반복</option>
      <option value="monthly">월간 반복</option>
      <option value="yearly">연간 반복</option>
    </select>
  
    <div>
      <label for="repeat-days">반복 요일</label>
      <div id="repeat-days">
        {#each Object.keys(repeatDays) as day}
          <label>
            {day}
            <input type="checkbox" bind:checked={repeatDays[day]} />
          </label>
        {/each}
      </div>
    </div>
  
    <div class="buttons">
      <button on:click={saveRepeatSchedule}>적용하기</button>
      <button on:click={close}>닫기</button>
    </div>
  </div>
  