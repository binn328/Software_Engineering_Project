<script>

  let startDate = "";
  let endDate = "";
  let scheduleName = "";
  let location = "";
  let bgColor = "#ff7979"; // Default color: Light Pink
  let repeat = false;
  let editModeData = null; // Move this declaration outside of onMount

  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  // onMount lifecycle hook to set initial values when component is mounted
  onMount(() => {
    if (editModeData) {
      // Use the existing editModeData declared outside of onMount
      startDate = editModeData.startDate;
      endDate = editModeData.endDate;
      scheduleName = editModeData.content;
      location = editModeData.location || "";
      bgColor = editModeData.bgColor;
      repeat = editModeData.repeat || false;
    }
  });

  function saveSchedule() {
    const newSchedule = {
      id: editModeData ? editModeData.id : Math.floor(Math.random() * 1000),
      year: new Date(startDate).getFullYear(),
      date: startDate,
      day: getDayOfWeek(startDate),
      content: scheduleName,
      bgColor: `rgba(${parseInt(bgColor.slice(-6, -4), 16)}, ${parseInt(bgColor.slice(-4, -2), 16)}, ${parseInt(
        bgColor.slice(-2),
        16
      )}, 0.7)`,
      startDate: startDate,
      endDate: endDate,
    };

    dispatch("save", newSchedule);
    resetForm();
  }

  function close() {
    dispatch("close");
    resetForm();
  }

  function resetForm() {
    startDate = "";
    endDate = "";
    scheduleName = "";
    location = "";
    bgColor = "#ff7979";
    repeat = false;
  }

  function getDayOfWeek(dateString) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return days[dayIndex];
  }


  </script>
  
  <style>

    /* AddSchedule 컴포넌트에 대한 스타일 추가 */
    .add-schedule-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width:500px;
    
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    z-index: 1000;}
    
    .re-che{
      margin-left:360px;
    }
    h2{
      text-align:center;
    }

  </style>
  
  <div class="add-schedule-modal">
    <h2>일정</h2>
    <label for="start-date">시작일</label>
    <input type="date" id="start-date" bind:value={startDate} />
  
    <label for="end-date">마감일</label>
    <input type="date" id="end-date" bind:value={endDate} />
  
    <label for="schedule-name">일정 이름</label>
    <input type="text" id="schedule-name" bind:value={scheduleName} />
  
    <label for="location">장소</label>
    <input type="text" id="location" bind:value={location} />
  
    <label for="bg-color">배경색</label>
    <input type="color" id="bg-color" bind:value={bgColor} />
  
    <label for="repeat">반복
    <input type="checkbox" class = "re-che" id="repeat" bind:checked={repeat} />
  </label>

    <div class="buttons">
      <button on:click={saveSchedule}>확인</button>
      <button on:click={close}>닫기</button>
    </div>
  </div>
  