<script>
	export let data;
	const goalList = data.goalList;
</script>

<!-- goal 가져오기 테스트 -->
<div>
	<h3>goalList 가져오기 테스트</h3>
	{JSON.stringify(goalList)}
	<br />
	<hr />
	<h3>goalList의 첫번째 요소</h3>
	<p>id : {goalList[0].id}</p>
	<p>is_complete : {goalList[0].is_complete}</p>
	<p>goal_name : {goalList[0].goal_name}</p>
</div>
<hr />
<!-- goal 삽입 테스트 -->
<div>
	<h3>goal 삽입 테스트</h3>
	<form method="post" action="?/addGoal">
		<label
		>is_complete
		<select name="is_complete" required>
			<option value="true" selected>목표 달성</option>
			<option value="false">목표 미달성</option>
		</select>
		</label>
		<label
			>goal_name
			<input name="goal_name" type="text" required />
		</label>
		<button type="submit">추가하기</button>
	</form>
</div>
<!-- goal 수정 테스트 -->
<div>
	<h3>goal 수정 테스트</h3>
	<form method="post" action="?/updateGoal">
            <label
			>is_complete
			<select name="is_complete" required value={goalList[0].is_complete}>
				<option value="true">목표 달성</option>
				<option value="false">목표 미달성</option>
			</select>
		</label>
		<label
			>goal_name
			<input name="goal_name" type="text" required value={goalList[0].goal_name}/>
		</label>
		<label>
			<input name="id" type="text" required value={goalList[0].id} hidden />
		</label>
		<button type="submit">수정하기</button>
		<button type="submit" formaction="?/deleteGoal">삭제하기</button>
	</form>
</div>
