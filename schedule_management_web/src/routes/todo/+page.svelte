<script>
	//@ts-nocheck
	import ComponentAddTodo from '$lib/component/AddTodo.svelte';
 
	export let data;
	const todoList = data.todoList;
 
	// details의 열림 여부를 지정하는 변수
	let showDateOptions = false;
	// AddTodo 컴포넌트의 표시 여부를 지정하는 변수
	let is_show_addTodo = false;
 
	let start_date = getCurrentDate();
	let end_date = getCurrentDate();
 
	let component_data = {
	   start_date,
	   end_date
	};
 
	let filteredTodoList = filtered_todoList(todoList, start_date, end_date);
 
	// 현재 날짜를 가져오는 함수
	function getCurrentDate() {
	   const today = new Date();
	   const year = today.getFullYear();
	   const month = String(today.getMonth() + 1).padStart(2, '0');
	   const day = String(today.getDate()).padStart(2, '0');
	   return `${year}-${month}-${day}`;
	}
 
	// 날짜 기간을 업데이트하는 함수
	function updateDate(daynum) {
	   const today = new Date();
	   if (daynum != 0) {
		  today.setDate(today.getDate() + daynum);
	   }
	   const year = today.getFullYear();
	   const month = String(today.getMonth() + 1).padStart(2, '0');
	   const day = String(today.getDate()).padStart(2, '0');
 
	   end_date = `${year}-${month}-${day}`;
	   showDateOptions = false;
 
	   filteredTodoList = filtered_todoList(todoList, start_date, end_date);
	}
 
	// AddTodo를 열고 닫는 함수
	function showAddTodo() {
	   component_data = {
		  start_date,
		  end_date
	   };
	   is_show_addTodo = true;
	}
 
	function closeAddTodo() {
	   is_show_addTodo = false;
	}
 
	// 주어진 기간 내의 할일만 반환하는 함수
	function filtered_todoList(todoList, start_date, end_date) {
	   const start_dateObj = new Date(start_date);
	   const end_dateObj = new Date(end_date);
 
	   const filteredTodoList = todoList.filter(
		  (todo) =>
			 new Date(todo.start_date) >= start_dateObj && new Date(todo.start_date) <= end_dateObj
	   );
 
	   console.log(filteredTodoList);
	   return filteredTodoList;
	
	}
 
 
	let categories = Array.from(new Set(todoList.map(todo => todo.category)));
	let showCategoryWindow = false;
 
	   function toggleCategoryWindow() {
	 showCategoryWindow = !showCategoryWindow;
	   }
 
	function filterByCategory(category) {
	 filteredTodoList = todoList.filter(todo => todo.category === category);
	 toggleCategoryWindow();
   }

   function closeCategoryWindow() {
    showCategoryWindow = false;
  }
 
 

</script>

<div class="container">
	<h1>Todolist</h1>

	<div class="details-container">
		<details role="list" bind:open={showDateOptions}>
			<summary aria-haspopup="listbox" role="link" class="secondary">기간</summary>
			<ul role="listbox">
				<li role="button" class="datelist" on:click={() => updateDate(0)}>오늘</li>
				<li role="button" class="datelist" on:click={() => updateDate(1)}>내일</li>
				<li role="button" class="datelist" on:click={() => updateDate(6)}>일주일</li>
				<li role="button" class="datelist" on:click={() => updateDate(29)}>한달</li>
				<li role="button" class="datelist" on:click={() => updateDate(364)}>일년</li>
			</ul>
		</details>

		<button class="category-btn" on:click={toggleCategoryWindow}>카테고리</button>
      {#if showCategoryWindow}
      <div class="category-window">
        <ul>
         {#each categories as category}
           <li role="button" class ="category-btns" on:click={() => filterByCategory(category)}>{category}</li>
         {/each}
		 <button class="category-cancle" on:click={closeCategoryWindow}>닫기</button>
        </ul>
      </div>
     {/if}

	</div>

	<!-- 현재 설정된 기간을 보여줌 -->
	<div class="showDate">
		<p>{start_date} ~ {end_date}</p>
	</div>

	<div class="todo-container">
		{#each filteredTodoList as todo}
			<form method="post" action="?/updateTodo">
				<div class="task">
					<input type="datetime" name="start_date" value={todo.start_date} hidden />
					<input type="datetime" name="end_date" value={todo.end_date} hidden />
					<input
						type="checkbox"
						name="is_complete"
						value={todo.is_complete}
						on:click|stopPropagation
					/>
					<input type="text" name="memo" value={todo.memo} />
					<input type="text" name="category" value={todo.category} hidden />
					<input type="text" name="id" value={todo.id} hidden />
					<button class="button" type="submit">저장</button>
					<button class="button" type="submit" formaction="?/deleteTodo">삭제</button>
				</div>
			</form>
		{/each}

		{#if is_show_addTodo}
			<ComponentAddTodo {component_data} on:close={closeAddTodo} />
		{/if}

		<div class="add-todo">
			<button class="btn" on:click={showAddTodo}>+</button>
		</div>
	</div>
</div>

<style>
	input{
		background:white;
		opacity:0.7;
	}
	.button{
		background-color:rgb(79, 79, 197);
		border:none;
	}
	.category-window{
		position: fixed;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      
      padding: 20px;
      border: 1px solid #ccc;
      z-index: 999; 
      padding: 30px;
	  border-radius: 8px;
	  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
      width:300px;
	}
	.category-btns{
		border:none;
		background-color:transparent;
		text-decoration:underline;
		color:black;
		
	}
	.category-cancle{
		border:none;
		background-color:transparent;
		color:black;
	}
	.container{
		border-radius:10px;
		max-width: 800px;
    	margin: 20px auto;
    	font-family: 'Arial', sans-serif;
    	transition: background-color 0.3s ease;
    	background-color: white;
    	padding: 30px;
    	box-shadow: 10px 10px 10px 10px rgb(0,0,0, 0.5);
	}
	.showDate {
		text-align: center;
	}

	h1 {
		text-align: center;
	}

	.btn {
		background-color: transparent;
		color: black;
		border-radius: 10px;
		border-color: white;
		color:white;
		opacity:0.8;
		
	}

	.datelist {
		color: black;
		background: none;
		border: none;
		transition: background-color 0.3s;
	}

	li[role='button']:active {
		background-color: #f0f0f0;
	}

	.todo-container {
		border: 1px solid #ccc;
		padding: 10px;
		width: 80%;
		margin: 20px auto;
		background-color: rgb(56, 31, 95);
		
		border-radius:10px;
	}

	p {
		margin-top: 15px;
		color: black;
	}

	.task {
		display: flex;
		align-items: center;
		border-bottom: solid 1px;
		padding: 8px;
		gap: 10px;
	}

	.details-container {
		display: flex;
		justify-content: space-around;
		text-align: center;
		align-items: center;
	}

	[role='list'] {
		width: 20%;
	}

	.category-btn {
		background-color: transparent;
		color: black;
		width: 25%;
		border: none;
	}
	.button {
		margin-left: 10px;
		padding: 8px 12px;
		font-size: 14px;
		cursor: pointer;
		border-radius: 5px;
		width: 80px;
		height: 60px;
	}
</style>
