<script>
	export let data;
	const todoList = data.todoList;
</script>

<!-- todoList 가져오기 테스트 -->
<div>
	<h3>todoList 가져오기 테스트</h3>
	{JSON.stringify(todoList)}
	<br />
	<hr />
	<h3>todoList의 첫번째 요소</h3>
	<p>id : {todoList[0].id}</p>
	<p>memo : {todoList[0].memo}</p>
	<p>category : {todoList[0]?.category}</p>
</div>
<hr />
<!-- todoList 삽입 테스트 -->
<div>
	<h3>todoList 삽입 테스트</h3>
	<form method="post" action="?/addTodo">
		<label
			>start_date
			<input name="start_date" type="date" required />
		</label>
		<label
			>end_date
			<input name="end_date" type="date" />
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

		<button type="submit">추가하기</button>
	</form>
</div>
<!-- todoList 수정 테스트 -->
<div>
	<h3>todoList 수정 테스트</h3>
	<form method="post" action="?/updateTodo">
		<label
			>start_date
			<input name="start_date" type="datetime" required value={todoList[0].start_date} />
		</label>
		<label
			>end_date
			<input name="end_date" type="datetime" value={todoList[0].end_date} />
		</label>
		<label
			>is_complete
			<select name="is_complete" required value={todoList[0].is_complete}>
				<option value="true">완료</option>
				<option value="false">미완료</option>
			</select>
		</label>
		<label
			>memo
			<input name="memo" type="text" required value={todoList[0].memo} />
		</label>
		<label
			>category
			<input name="category" type="text" required value={todoList[0].category} />
		</label>
		<label>
			<input name="id" type="text" required value={todoList[0].id} hidden />
		</label>
		<button type="submit">수정하기</button>
		<button type="submit" formaction="?/deleteTodo">삭제하기</button>
	</form>
</div>
