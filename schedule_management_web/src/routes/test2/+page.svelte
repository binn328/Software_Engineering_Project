<script>
	export let data;
	const scheduleList = data.scheduleList;
    let selectedItem;
</script>

<!-- schedule 가져오기 테스트 -->
<div>
	<h3>scheduleList 가져오기 테스트</h3>
	{JSON.stringify(scheduleList)}
	<br />
	<hr />
	<h3>scheduleList의 첫번째 요소</h3>
	{JSON.stringify(scheduleList[0])}
    <h3>scheduleList 전체 읽기</h3>
    <div>
        <ol>
            {#each scheduleList as schedule}
            <li>{`start_date: ${schedule.start_date} end_date: ${schedule.end_date} location: ${schedule.location} schedule_name: ${schedule.schedule_name}`}</li>
            {/each}
        </ol>
    </div>
</div>
<hr />
<!-- schedule 삽입 테스트 -->
<div>
	<h3>schedule 삽입 테스트</h3>
	<form method="post" action="?/addSchedule">
		<label
			>start_date
			<input name="start_date" type="date"/>
		</label>
		<label
			>end_date
            <input name="end_date" type="date"/>
		</label>
		<label
			>location
			<input name="location" type="text" required />
		</label>
		<label
            >schedule_name
        <input name="schedule_name" type="text" required />
		</label>
		<label
			>importance_level
			<input name="importance_level" type="number" min="1" max="3" value="1" required />
		</label>
		<label
            >repeat
        <input name="repeat" type="number" required />
		</label>
		<button type="submit">추가하기</button>
	</form>
</div>

<div>
<h3>schedule 업데이트 테스트</h3>
    <form method="post" action="?/updateSchedule">
		<label
			>start_date
			<input name="start_date" type="date"/>
		</label>
		<label
			>end_date
            <input name="end_date" type="date"/>
		</label>
		<label
			>location
			<input name="location" type="text" required value={scheduleList[0].location} />
		</label>
		<label
            >schedule_name
        <input name="schedule_name" type="text" required />
		</label>
		<label
			>importance_level
			<input name="importance_level" type="number" min="1" max="3" value="1" required />
		</label>
		<label
            >repeat
        <input name="repeat" type="number" required />
		</label>
        <input id="owner" name="owner" type="hidden" value={scheduleList[0].owner} />
        <input id="id" name="id" type="hidden" value={scheduleList[0].id} />
		<button type="submit">업데이트하기</button>
	</form>
</div>
<div>
    <h3>schedule 삭제 테스트</h3>
    <form method="post" action="?/deleteSchedule">
        <p>{scheduleList[0].schedule_name}</p>
        <p>{scheduleList[0].location}</p>
        <input id="id" name="id" type="hidden" value={scheduleList[0].id} />
        <label for="delete">정말 지우겠습니까?</label>
        <button id="delete" name="delete" type="submit">삭제하기</button>
    </form>
</div>