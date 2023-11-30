<script>
	import AddTodo from '$lib/component/AddTodo.svelte';
 
	export let data;
	const todoList = data.todoList;
   
	let showAddTodo = false;
	let startDate='';//기간 별로 시작일~마감일 나타낼때 사용
	 let endDate='';
  
	 let selectedDate = '';//어떤 기간 버튼이 선택되었는지 
	let showDateOptions;//기간 목록창 닫아주기 위함
   
	function addTodo() {
	  showAddTodo = true;
	}
   
	function closeAddTodo() {
	  showAddTodo = false;
	}
   
	function showDate(dayOffset) {//기간의 오늘/내일/...버튼을 누르면 일정 위에 생기는 시작일~마감일
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
 
 function selectDate(date) {//버튼 클릭입력 받은 case 실행
	 selectedDate = date;
	switch (selectedDate) {
	   case '오늘': 
	  showDateOptions=true;  //기간 목록 창 닫아주려면 
	  showDateOptions=false;  //둘다 필요함
	  return  showDate(0) //시작날짜~마감날짜 = 오늘날짜~오늘날짜 형태로 나타남
	   case '내일':
	  showDateOptions=true; 
	  showDateOptions=false;
		 return    showDate(1)
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
 
 let selectedTask = null;//현재 선택된 일정을 저장하는 변수
 function toggleDeleteButton(task) { //일정을 누르면 delete버튼 생성
	 selectedTask = selectedTask === task ? null : task;
	//선택된 일정(task)이 현재 선택한 일정이랑 동일하면 null =이미 선택된걸 한 번 더 누른거
   }//아니면 선택
 
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
	
	   <button class="category-btn">카테고리</button>
	
	</div>
	
	
	<div class="showDate">
	{#if startDate && endDate}
	 <p>{startDate} ~ {endDate}</p>
   {/if}
   </div>
	
 
   <div class="todo-container">
	 {#each todoList as todolist}
	<form method="post">
	   <div class="task" on:click={() => toggleDeleteButton(todolist)}>
		 <input type="checkbox" bind:checked={todolist.is_complete} on:click|stopPropagation/>
		 <p>{todolist.memo}</p>
		 {#if selectedTask === todolist}
		   <button class="delete-btn" type="submit" formaction="?/deleteTodo">삭제</button>
		 {/if}
	   </div>
	  </form>
	 {/each}
 
	 {#if showAddTodo}
	   <AddTodo on:close={closeAddTodo}/>
	 {/if}
 
	 <div class="add-todo" on:click={addTodo}>
	   <button class="btn">+</button>
	 </div>
   </div>
	
	</div>
   
   
   <style>
	.showDate {
	  text-align: center;
	}
   
	h1 {
	  text-align: center;
	}
   
	.btn{
	   background-color: transparent;
	   color:black;
	   border-radius:10px;
	   border-color:black;
 
	}
	
	.datelist {
	  color: black;
	  background: none;
	  border: none;
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
   
	p {
	  margin-top:15px;
	}
   
	.task {
	  display: flex;
	  align-items: center;
	  border-bottom: solid 1px;
	  padding: 8px;
	  gap:10px;
	}
   
	
   
	.details-container {
	  display: flex;
	  justify-content: space-around;
	  text-align: center;
	  align-items: center;
	}
   
	[role="list"] {
	  width: 15%;
	}
 
	.category-btn{
	   background-color: transparent;
	   color:black;
	   width:15%;
	   border:none;
	   
	   
	}
   </style>
   