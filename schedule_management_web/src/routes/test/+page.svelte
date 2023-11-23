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
	{JSON.stringify(gradeList[0])}
</div>
