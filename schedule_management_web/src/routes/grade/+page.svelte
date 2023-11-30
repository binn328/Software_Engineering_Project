<script>
	//@ts-nocheck
	import ComponentAddGrade from '$lib/component/addGrade.svelte';
	import ComponentEditGrade from '$lib/component/editGrade.svelte';

	export let data;
	const gradeList = data.gradeList;
	const graduate_credit = data.graduate_credit;

	let year = 1;
	let semester = 1;
	let filteredGradeList = filterGrade(gradeList, year, semester);

	/* 학기 이동 함수 */
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
		filteredGradeList = filterGrade(gradeList, year, semester);
	}

	/* gradeList 필터 함수 */
	function filterGrade(gradeList, year, semester) {
		const filteredGrade = gradeList.filter(
			(grade) => grade.year == year && grade.semester == semester
		);

		return filteredGrade;
	}
	export let componentData = {
		year,
		semester
	};
	export let editData;

	let is_show_add_grade = false;
	let is_show_edit_grade = false;

	function convert_is_major(is_major) {
		return is_major ? '전공' : '교양';
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
	/* 추가 관련 */
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

	/* 수정 관련 */
	function showEditGrade(grade) {
		console.log(grade);
		editData = grade;
		is_show_edit_grade = true;
	}

	function closeEditGrade() {
		is_show_edit_grade = false;
	}
	// let generalCredits = courses
	// 	.filter((course) => course.category === '교양')
	// 	.reduce((sum, course) => sum + course.credit, 0);
	// let majorCredits = courses
	// 	.filter((course) => course.category === '전공')
	// 	.reduce((sum, course) => sum + course.credit, 0);
	// let totalCredits = generalCredits + majorCredits;
	// let averageGPA =
	// 	courses.reduce((sum, course) => sum + course.gpa * course.credit, 0) / totalCredits;
</script>

<div align="center">
	<form>
		<div class="semester-navigation">
			<button on:click={() => move_semester(-1)}>&lt;</button>
			<h1>{year}학년 {semester}학기</h1>
			<button on:click={() => move_semester(1)}>&gt;</button>
		</div>
	</form>
</div>

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

<button class="addButton" on:click={showAddGrade}>추가하기</button>
{#if is_show_add_grade}
	<ComponentAddGrade {componentData} on:close={closeAddGrade} />
{/if}

<h1>{year}학년 {semester}학기 요약</h1>

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
			<!-- 여기에 요약 정보 표시 코드 추가 -->
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
