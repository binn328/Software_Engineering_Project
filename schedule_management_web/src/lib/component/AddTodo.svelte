<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
	export let component_data;
</script>

<div class="add-todo">
	<form method="post" action="?/addTodo">
		<label
			>start_date
			<input name="start_date" type="date" required value={component_data.start_date} />
		</label>
		<label
			>end_date
			<input name="end_date" type="date" value={component_data.end_date} />
		</label>
		<label
			>is_complete
			<select name="is_complete" required>
				<option value="true">완료</option>
				<option value="false" selected>미완료</option>
			</select>
		</label>
		<label
			>memo
			<input name="memo" type="text" required />
		</label>
		<label
			>category
			<input name="category" type="text" required />
		</label>

		<div class="buttons">
			<button type="submit">추가하기</button>
			<button type="reset" on:click={close}>닫기</button>
		</div>
	</form>
</div>

<style>
	.add-todo {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgb(255, 255, 255);
		width: 500px;

		padding: 30px;
		border-radius: 8px;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}
</style>
