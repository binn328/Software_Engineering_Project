<script>
	let showByDate = false;
	let showByCategory = false;

	let todoList = [
		{ id: 1, task: '할일 1', completed: false },
		{ id: 2, task: '할일 2', completed: true }
		// 추가적인 할일 목록을 필요에 따라 추가
	];

	function toggleByDate() {
		showByDate = !showByDate;
		// 여기에 날짜 필터링 로직 추가
	}

	function toggleByCategory() {
		showByCategory = !showByCategory;
		// 여기에 카테고리 필터링 로직 추가
	}
	function addTask() {
		const newTask = { id: todoList.length + 1, task: '새로운 할일', completed: false };
		todoList = [...todoList, newTask];
	}
</script>

<div>
	<h1>Todolist</h1>

	<div class="btn-container">
		<button on:click={toggleByDate}>기간</button>
		{#if showByDate}
			<!-- 여기에 기간 필터링 UI 추가 -->
		{/if}

		<button on:click={toggleByCategory}>카테고리</button>
		{#if showByCategory}
			<!-- 여기에 카테고리 필터링 UI 추가 -->
		{/if}
	</div>
	<div class="todo-container">
		{#each todoList as { id, task, completed }}
			<div class="task">
				<input type="checkbox" bind:checked={completed} class="checkbox" />
				<div>{task}</div>
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
		border-bottom: 1px solid #ccc;
		padding: 8px;
	}

	.checkbox {
		margin-right: 10px;
	}
</style>
