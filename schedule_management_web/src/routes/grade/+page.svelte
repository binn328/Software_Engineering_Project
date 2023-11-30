<script>

	import { onMount } from 'svelte';
	import * as d3 from 'd3';
   //학년 학기
	let semester = [
	  { year: 1, term: 1 },
	  { year: 1, term: 2 },
	  { year: 2, term: 1 },
	  { year: 2, term: 2 },
	  { year: 3, term: 1 },
	  { year: 3, term: 2 },
	  { year: 4, term: 1 },
	  { year: 4, term: 2 },
	  { year: 5, term: 1 },
	  { year: 5, term: 2 },
	  { year: 6, term: 1 },
	  { year: 6, term: 2 }
	];
   
	const maxTotalScore = 4.5;//최대 전체 평점
	const maxMajorScore = 4.5;//최대 전공평점
	const maxCredits = 130;//최대 취득학점
   
	let currentSemester = 0;//현재 학기
   
	let totalScore = 0;//전체 평점 담을 변수
	let majorScore = 0;//전공 평점 담을 변수
	let earnedCredits = 0;//입력된 
   
	let subjects = [];
   
 
   
	// 각 학기별로 subjects 배열을 관리. 8행 짜리 표 
	let semestersSubjects = Array.from({ length: semester.length }, () => [
	  { name: '', credits: '', grade: '', isMajor: false },
	  { name: '', credits: '', grade: '', isMajor: false },
	  { name: '', credits: '', grade: '', isMajor: false },
	  { name: '', credits: '', grade: '', isMajor: false },
	  { name: '', credits: '', grade: '', isMajor: false },
	  { name: '', credits: '', grade: '', isMajor: false },
	  { name: '', credits: '', grade: '', isMajor: false },
	  { name: '', credits: '', grade: '', isMajor: false }
	]);
   
	// 처음 페이지를 로드할 때 localStorage에서 데이터 로드
	loadSemestersSubjects();
   
	// 함수를 통해 사용자 입력을 처리
	function handleInput() {
	  calculateGPA();
	
	}
   
	// 함수를 통해 학기를 변경 매개변수값 1이면 다음학기, -1이면 이전학기
	function changeSemester(direction) {
	  // 현재학기<배열의길이 
	  if (direction === 1 && currentSemester < semester.length - 1) {
	   currentSemester += 1;
	  }
	  // 이전학기로 이동 : 현재학기에 적힌게 있으면
	  else if (direction === -1 && currentSemester > 0) {
	   currentSemester -= 1;
	  }
   //학기 변경 이후에 해당 학기의 과목을 가져옴
	  subjects = semestersSubjects[currentSemester];
	}
   
	// localStorage에서 데이터를 가져옴.
	function loadSemestersSubjects() {
	  const storedData = localStorage.getItem('semestersSubjects');
	  if (storedData) {
	   try {
		 const loadedData = JSON.parse(storedData);
		 semestersSubjects = loadedData;
	   } catch (error) {
		 console.error('Error loading data from localStorage:', error);
	   }
	  }
	  
	}
  //각 성적당 점수 
	function gradeToGPA(grade) {
	  switch (grade) {
	   case 'A+':
		 return 4.5;
	   case 'A':
		 return 4.0;
	   case 'B+':
		 return 3.5;
	   case 'B':
		 return 3.0;
	   case 'C+':
		 return 2.5;
	   case 'C':
		 return 2.0;
	   case 'D+':
		 return 1.5;
	   case 'D':
		 return 1.0;
	   case 'F':
		 return 0.0;
	   default:
		 return 0.0; // 알 수 없는 등급인 경우 0.0으로 처리
	  }
	}
   //전체평점/전공평점/취득학점 계산
	function calculateGPA() {
	 
	  totalScore = 0; //전체 평점
	  majorScore = 0; //전공 평점
	  earnedCredits = 0; // 전체 학점
	  let majorCredit = 0; // 전공 학점
   
	  // 전체학기 순회
	  for (let i = 0; i < semestersSubjects.length; i++) {
	   const semesterSubjects = semestersSubjects[i];
   
	   // 현재학기 각 과목에 대하여 아래 반복
	   semesterSubjects.forEach((subject) => {
		 const credits = parseFloat(subject.credits);
			 //학점과 성적이 유효하면 계산함
		 if (!isNaN(credits) && subject.grade.trim() !== '') {
		  
		  earnedCredits += credits;//전체 학점의 합
		  totalScore += gradeToGPA(subject.grade.toUpperCase()) * credits;
			//소문자로 입력받은 성적도 대문자로. 성적*학점
		  
		  if (subject.isMajor) {//전공 과목이면
			majorScore += gradeToGPA(subject.grade.toUpperCase()) * credits;
		   //소문자 입력받은 성적도 대문자로. 성적*학점
			majorCredit += credits; //전공의 학점 합 
		  }
		 }
	   });
	  }
   
	  
	  if (earnedCredits !== 0) {//입력 받은 학점이 있으면
	   totalScore /= earnedCredits;// 전체 평점
	  }
   
	  // 전공평점
	  if (majorCredit !== 0) {
	   majorScore /= majorCredit;
	  }
   
	drawLineGraph();//학기당 학점 그래프
	drawBarChart();//전체 성적의 백분율 그래프
	   
	}
	
	let svg;
	let svgBarChart;
	
	onMount(() => {//그래프 초기 설정
	 // LineGraph설정 :450x250 크기의 그래프.
	 svg = d3.select('.left-rectangle')//그래프가 위치할 클래스
	   .append('svg')
	   .attr('width', 450) 
	   .attr('height', 250) 
	   .style('border', '1px solid rgba(0,0,0,0.2)')
	  .style('border-radius', '10px');
 
	 drawLineGraph();
 
	//barChart설정 : 450x250크기의 그래프.
	svgBarChart = d3.select('.left-rectangle').append('svg')//그래프가 위치할 클래스. 이전의 svg 그래프 안지움
	   .attr('width', 450)  
	   .attr('height', 250)  
	  .style('border', '1px solid rgba(0,0,0,0.2)')
	   .style('border-radius', '10px');
   
	drawBarChart();
	});
 
   //학기당 성적 그래프
   function drawLineGraph() {//학기별 총 평점 계산
	  const totalGPAs = semestersSubjects.map((semesterSubjects) => {
	   let totalScore = 0;
	   let earnedCredits = 0;
	  //현재학기의 각 과목에 대하여 반복
	   semesterSubjects.forEach((subject) => {
		 const credits = parseFloat(subject.credits);//학점을 실수형으로 변환
		  //유효한 값만 사용 
		 if (!isNaN(credits) && subject.grade.trim() !== '') {
		  earnedCredits += credits;//해당 학기의 전체 학점
		  totalScore += gradeToGPA(subject.grade.toUpperCase()) * credits;
		 }//해당 학기의 성적*학점
	   });
   
	   return earnedCredits !== 0 ? totalScore / earnedCredits : 0;
	  }); //현재 입력된 전체 학점이 0이 아니면 해당 학기의 전체 평점 반환
   
	//svg의 너비 높이 마진 설정
	  const margin = { top: 10, right: 20, bottom: 20, left: 40 };
	  const width = 400 - margin.left - margin.right;
	  const height = 200 - margin.top - margin.bottom;
	  //x,y축 스케일 설정
	  const xScale = d3.scaleLinear().domain([0, totalGPAs.length - 1]).range([0, width]);
	  const yScale = d3.scaleLinear().domain([0, maxTotalScore]).range([height, 0]);
   //선 생성
	  const line = d3.line()
	   .x((d, i) => xScale(i))
	   .y((d) => yScale(d));
   
	//이전에 있던 선 제거
	  svg.selectAll('.line').remove();
	  
   
	  // 그래프의 값 속성 설정
	  svg.append('path')
	   .data([totalGPAs])
	   .attr('class', 'line')
	   .attr('d', line)
	   .attr('transform', `translate(${margin.left}, ${margin.top})`)
	   .style('fill', 'none')
	   .style('stroke', 'red');
  
   // Y축, 학점이 2.0, 3.0, 4.0 인 곳에 회색 선 
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
			.style('stroke', 'gray')
			.style('stroke-opacity', (d) => (d === 2.0 || d === 4.0) ? 1.0 : 0.2);
   
		 
			d3.select(this)
			.append('text')
			.attr('class', 'grid-label')
			.attr('x', width + margin.left + 5) 
			.attr('y', yScale(d.value) + margin.top)
			.attr('dy', 5)
			.style('fill', 'gray')
			.style('font-size','10px')
			.text(d.label);
	  });
   
   
   // X축 학년
   svg.selectAll('text.x-axis-label')
	  .data(semester)
	  .enter()
	  .append('text')
	  .attr('class', 'x-axis-label')
	  .attr('x', (d, i) => xScale(i) + margin.left)
	  .attr('y', height + margin.top + 20)
	  .attr('dy', 12)
	  .attr('text-anchor', 'middle')
	  .style('fill', 'black')
	  .style('font-size','10px')
	  .text((d) => `${d.year}학년`);
   //x축 학기
   svg.selectAll('text.x-axis-label2')
	  .data(semester)
	  .enter()
	  .append('text')
	  .attr('class', 'x-axis-label2')
	  .attr('x', (d, i) => xScale(i) + margin.left)
	  .attr('y', height + margin.top + 42) 
	  .attr('dy', 12)
	  .attr('text-anchor', 'middle')
	  .style('fill', 'black')
	  .style('font-size','10px')
	  .text((d) => `${d.term}학기`);
   
 
 }
 
   let gradeDistribution = [];
 
 //성적 비율 그래프
   function drawBarChart() {
	
	console.log('Start drawBarChart');
	 //데이터가 없거나 비면 종료
	 if (!semestersSubjects || semestersSubjects.length === 0) {
	   console.log('No data available for the bar chart');
	   return;
	 }
 //svgbarchart의 모든 요소 제거
	svgBarChart.selectAll('*').remove();
 
	 // 해당 성적 개수 
	 let gradeCounts = {
	   'A+': 0,
	   'A': 0,
	   'B+': 0,
	   'B': 0,
	   'C+': 0,
	   'C': 0,
	   'D+': 0,
	   'D': 0,
	   'F': 0
	 };
 
	//입력받은 성적 개수 
	 semestersSubjects.forEach(semesterSubjects => {//해당 학기
		semesterSubjects.forEach(subject => {//해당 과목
			 const grade = subject.grade.toUpperCase();
			 if (gradeCounts.hasOwnProperty(grade)) {
			   gradeCounts[grade]++; //각 성적의 개수 증가
			 }
		});
	});
 
	//각 성적당 개수와 퍼센트 계산 결과 저장
	 gradeDistribution = Object.keys(gradeCounts).map(grade => {
		return {
			grade: grade,
			count: gradeCounts[grade],
		  percentage: (gradeCounts[grade] / getTotalSubjectCount()) * 100
		};  
	
	 });
	console.log('Grade Distribution:', gradeDistribution);
  
	 //크기 조절   
	 const marginBarChart = { top: 30, right: 20, bottom: 20, left: 60 };
	 const widthBarChart = 400 - marginBarChart.left - marginBarChart.right;
	 const heightBarChart = 250 - marginBarChart.top - marginBarChart.bottom;
	  const yScaleBarChart = d3.scaleBand().domain(gradeDistribution.map(d => d.grade)).range([0, heightBarChart]).padding(0.1);
	  const xScaleBarChart = d3.scaleLinear().domain([0, 100]).range([0, widthBarChart]);
 
	const colorScale = d3.scaleOrdinal()
	 .domain(gradeDistribution.map(d => d.grade))
  //값의 색 설정
	 .range(['#1f78b4', '#33a02c', '#e31a1c', '#ff7f00', '#6a3d9a', '#fcbf61', '#cab2d0', '#aaa3bd', 'aac258']); 
 
 
   // 값의 속성
	 svgBarChart.selectAll('.bar') 
		.data(gradeDistribution)
		.enter().append('rect')
		.attr('class', 'bar')
		.attr('y', d => yScaleBarChart(d.grade) + marginBarChart.top+10)
		.attr('height', 0.2*yScaleBarChart.bandwidth())
		.attr('x', marginBarChart.left)
		.attr('width', d => xScaleBarChart(d.percentage))
	   .style('fill', d => colorScale(d.grade));
 
   // y축 : 성적
	  svgBarChart.selectAll('text.y-axis-label-bar-chart')
		.data(gradeDistribution)
		.enter()
		.append('text')
		.attr('class', 'y-axis-label-bar-chart')
		.attr('x', marginBarChart.left - 30)
		.attr('y', d => yScaleBarChart(d.grade) + marginBarChart.top + yScaleBarChart.bandwidth() / 2)
		.attr('dy', 5)
		.style('fill', 'black')
		.style('font-size', '10px')
		.text(d => d.grade);
 
   // x축: 비율
	  svgBarChart.selectAll('text.x-axis-label-bar-chart')
		.data([25, 50, 75, 100])
		.enter()
		.append('text')
		.attr('class', 'x-axis-label-bar-chart')
		.attr('x', d => xScaleBarChart(d) + marginBarChart.left)
		.attr('y', heightBarChart + marginBarChart.top + 12)
		.attr('text-anchor', 'middle')
		.style('fill', 'black')
		.style('font-size', '10px')
		.text(d => `${d}%`);
		 console.log('End drawBarChart');
	}
 
	function getTotalSubjectCount() {//전체 성적의 개수
	  return semestersSubjects.reduce((total, semesterSubjects) => {//전체 학기에서 비어있지 않은 성적 개수
		return total + semesterSubjects.filter(subject => subject.grade.trim() !== '').length;
	  }, 0);//전체 성적 개수 반환
	}
  </script>
   
   <div class="container">
	  <div class="semester-navigation">
		 <button on:click={() => changeSemester(-1)}>&lt;</button>
		 <h1>
			{semester[currentSemester].year}학년 {semester[currentSemester].term === 1 ? '1' : '2'}학기
		 </h1>
		 <button on:click={() => changeSemester(1)}>&gt;</button>
	  </div>
   
	  <hr/>
   
	  <div class="graph-container">
		 <div class="left-rectangle">
		  <p>전체 평점: {totalScore.toFixed(2)} <span class="max-value">/{maxTotalScore}</span></p>
		  <p>전공 평점: {majorScore.toFixed(2)} <span class="max-value">/{maxMajorScore}</span></p>
		  <p>취득 학점: {earnedCredits} <span class="max-value">/{maxCredits}</span></p>
		  <div class='bar-chart-container'></div>
		 </div>
		 
		 <div class="right-rectangle">
			<table>
			   <thead>
				  <tr>
					 <th>과목명</th>
					 <th>학점</th>
					 <th>성적</th>
					 <th>전공</th>
				  </tr>
			   </thead>
			   <tbody>
				  {#each semestersSubjects[currentSemester] as { name, credits, grade, isMajor }, index}
					 <tr>
						<td>
						 <input
							  bind:value={semestersSubjects[currentSemester][index].name}
							  on:input={handleInput}
						   /></td>
						<td>
						 <input
							  bind:value={semestersSubjects[currentSemester][index].credits}
							  on:input={handleInput}
						   /></td>
						<td>
						 <input
							  bind:value={semestersSubjects[currentSemester][index].grade}
							  on:input={handleInput}
						   /></td>
						<td>
						 <input
							  type="checkbox"
							  bind:checked={semestersSubjects[currentSemester][index].isMajor}
							  on:change={handleInput}
						   /></td>
					 </tr>
				  {/each}
			   </tbody>
			</table>
		 </div>
	  </div>
   </div>
   
   <style>
 
	  .container {
		 display: flex;
		 flex-direction: column;
		 align-items: center;
		 font-family: 'Arial', sans-serif;
	  }
   
	  .semester-navigation {
		 display: flex;
		 align-items: center;
		 justify-content: space-between;
		 width: 25%;
		 margin-top: 20px;
		 gap: 10px;
	  }
   
	  button {
		 padding: 8px;
		 font-size: 16px;
		 cursor: pointer;
		 background-color: #3498db;
		 color: #fff;
		 border: none;
		 border-radius: 5px;
	  }
   
	  h1 {
		 font-size: 24px;
		 margin: 0;
		 white-space: nowrap;
		 margin-bottom: 20px;
	  }
   
	  hr {
		 width: 80%;
		 margin: 20px;
		 border: 1px solid #ccc;
	  }
   
	  .graph-container {
		 display: flex;
		 width: 80%;
		 margin-top: 20px;
	  }
   
	  .left-rectangle {
		 flex: 2;
		 margin-right: 20px;
		 padding: 20px;
		 background-color: #ecf0f1;
		 border-radius: 10px;
	  }
   
	  .right-rectangle {
		 flex: 1.6;
		 padding: 20px;
		 background-color: #ecf0f1;
		 border-radius: 10px;
	  }
   
	  table {
		 width: 100%;
		 border-collapse: collapse;
		 margin-top: 10px;
	  }
   
	  th,
	  td {
		 padding: 10px 5px 0px;
		 border: 1px solid #ddd;
		 text-align: left;
	  }
   
	  th {
		 background-color: #3498db;
		 color: #fff;
	  }
   
	  tr:nth-child(even) {
		 background-color: #f2f2f2;
	  }
   
	  input {
		 width: calc(100%);
   
		 padding: 8px;
		 box-sizing: border-box;
		 font-size: 15px;
	  }
   
	  /* 각 열에 대한 너비 조정 */
	  th:nth-child(1),
	  td:nth-child(1) {
		 width: 55%;
	  }
   
	  th:nth-child(2),
	  td:nth-child(2),
	  th:nth-child(3),
	  td:nth-child(3) {
		 width: 15%;
	  }
   
	  th:nth-child(4),
	  td:nth-child(4) {
		 width: 15%;
	  }
   
	  .max-value {
		 color: gray;
		 font-size:16px;
	  }
   
   
   </style>
   