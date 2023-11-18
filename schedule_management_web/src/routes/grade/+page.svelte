<script>

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
      { year: 6, term: 2 },
    ];
  
    const maxTotalScore = 4.5;
    const maxMajorScore = 4.5;
    const maxCredits = 130;
  
    let currentSemester = 0;
  
    let totalScore = 0;
    let majorScore = 0;
    let earnedCredits = 0;
  
    let subjects=[];
  
    let majorGPA=0;
    let totalCredits=0;
  
    // 각 학기별로 subjects 배열을 관리
    let semestersSubjects = Array.from({ length: semester.length }, () => [
      { name: "", credits: "", grade: "", isMajor: false },
      { name: "", credits: "", grade: "", isMajor: false },
      { name: "", credits: "", grade: "", isMajor: false },
      { name: "", credits: "", grade: "", isMajor: false },
      { name: "", credits: "", grade: "", isMajor: false },
      { name: "", credits: "", grade: "", isMajor: false },
      { name: "", credits: "", grade: "", isMajor: false },
      { name: "", credits: "", grade: "", isMajor: false },
    ]);
  
    // 처음 페이지를 로드할 때 localStorage에서 데이터 로드
    loadSemestersSubjects();
  
    // 함수를 통해 사용자 입력을 처리
    function handleInput() {
      // 입력을 처리하는 로직 추가
      calculateGPA();
    }
  
    // 함수를 통해 학기를 변경
    function changeSemester(direction) {
      // 다음 학기로 이동
      if (direction === 1 && currentSemester < semester.length - 1) {
        currentSemester += 1;
      }
      // 이전 학기로 이동
      else if (direction === -1 && currentSemester > 0) {
        currentSemester -= 1;
      }
  
      subjects=semestersSubjects[currentSemester];
    }
  
    // localStorage에서 데이터를 로드하는 함수
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
      // 현재 학기에 해당하는 subjects 배열 선택
      //subjects = semestersSubjects[currentSemester];
    }
  
    // localStorage에 데이터를 저장하는 함수
    function saveSemestersSubjects() {
      
      localStorage.setItem('semestersSubjects', JSON.stringify(semestersSubjects));
    }
  
    // 현재 학기에 해당하는 데이터로 업데이트 및 localStorage에 저장
    function updateSemesterData() {
      const { year, term } = semester[currentSemester];
      // 현재 학기에 해당하는 subjects 배열 선택
      subjects = semestersSubjects[currentSemester];
  
      
      subjects.forEach(subject => {
        subject.name = "";//과목명
        subject.credits = "";//학점
        subject.grade = "";//성적
        subject.isMajor = false; //전공
      });
  
      // localStorage에 데이터 저장
      saveSemestersSubjects();
    }
  
  
    //=====================================================
  
  
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
  
  
  
    function calculateGPA() {//학점계산
    totalScore = 0;
    majorScore = 0;
    earnedCredits = 0;
    let majorCredit=0;
  
    subjects = semestersSubjects[currentSemester];
    subjects.forEach(subject => {
       // subject.credits = "";//학점
        //subject.grade = "";//성적
      const credits = parseFloat(subject.credits);
    
      if(!isNaN(credits)){
      // 취득학점 더하기
      earnedCredits += credits;
  
      // 성적이 입력된 경우에만 계산
      if (subject.grade.trim() !== "") {
        // 성적을 대문자로 변환
        const grade = subject.grade.toUpperCase();
  
        // 전체 평점 계산
        totalScore += gradeToGPA(grade) * credits;
        // 전공 평점 계산 (전공 과목인 경우)
        if (subject.isMajor) {
          majorScore += gradeToGPA(grade) * credits;
          majorCredit+=credits;
         }
        }
        
      }
    });
  if(earnedCredits!==0){
    totalScore/=earnedCredits;
  }
  
  if(majorCredit!==0){
    majorScore/=majorCredit;
  }
  }
  
   
  
  
  
  </script>
  
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
      gap:10px;
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
      border-collapse:collapse;
      margin-top: 10px;
    }
  
    th, td {
      padding:10px 5px 0px;
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
      font-size:15px;
    }
  
    /* 각 열에 대한 너비 조정 */
    th:nth-child(1), td:nth-child(1) {
      width: 55%;
    }
  
    th:nth-child(2), td:nth-child(2), th:nth-child(3), td:nth-child(3) {
      width: 15%;
    }
  
    th:nth-child(4), td:nth-child(4) {
      width: 15%;
    }
  </style>
  
  <div class="container">
    <div class="semester-navigation">
      <button on:click={() => changeSemester(-1)}>&lt;</button>
      <h1>{semester[currentSemester].year}학년 {semester[currentSemester].term === 1 ? '1' : '2'}학기</h1>
      <button on:click={() => changeSemester(1)}>&gt;</button>
    </div>
  
    <hr />
  
    <div class="graph-container">
      <div class="left-rectangle">
        <p>전체 평점: {totalScore.toFixed(2)}</p>
        <p>전공 평점: {majorScore.toFixed(2)}</p>
        <p>취득 학점: {earnedCredits}</p>
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
                <td><input bind:value={semestersSubjects[currentSemester][index].name} on:input={handleInput} /></td>
                <td><input bind:value={semestersSubjects[currentSemester][index].credits} on:input={handleInput} /></td>
                <td><input bind:value={semestersSubjects[currentSemester][index].grade} on:input={handleInput} /></td>
                <td><input type="checkbox" bind:checked={semestersSubjects[currentSemester][index].isMajor} on:change={handleInput} /></td>
              </tr>
            {/each}
          </tbody>
  
        </table>
      </div>
    </div>
  </div>