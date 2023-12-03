<script>
	//@ts-nocheck
	import {onMount} from 'svelte';
	import * as d3 from 'd3';
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
	let svg;
	
	onMount(() => {
	 // SVG 요소의 너비와 높이
	 const width = 500;
	 const height = 300;
 
	 // SVG 요소 생성 및 추가
	 svg = d3.select(".left-rectangle").append("svg")
	   .attr("width", width)
	   .attr("height", height)
	  .style('border', '2px solid rgb(39,39,55,0.7)')
	  .style('border-radius', '10px')
	  .style('margin-left','30px');
 
	 drawLineGraph();
	});
 
	function drawLineGraph() {
	   const margin = { top: 30, right: 20, bottom: 20, left: 60 };
	   const width = 450 - margin.left - margin.right;
	   const height = 200 - margin.top - margin.bottom;
	   
	   // X 축 설정
	   const xScale = d3.scaleLinear().domain([1, 12]).range([0, width]);
	   const xAxis = d3.axisBottom(xScale).ticks(12).tickFormat((d) => {
	   const currentYear = Math.floor((d - 1) / 2) + 1;
	   const currentSemester = (d - 1) % 2 + 1;
	   return `${currentYear}학년 ${currentSemester}학기`;
	   });
 
	   // Y 축 설정
	   const yScale = d3.scaleLinear().domain([0, 4.5]).range([height, 0]);
	
 
	   // X 축 그리기
	   svg.append('g')
		  .attr('transform', `translate(${margin.left}, 220)`)
		  .call(xAxis)
		  .selectAll("text")
		  .style("text-anchor", "end")
		  
		  .attr("dx", "-1em") 
		  .attr("dy", ".15em")
		  .attr("transform", "rotate(-45)");
	   
	  
 
	   svg.selectAll('.grid-line')
		  .data([{ value: 2.0, label: '2.0' }, { value: 3.0, label: '3.0' },{ value: 4.0, label: '4.0' }])
		  .enter()
		  .append('g')
		  .attr('class', 'grid-line-group')
		  .each(function (d) {
			 d3.select(this)
			 .append('line')
			 .attr('class', 'grid-line')
			 .attr('x1', margin.left)
			 .attr('x2', width + margin.left)
			 .attr('y1', yScale(d.value) + margin.top)
			 .attr('y2', yScale(d.value) + margin.top)
			 .style('stroke', '#272737')
			 .style('stroke-opacity', (d) => (d === 2.0 || d === 4.0) ? 1.0 : 0.2);
	
		 
			 d3.select(this)
			 .append('text')
			 .attr('class', 'grid-label')
			 .attr('x', width + margin.left + 5) 
			 .attr('y', yScale(d.value) + margin.top)
			 .attr('dy', 5)
			 .style('fill', '#272737')
			 .style('font-size','10px')
			 .text(d.label);
		  });
 
	 // 라인 생성
	 const line = d3.line()
	   .x(d => xScale(d.semester))
		.y(d => yScale(d.averageGPA));
 
	 // 그래프 그리기
		svg.append('path')
		  .datum(getRealGraphData())
		  .attr('fill', 'none')
		  .attr('stroke', 'rgb(39,39,55)')
		  
		  .attr('transform', `translate(${margin.left}, ${margin.top})`)
		  .attr('stroke-width', 2)
		  .attr('d', line);
	}
 
   function getRealGraphData() {
   
	 //전체 학기의 평균학점 배열
	   // 여기서는 filteredGradeList의 데이터를 활용하여 각 학기의 평균 학점을 계산.
	  const semesterAverageGPA = [];
	 for (let y = 1; y <= 6; y++) {
	   for (let s = 1; s <= 2; s++) {
		 const filteredData = filterGrade(gradeList, y, s);
 
		 // 학점이 없는 경우를 처리합니다.
		 if (filteredData.length === 0) {
		   semesterAverageGPA.push({ semester: (y - 1) * 2 + s, averageGPA: 0 });
		 } else {
		   const totalCredits = filteredData.reduce((sum, grade) => sum + grade.credit, 0);
		   const totalWeightedGPA = filteredData.reduce((sum, grade) => sum + grade.grade * grade.credit, 0);
		   const averageGPA = (totalWeightedGPA / totalCredits).toFixed(2);
 
		   semesterAverageGPA.push({ semester: (y - 1) * 2 + s, averageGPA: averageGPA });
		 }
	   }
	 }
 
	 return semesterAverageGPA;
   }
 
 </script>
 
 <!-- 학년 학기를 이동시키는 네비게이션 -->
 <!-- 버튼을 누르면 정보가 변합니다. -->
 <div class="container">
	<div align="center">
	   <form>
		  <div class="semester-navigation">
			 <button class="navBtn" on:click={() => move_semester(-1)}>&lt;</button>
			 <h1>{year}학년 {semester}학기</h1>
			 <button class="navBtn" on:click={() => move_semester(1)}>&gt;</button>
		  </div>
	   </form>
	</div>
 
	<!-- 학기 정보를 표로 제공합니다. -->
	<div class="graph-container">
	   <div class="left-rectangle">
 
	   </div>
 
	   <div class="right-rectangle">
		  <table role="grid">
			 <thead>
				<tr>
				   <th scope="col" style="background-color: #80809d;">구분</th>
				   <th scope="col" style="background-color: #80809d;">과목명</th>
				   <th scope="col" style="background-color: #80809d;">학점</th>
				   <th scope="col" style="background-color: #80809d;">등급</th>
				   <th scope="col" style="background-color: #80809d;">평점</th>
				   <th scope="col" style="width: 90px; background-color: #80809d;">수정</th>
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
							><button class="small-button" on:click={() => showEditGrade(grade)}>수정</button></td>
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
	   </div>
	</div>
 </div>
	<!-- 학기 요약 표 -->
	<div class="middle-rectangle">
	<div align="center">
	   <h1>{year}학년 {semester}학기 요약</h1>
	</div>
 
	<table role="grid">
	   <thead>
		  <tr>
			 <th style="background-color: #80809d;">교양 학점</th>
			 <th style="background-color: #80809d;">전공 학점</th>
			 <th style="background-color: #80809d;">취득학점</th>
			 <th style="background-color: #80809d;">평균학점</th>
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
	</div>
 
	<!-- 졸업 요건 정리 표 -->
	<div class="bottom-rectangle">
	<div align="center">
	   <h1>졸업 요건</h1>
	</div>
 
	<table>
	   <thead>
		  <tr>
			 <th style="background-color: #80809d;"/>
			 <th style="background-color: #80809d;">졸업학점</th>
			 <th style="background-color: #80809d;">교양학점</th>
			 <th style="background-color: #80809d;">전공학점</th>
			 <th style="background-color: #80809d;">잔여학점</th>
			 <th style="background-color: #80809d;">평균점수</th>
		  </tr>
	   </thead>
	   <tbody>
		  <tr>
			 <td style="background-color: #c2c2d0;">기준</td>
			 <td>{graduate_credit}</td>
			 <td rowspan="2">{summary.generalCredits}</td>
			 <td rowspan="2">{summary.majorCredits}</td>
			 <td rowspan="2">{summary.remainCredits}</td>
			 <td rowspan="2">{summary.averageGPA.toFixed(2)}</td>
		  </tr>
		  <tr>
			 <td style="background-color: #c2c2d0;">현재</td>
			 <td>{summary.totalCredits}</td>
		  </tr>
	   </tbody>
	</table>
 </div>
 
 
 <style>
	 .container {
		 display: flex;
		 flex-direction: column;
		 margin-top: -30px;
		 font-family: 'Arial', sans-serif;
	  }
	table {
	   width: 100%;
	   border-collapse: collapse;
	   margin-bottom: 20px;
	   
	}
	.semester-navigation h1 {
      color: white;
    }
	h1 {
	   font-size: 24px;
	   margin: 0 ;
	   white-space: nowrap;
	   margin-bottom: 20px;
	   /*text-decoration-color: #fff;*/
	}
	.navBtn{
	   border:none;
	   color:white;
	   background:none;
	   font-size:30px;
	   font-weight:bold;
	}
	.addButton{
	   border:none;
	   color:black;
	   background:none;
	   text-decoration: underline;
	}
	.graph-container {
	   display: flex;
	   width: 100%;
	   margin-top: 20px;
		 
	}
	.left-rectangle {
	   flex: 1;
	   margin-right: 20px;
	   padding: 20px;
	   background-color: #b6b6c0;
	   border-radius: 10px;
	   box-shadow: 7px 7px 7px 7px rgb(0,0,0, 0.5);
	}
	.right-rectangle {
	   flex: 1.6;
	   padding: 20px;
	   background-color: #b6b6c0;
	   border-radius: 10px;
	   box-shadow: 7px 7px 7px 7px rgb(0,0,0, 0.5);
	}
	.middle-rectangle{
	   margin-top:30px;
	   padding: 20px;
	   background-color: #b6b6c0;
	   border-radius: 10px;
	   box-shadow: 7px 7px 7px 7px rgb(0,0,0, 0.5);
	}
	.bottom-rectangle{
	   margin-top:30px;
	   padding: 20px;
	   background-color:#b6b6c0;
	   border-radius: 10px;
	   box-shadow: 7px 7px 7px 7px rgb(0,0,0, 0.5);
	}
 
	th,
	td {
	   border: 1px solid #ddd;
	   padding: 8px;
	   text-align: center;
	   position: relative;
	   font-size:13px;
	   color:black;
	}
	th{
	   background-color: #cacccc;
	   font-size:17px;
	   font-weight:bold;
	   
	}
	td{
	   background-color:#f8f8f8;
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
	   background:none;
	   border:none;
	   color:black;
	   text-decoration:underline;
	   
	}
	.semester-navigation {
	   display: flex;
	   align-items: center;
	   justify-content: space-between;
	   width: 25%;
	   margin-top: 20px;
	   gap: 10px;
	}

	.right-rectangle th,
	.right-rectangle td {
		border-color: #272737;
		background-color: rgb(229, 229, 236);
	}

	.middle-rectangle th,
	.middle-rectangle td {
		border-color: #272737;
		background-color: rgb(229, 229, 236);
	}

	.bottom-rectangle th,
	.bottom-rectangle td {
		border-color: #272737;
		background-color: rgb(229, 229, 236);
	}

	@media (max-width: 768px) {
  .graph-container {
    flex-direction: column; /* Stack items vertically on smaller screens */
  }

  .left-rectangle {
    max-width: 100%; /* Set max-width to 100% for smaller screens */
    margin-right: 0; /* Remove right margin on smaller screens */
    margin-bottom: 20px; /* Add bottom margin for spacing */
  }
}
 </style>