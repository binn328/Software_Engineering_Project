<script>
	//@ts-nocheck
	import ComponentAddGrade from '$lib/component/addGrade.svelte';
	import ComponentEditGrade from '$lib/component/editGrade.svelte';

	/* 데이터를 DB에서 가져옵니다 */
	export let data;
	// grade 레코드들
	const gradeList = data.gradeList;
	// 졸업 학점 정보
	const graduate_credit = data.graduate_credit;

	// 연도
	let year = 1;
	// 학기
	let semester = 1;
	/* 연도와 학기가 일치하는 grade레코드들 */
	let filteredGradeList = filterGrade(gradeList, year, semester);
	/* 졸업 요건 표에 들어갈 전체 요약 정보 */
	let summary = summarize(gradeList);
	/* 학기 요약에 들어갈 학기 요약 정보 */
	let summaryFiltered = summarize_filtered(filteredGradeList);

	/* 학기 이동 함수
	 * 1을 넣으면 학기가 1 증가, -1을 넣으면 학기가 1 감소합니다.*/
	function move_semester(n) {
		semester += n;
		if (semester > 2) {
			semester = 1;
			year += 1;
		} else if (semester < 1) {
			semester = 2;
			year -= 1;
		}

		if (year < 1) {
			year = 1;
			semester = 1;
		} else if (year > 6) {
			year = 6;
			semester = 2;
		}
		// 학기가 이동하면 필터링을 새로 해서 페이지를 새로고침합니다.
		filteredGradeList = filterGrade(gradeList, year, semester);
		summaryFiltered = summarize_filtered(filteredGradeList);
	}

	/* gradeList 필터 함수
	 * year와 semester가 일치하는 grade 레코드만 남깁니다.*/
	function filterGrade(gradeList, year, semester) {
		const filteredGrade = gradeList.filter(
			(grade) => grade.year == year && grade.semester == semester
		);

		return filteredGrade;
	}
	/* 컴포넌트에 사용할 데이터 */
	export let componentData = {
		year,
		semester
	};
	export let editData;

	/* 모달 창의 표시 여부 */
	let is_show_add_grade = false;
	let is_show_edit_grade = false;

	/* true와 false를 전공과 교양으로 변환합니다. */
	function convert_is_major(is_major) {
		return is_major ? '전공' : '교양';
	}

	/* 실수 형태의 점수를 알파벳 형태의 점수로 변환합니다 */
	function convert_grade_to_gpa(grade) {
		switch (grade) {
			case 4.5:
				return 'A+';
			case 4.0:
				return 'A';
			case 3.5:
				return 'B+';
			case 3.0:
				return 'B';
			case 2.5:
				return 'C+';
			case 2.0:
				return 'C';
			case 1.5:
				return 'D+';
			case 1.0:
				return 'D';
			default:
				return 'F';
		}
	}
	/* 추가 창을 보여주면서 보여줄 데이터를 최신화합니다.*/
	function showAddGrade() {
		componentData = {
			year,
			semester
		};
		is_show_add_grade = true;
	}

	/* 추가 창을 닫습니다 */
	function closeAddGrade() {
		is_show_add_grade = false;
	}

	/* 수정 창을 띄우면서 보여줄 데이터를 최신화합니다. */
	function showEditGrade(grade) {
		editData = grade;
		is_show_edit_grade = true;
	}

	/* 수정 창을 닫습니다 */
	function closeEditGrade() {
		is_show_edit_grade = false;
	}

	/* 학기를 요약해주는 함수 */
	function summarize_filtered(filteredGradeList) {
		const generalCredits = filteredGradeList
			.filter((filterGrade) => filterGrade.is_major === 'false')
			.reduce((sum, filterGrade) => sum + filterGrade.credit, 0);
		const majorCredits = filteredGradeList
			.filter((filterGrade) => filterGrade.is_major === 'true')
			.reduce((sum, filterGrade) => sum + filterGrade.credit, 0);
		const totalCredits = generalCredits + majorCredits;
		const averageGPA =
			filteredGradeList.reduce(
				(sum, filterGrade) => sum + filterGrade.grade * filterGrade.credit,
				0
			) / totalCredits;

		return {
			generalCredits: generalCredits,
			majorCredits: majorCredits,
			totalCredits: totalCredits,
			averageGPA: averageGPA
		};
	}

	/* 전체 학기를 요약해주는 함수 */
	function summarize(gradeList) {
		const generalCredits = gradeList
			.filter((grade) => grade.is_major === 'false')
			.reduce((sum, grade) => sum + grade.credit, 0);
		const majorCredits = gradeList
			.filter((grade) => grade.is_major === 'true')
			.reduce((sum, grade) => sum + grade.credit, 0);
		const totalCredits = generalCredits + majorCredits;
		const averageGPA =
			gradeList.reduce((sum, grade) => sum + grade.grade * grade.credit, 0) / totalCredits;
		const remainCredits = graduate_credit - totalCredits;

		return {
			generalCredits,
			majorCredits,
			totalCredits,
			averageGPA,
			remainCredits
		};
	}
