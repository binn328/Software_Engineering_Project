<script>
	import ComponentAddTodo from '$lib/component/AddTodo.svelte';

	export let data;
	const todoList = data.todoList;
</script>

<div>
	<h1>Todolist</h1>

	<div class="details-container" />
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
		width: 50%;
		margin: 20px auto;
	}

	p {
		margin-top: 15px;
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
</style>
