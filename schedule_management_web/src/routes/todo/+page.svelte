
<script>
	import {tasks} from '$lib/component/store';

  let startDate='';
  let endDate='';
 
  let selectedDate = '';
let showDateOptions;

  $: todoList = $tasks

  function showDate(dayOffset) {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + dayOffset);

    const startYear = today.getFullYear().toString().slice(-2);
    const startMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const startDay = today.getDate().toString().padStart(2, '0');

    const endYear = targetDate.getFullYear().toString().slice(-2);
    const endMonth = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const endDay = targetDate.getDate().toString().padStart(2, '0');

    startDate = `${startYear}년 ${startMonth}월 ${startDay}일`;
    endDate = `${endYear}년 ${endMonth}월 ${endDay}일`;
	
}


  function addTask(scheduleId) {
    const newTask = {
		 id: Math.floor(Math.random() * 1000),
		  task: '',
		   completed: false, 
		   editable: true,
		 	scheduleId: scheduleId,
		 };
    tasks.update(currentTasks => [...currentTasks, newTask]);
  }



function selectDate(date) {
    selectedDate = date;
	switch (selectedDate) {
      case '오늘': 
	  showDateOptions=true;  
	  showDateOptions=false;  
	  return  showDate(0)
      case '내일':
	  showDateOptions=true; 
	  showDateOptions=false;
        return 	showDate(1)
     case '일주일':
	 showDateOptions=true; 
	 showDateOptions=false;
        return showDate(7)
	case '한달':
	showDateOptions=true; 
	showDateOptions=false;
		return showDate(30)
	case '일년':
	showDateOptions=true; 
	showDateOptions=false;
		return showDate(365)
    
	}


   
  }

</script>

<div>
	<h1>Todolist</h1>

	<div class="details-container">
		<details role="list" open={showDateOptions} >
			<summary aria-haspopup="listbox" role="link" 
			class="secondary" >기간</summary>
			<ul role="listbox">
			
				<li role = "button" class="datelist" 
				on:click={() => selectDate('오늘')}>오늘</li>
			 
			  <li role = "button" class="datelist" 
			  on:click={() => selectDate('내일')}>내일</li>
			  <li role = "button" class="datelist" 
			  on:click={() => selectDate('일주일')}>일주일</li>
			  <li role = "button" class="datelist" 
			  on:click={() => selectDate('한달')}>한달</li>
			  <li role = "button" class="datelist" 
			  on:click={() => selectDate('일년')}>일년</li>
			</ul>
		  </details>


	<details role="list">
		<summary aria-haspopup="listbox" role="link" class="first">카테고리</summary>
	
	</details>
	</div>
	
	
	<div class="showDate">
	{#if startDate && endDate}
    <p>{startDate} ~ {endDate}</p>
  {/if}
  </div>


	<div class="todo-container">
		{#each todoList as { id, task, completed, editable }}
			<div class="task">
				<input type="checkbox" bind:checked={completed} class="checkbox" />
				{#if editable}
					<input type="text" bind:value={task} placeholder="일정입력" />
				{:else}
					<div>{task}</div>
				{/if}
			</div>
		{/each}

		<button on:click={addTask}>+</button>
	</div>
</div>

<style>
	.showDate{
		text-align:center;
	}
	h1 {
		text-align: center;
	}
	.datelist{
		color:black;
		background:none;
		border:none;
		transition: background-color 0.3s;
	}
	li[role="button"]:active {
  background-color: #f0f0f0;
}

	.todo-container {
		border: 1px solid #ccc;
		padding: 10px;
		width: 50%;
		margin: 20px auto;
	}

	.task {
		display: flex;
		align-items: center;
		border-bottom:solid 1px;
		padding: 8px;
	}

	.checkbox {
		margin-right: 10px;
	}

	.task input[type="text"],
	.task div{
		border:none;
		
		background-color: transparent;
	}
	

.details-container{
	display:flex;
	justify-content:space-around;
	text-align:center;
	

}
[role="list"]{
	width:15%;
 }

</style>