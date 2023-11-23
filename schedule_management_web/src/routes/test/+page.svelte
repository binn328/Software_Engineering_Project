<script>
	export let data;
	const gradeList = data.gradeList;
</script>

<!-- grade 가져오기 테스트 -->
<div>
	<h3>gradeList 가져오기 테스트</h3>
	{JSON.stringify(gradeList)}
	<br />
	<hr />
	<h3>gradeList의 첫번째 요소</h3>
	<p>id : {gradeList[0].id}</p>
	<p>subject : {gradeList[0].subject}</p>
	<p>year : {gradeList[0].year}</p>
</div>
<hr />
<!-- grade 삽입 테스트 -->
<div>
	<h3>grade 삽입 테스트</h3>
	<form method="post" action="?/addGrade">
		<label
			>credit
			<input name="credit" type="number" required min="0" max="3" value="0" />
		</label>
		<label
			>is_major
			<select name="is_major" required>
				<option value="true" selected>전공</option>
				<option value="false">교양</option>
			</select>
		</label>
		<label
			>subject
			<input name="subject" type="text" required />
		</label>
		<label
			>grade
			<input name="grade" type="number" step="0.1" min="0.0" max="4.5" value="4.0" required />
		</label>
		<label
			>semester
			<input name="semester" type="number" min="1" max="2" value="1" required />
		</label>
		<label
			>year
			<input name="year" type="number" required min="2000" value="2023" />
		</label>
		<button type="submit">추가하기</button>
	</form>
</div>
