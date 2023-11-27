<script>
	import {tasks} from '$lib/component/store';


	let showByDate = false;
  let showByCategory = false;

  // Use the tasks from the store
  $: todoList = $tasks;
  $: console.log('Current todoList:', todoList);

  function toggleByDate() {
    showByDate = !showByDate;
    // 여기에 날짜 필터링 로직 추가
  }

  function toggleByCategory() {
    showByCategory = !showByCategory;
    // 여기에 카테고리 필터링 로직 추가
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

  function deleteTask(id){
	console.log('Before delete:', $tasks);
	//tasks.update(currentTasks => currentTasks.filter(task => task.scheduleId !== id));
	//console.log('After delete:', $tasks);
	tasks.update(currentTasks => {
    const newTasks = currentTasks.filter(task => task.scheduleId !== id);
    console.log('After delete:', newTasks);
    return [...newTasks];
  });
}


</script>

<div>
	<h1>Todolist</h1>

	<div class="details-container">
	<details role="list" >
		<summary aria-haspopup="listbox" role="link" class="secondary">기간</summary>
		<ul role="listbox">
			<li>오늘</li>
			<li>내일</li>
			<li>일주일</li>
			<li>한달</li>
			<li>일년</li>
		</ul>
	</details>

	<details role="list">
		<summary aria-haspopup="listbox" role="link" class="first">카테고리</summary>
	
	</details>

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
	h1 {
		text-align: center;
	}

	.btn-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		width: 30%;
		margin: 0 auto;
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
