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

	// 현재 날짜를 가져오는 함수
	function getCurrentDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
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
</script>

<div>
	<h1>Todolist</h1>

	<div class="details-container">
		<details role="list" open={showDateOptions}>
			<summary aria-haspopup="listbox" role="link" class="secondary">기간</summary>
			<ul role="listbox">
				<li role="button" class="datelist" on:click={() => selectDate('오늘')}>오늘</li>

				<li role="button" class="datelist" on:click={() => selectDate('내일')}>내일</li>
				<li role="button" class="datelist" on:click={() => selectDate('일주일')}>일주일</li>
				<li role="button" class="datelist" on:click={() => selectDate('한달')}>한달</li>
				<li role="button" class="datelist" on:click={() => selectDate('일년')}>일년</li>
			</ul>
		</details>

		<button class="category-btn">카테고리</button>
	</div>

	<!-- 현재 설정된 기간을 보여줌 -->
	<div class="showDate">
		<p>{start_date} ~ {end_date}</p>
	</div>

	<div class="todo-container">
		{#each todoList as todo}
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
		border-color: black;
	}

	.datelist {
		color: white;
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
		width: 50%;
		margin: 20px auto;
		background-color: #a8a8a8;
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
		width: 15%;
	}

	.category-btn {
		background-color: transparent;
		color: black;
		width: 15%;
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
