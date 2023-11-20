<script>
// @ts-nocheck

    import AddSchedule from '$lib/component/AddSchedule.svelte';
    import RepeatSchedule from '$lib/component/RepeatSchedule.svelte';
    import ShareSchedule from '$lib/component/ShareSchedule.svelte';
  
    let schedules = [];
    let showAddSchedule = false;
    let editModeData = null;
  
    let showRepeatSchedule=false;
    let repeatScheduleData=null;
  
    let showShareSchedule=false;
    let sharedFriends=[];
  
    function deleteSchedule(id) { //삭제창
      const isConfirmed = confirm("정말로 삭제하시겠습니까?");
  
      if (isConfirmed) {
        schedules = schedules.filter(schedule => schedule.id !== id);
      }
    }
  
    function modifySchedule(id) {    // 일정창 열고 수정한 내용으로 변경
      const scheduleToModify = schedules.find(schedule => schedule.id === id);
  
  
      showAddSchedule = true;
      editModeData = { ...scheduleToModify };
    }
  
    function repeatSchedule(id) {
      showRepeatSchedule =true;
    }
    function saveRepeatSchedule(event){
      repeatScheduleData = event.detail;
    } 
  
  
    function shareSchedule(id) {
      showShareSchedule=true;
    }
  
    function handleSharedFriends(names){
      sharedFriends=names;
      showShareSchedule=false;
    }
    function closeShareSchedule(){
      showShareSchedule=false;
    }
  
    function addSchedule() {// `AddSchedule` 컴포넌트를 열기
      showAddSchedule = true;
    }
  
    function closeAddSchedule() {// `AddSchedule` 컴포넌트를 닫기 
      showAddSchedule = false;
    }
  
    function saveSchedule(event) {
      // 시작일이 마감일보다 늦으면 추가하지 않음.
      if (new Date(event.detail.startDate) > new Date(event.detail.endDate)) {
        alert("시작일은 마감일보다 늦을 수 없습니다.");
      } else {
        // 수정모드면 그거로 바꿈
        if (editModeData) {
          schedules = schedules.map(schedule => {
            return schedule.id === editModeData.id ? { ...event.detail } : schedule;
          });
          editModeData = null;
        } 
        else {// `AddSchedule` 컴포넌트에서 받은 새로운 스케줄을 현재 스케줄 배열에 추가.
          schedules = [...schedules, event.detail];
  
          // 스케줄을 연도와 시간에 따라 정렬
          schedules.sort((a, b) => {
            if (a.year !== b.year) {
              return a.year - b.year;
            } else {
              return new Date(a.date) - new Date(b.date);
            }
          });
        }
        showAddSchedule = false;
      }
    }
  
</script>
  
    
<div class="container">
    <div class="add-schedule" on:click={addSchedule}>
    <div class="add-schedule-btn">+</div>
    <div>Schedule 추가하기</div>
    </div>

    <div class="schedule" >
        {#each schedules as { id, year, date, day, content, bgColor }, index (id)}
        {#if index === 0 || year !== schedules[index - 1].year}
        
        <div class="year">{year}</div>
        {/if}
        <div class="schedule-item" key={id} style="background-color: {bgColor};">
        
        <div class="date-day" style="color:white;">{date} ({day})</div>
        <div class="event-container" >
            <div class="event" style="background-color: rgba(255, 255, 255, 0.8);">{content}</div>
            <div class="buttons">
            <div class="button pink" on:click={() => deleteSchedule(id)}>Delete</div>
            <div class="button blue" on:click={() => modifySchedule(id)}>Modify</div>
            <div class="button yellow" on:click={() => repeatSchedule(id)}>Repeat</div>
            <div class="button pink" on:click={() => shareSchedule(id)}>Share</div>
            </div>
        </div>
        </div>
    {/each}
    
    </div>
    {#if showAddSchedule}
    <AddSchedule on:close={closeAddSchedule}
    on:save={saveSchedule} />
{/if}

{#if showRepeatSchedule}
<RepeatSchedule on:close={()=> (showRepeatSchedule = false)}
on:saveRepeat = {saveRepeatSchedule} />
{/if}

{#if showShareSchedule}
<ShareSchedule on:close={closeShareSchedule}
on:share={handleSharedFriends} />
{/if}


</div>

<style>
    
  .container {
    max-width: 800px;
    margin: 20px auto;
    font-family: 'Arial', sans-serif;
    transition:background-color 0.3s ease;
  }

  .add-schedule {
    border: 2px dashed #000;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
    cursor:pointer;
   
  }
  .add-schedule:hover {
    background-color: #eee; /* 마우스가 올라가 있을때 배경색 변경 */
  }
  .add-schedule:active{ /*마우스 클릭시 */
    background-color:#ddd;
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
    justify-content: flex-end;
  }

  .button {
    margin-left: 10px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
  }

  .pink {
    background-color: #ff7979; /* Light Pink */
    color: #fff;
  }

  .blue {
    background-color: #3498db; /* Dodger Blue */
    color: #fff;
  }

  .yellow {
    background-color: #f9ca24; /* Yellow */
    color: #fff;
  }

</style>