</script>

<!-- 학년 학기를 이동시키는 네비게이션 -->
<!-- 버튼을 누르면 정보가 변합니다. -->
<div align="center">
	<form>
		<div class="semester-navigation">
			<button on:click={() => move_semester(-1)}>&lt;</button>
			<h1>{year}학년 {semester}학기</h1>
			<button on:click={() => move_semester(1)}>&gt;</button>
		</div>
	</form>
</div>

<!-- 학기 정보를 표로 제공합니다. -->
<table role="grid">
	<thead>
		<tr>
			<th scope="col">구분</th>
			<th scope="col">교과목명</th>
			<th scope="col">학점</th>
			<th scope="col">등급</th>
			<th scope="col">평점</th>
			<th scope="col" style="width: 90px">수정</th>
		</tr>
	</thead>
	<tbody>
		{#if filteredGradeList.length > 0}
			{#each filteredGradeList as grade (grade.id)}
				<tr>
					<td>{convert_is_major(grade.is_major)}</td>
					<td>{grade.subject}</td>
					<td>{grade.credit}</td>
					<td>{grade.grade}</td>
					<td>{convert_grade_to_gpa(grade.grade)}</td>
					<td style="width: 90px"
						><button class="small-button" on:click={() => showEditGrade(grade)}>수정</button></td
					>
				</tr>
				{#if is_show_edit_grade}
					<ComponentEditGrade {editData} on:close={closeEditGrade} />
				{/if}
			{/each}
		{/if}
	</tbody>
</table>

<!-- 추가하기 버튼, 누르면 추가하기 모달창이 뜹니다. -->
<button class="addButton" on:click={showAddGrade}>추가하기</button>
{#if is_show_add_grade}
	<ComponentAddGrade {componentData} on:close={closeAddGrade} />
{/if}
<p />
<hr />
<p />
<!-- 학기 요약 표 -->
<div align="center">
	<h1>{year}학년 {semester}학기 요약</h1>
</div>

<table role="grid">
	<thead>
		<tr>
			<th>교양 학점</th>
			<th>전공 학점</th>
			<th>취득학점</th>
			<th>평균학점</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{summaryFiltered.generalCredits}</td>
			<td>{summaryFiltered.majorCredits}</td>
			<td>{summaryFiltered.totalCredits}</td>
			<td>{summaryFiltered.averageGPA.toFixed(2)}</td>
		</tr>
	</tbody>
</table>

<p />
<hr />
<p />

<!-- 졸업 요건 정리 표 -->
<div align="center">
	<h1>졸업 요건</h1>
</div>

<table>
	<thead>
		<tr>
			<th />
			<th>졸업학점</th>
			<th>교양학점</th>
			<th>전공학점</th>
			<th>잔여학점</th>
			<th>평균점수</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>기준</td>
			<td>{graduate_credit}</td>
			<td rowspan="2">{summary.generalCredits}</td>
			<td rowspan="2">{summary.majorCredits}</td>
			<td rowspan="2">{summary.remainCredits}</td>
			<td rowspan="2">{summary.averageGPA.toFixed(2)}</td>
		</tr>
		<tr>
			<td>현재</td>
			<td>{summary.totalCredits}</td>
		</tr>
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 20px;
	}
	h1 {
		font-size: 24px;
		margin: 0;
		white-space: nowrap;
		margin-bottom: 20px;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: center;
		position: relative;
	}

	.small-button {
		font-size: 12px;
		padding: 8px;
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: auto;
	}
	.semester-navigation {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 25%;
		margin-top: 20px;
		gap: 10px;
	}
</style>
