<script>
	export let data;
	const TimeTableList = data.TimeTableList;
</script>

<!-- TimeTable 가져오기 테스트 -->
<div>
	<h3>TimeTable 가져오기 테스트</h3>
	{JSON.stringify(TimeTableList)}
	<br />
	<hr />
	<h3>TimeTable의 첫번째 요소</h3>
	<p>id : {TimeTableList[0].id}</p>
	<p>memo : {TimeTableList[0].memo}</p>
	<p>start_time : {TimeTableList[0].start_time}</p>
	<p>end_time : {TimeTableList[0].end_time}</p>
</div>

<hr />
<!-- timetable 삽입 테스트 -->
<div>
	<h3>timetable 삽입 테스트</h3>
	<form method="post" action="?/addTimeTable">
		<label
			>start_time
			<input name="start_time" type="date" />
		</label>
		<label
			>end_time
			<input name="end_time" type="date" />
		</label>
		<label
			>memo
			<input name="memo" type="text" required />
		</label>
		<button type="submit">추가하기</button>
	</form>
</div>

<div>
	<h3>timetable 업데이트 테스트</h3>
	<form method="post" action="?/updateTimeTable">
		<label
			>start_time
			<input name="start_time" type="datetime" />
		</label>
		<label
			>end_time
			<input name="end_time" type="datetime" />
		</label>
		<label
			>memo
			<input name="memo" type="text" required value={TimeTableList[0].memo} />
		</label>
		<input id="owner" name="owner" type="hidden" value={TimeTableList[0].owner} />
		<input id="id" name="id" type="hidden" value={TimeTableList[0].id} />
		<button type="submit">업데이트하기</button>
	</form>
</div>
<div>
	<h3>timetable 삭제 테스트</h3>
	<form method="post" action="?/deleteTimeTable">
		<p>{TimeTableList[0].memo}</p>
		<p>{TimeTableList[0].start_time}</p>
		<p>{TimeTableList[0].end_time}</p>
		<input id="id" name="id" type="hidden" value={TimeTableList[0].id} />
		<label for="delete">정말 지우겠습니까?</label>
		<button id="delete" name="delete" type="submit">삭제하기</button>
	</form>
</div>
