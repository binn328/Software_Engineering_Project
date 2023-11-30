<script>
	// @ts-nocheck
	import ComponentAddGrade from '$lib/component/addGrade.svelte';

	export let data;
	const gradeList = data.gradeList;
	const graduate_credit = data.graduate_credit;
	const one_one_gradeList = data.one_one_gradeList;

	// let generalCredits = courses
	// 	.filter((course) => course.category === '교양')
	// 	.reduce((sum, course) => sum + course.credit, 0);
	// let majorCredits = courses
	// 	.filter((course) => course.category === '전공')
	// 	.reduce((sum, course) => sum + course.credit, 0);
	// let totalCredits = generalCredits + majorCredits;
	// let averageGPA =
	// 	courses.reduce((sum, course) => sum + course.gpa * course.credit, 0) / totalCredits;

	/* 학년 학기 변수 */
	let year = 1;
	let semester = 1;

	let componentData = {
		year,
		semester
	};

	/* 추가창 보여줄 변수 */
	let is_show_add_grade = false;

	function convert_is_major(is_major) {
		if (is_major == true) {
			return '전공';
		} else {
			return '교양';
		}
	}
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

	function showAddGrade() {
		componentData = {
			year,
			semester
		};
		is_show_add_grade = true;
	}
	function closeAddGrade() {
		is_show_add_grade = false;
	}
</script>

<h1>{year}학년 {semester}학기</h1>

<table>
	<thead>
		<tr>
			<th>구분</th>
			<th>교과목명</th>
			<th>학점</th>
			<th>등급</th>
			<th>평점</th>
		</tr>
	</thead>
	<tbody>
		<!-- {#each one_one_gradeList as grade}
			<tr>
				<td>{convert_is_major(grade.is_major)}</td>
				<td>{grade.subject}</td>
				<td>{grade.credit}</td>
				<td>{grade.grade}</td>
				<td>{convert_grade_to_gpa(grade.grade)}</td>
			</tr>
		{/each} -->
	</tbody>
</table>

<button class="addButton" on:click(showAddGrade)>추가하기</button>
{#if is_show_add_grade}
	<ComponentAddGrade {componentData} on:close(closeAddGrade) />
{/if}
<h1>{year}학년 {semester}학기 요약</h1>

<table>
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
			<!-- <td>{generalCredits}</td>
			<td>{majorCredits}</td>
			<td>{totalCredits}</td>
			<td>{averageGPA.toFixed(2)}</td> -->
		</tr>
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 20px;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: center;
	}
</style>
