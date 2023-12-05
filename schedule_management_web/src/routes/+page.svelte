<script>
   // OpenWeatherMap API 키
   const apiKey = 'ed2adea1d24739afea0d77901fce3bcf';
   
   let location = null; // 현재 위치의 지역 이름
   let temperature = null;
   let description = null;
   
   // 페이지 로드 시 자동으로 날씨 정보 가져오기
   import { onMount } from 'svelte';
   onMount(getWeather);
   
   async function getWeather() {
     let apiUrl;
   
     // 사용자의 현재 위치를 가져옴
     try {
      const position = await getCurrentPosition();
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
     } catch (error) {
      console.error('현재 위치를 가져오는 중 에러 발생:', error);
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${apiKey}`;
     }
   
     try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // 켈빈에서 섭씨로 변환
      temperature = (data.main.temp - 273.15).toFixed(2);
      description = data.weather[0].description;
   
      if (location === null && data.name) {
       location = data.name; // 현재 위치의 지역 이름으로 업데이트
      }
     } catch (error) {
      console.error('날씨 정보를 가져오는 중 에러 발생:', error);
      location = null;
      temperature = null;
      description = '날씨 정보를 가져오는 중 에러가 발생했습니다.';
     }
   }
   
   // 사용자의 현재 위치를 가져오는 함수
   function getCurrentPosition() {
     return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
     });
   }
 
 
   export let data;
   
   let currentTime = new Date();
  
   function updateCurrentTime() {
    currentTime = new Date();
   }
  
   // 1초마다 현재 시각 업데이트
   setInterval(updateCurrentTime, 1000);
   let quotes = [
    "삶이 있는 한 희망은 있다.",
    "하루에 하나씩 작은 행복을 찾아보세요.",
    "끝까지 하지 않으면 아무 것도 끝난 것이 아니다.",
    "노력하는 사람에겐 결코 좌절이란 없다.",
    "꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다",
   "내일이란 오늘의 다른 이름일 뿐이다.",
   "마음만을 가지고 있어서는 안 된다. 반드시 실천하여야 한다.",
   "건강에 대한 지나친 걱정만큼 건강에 치명적인 것은 없다.",
   "오늘이란 신어야 할 신발과 같은 것이다.",
   "하루에 3시간을 걸으면 7년 후에 지구를 한 바퀴 돌 수 있다.",
   "행복하게 여행하려면 가볍게 여행해야 한다.",
   "인생은 과감한 모험이던가, 아니면 아무 것도 아니다.",
   "허물이 있다면 버리기를 두려워말라."
  
   ];
  
  
   let currentQuote = getRandomQuote();
  
   function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
   }
  
   onMount(() => {
    const interval = setInterval(() => {
      currentQuote = getRandomQuote();
    }, 4000);
  
    // 컴포넌트가 파괴되기 전에 setInterval 정리
    return () => clearInterval(interval);
   });
   
   const developerContact="개발자의 연락처에요. \ndeveloper@gmail.com";
   
   let memo = "";
 
</script>
   
<style>
   .content {
   display: flex;
   flex-direction: column;
   max-width: 900px;
   margin: 0 auto;
   }
   
   .equl-line {
   display: flex;
   flex-direction: row; /* Change to row to display horizontally */
   justify-content: space-between;
   width: 100%;
   margin-top: 30px;
   }
   
   .box {
   text-align: left;
   }
   
   .time-box {
   margin-right: 20px; /* Adjust the spacing between time and weather */
   }

   .time{
      font-size: 70px;
      margin: 0;
   }
   
   .weather-box {
   flex-grow: 1; /* Allow the weather box to take remaining space */
   }
   
   main {
   text-align: right;
   }
   main p{
      font-size: 25px;
      margin-bottom: 20px;
   }
   
   textarea {
   margin-top: 10px;
   resize: none;
   font-size: 13px;
   background-color: rgb(8, 6, 133);
   opacity: 0.4;
   color: white;
   border: none;
   }
   
   .btn {
   background: none;
   color: black;
   border: none;
   text-decoration: underline;
   font-size: 12px;
   margin-top: 10px;
   }
   h1{
      color: white;
   }
   


</style>
   
   
   <div class="content">
      <h1>어서오세요! {data.profile?.name || ''} 님</h1>
      <div class="equl-line">
      <div class="box time-box">
         <p style="font-size: 33px; margin: 0">{currentTime.toLocaleDateString()}</p>
        <h2 class="time">
         {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </h2>
      </div>
      <div class="box weather-box">
        <main>
         {#if location !== null}
           <p>현재 위치: {location}</p>
         {/if}
        
         {#if temperature !== null}
           <p>온도: {temperature} °C</p>
           <p>날씨 상태: {description}</p>
         {/if}
        </main>
      </div>
     </div>
     
      <blockquote>
       <p>{currentQuote}</p>
      </blockquote>
      <textarea bind:value={memo} placeholder="메모를 입력하세요. 새로고침시 내용이 사라집니다." rows="6" cols="30"></textarea>
      <button class="btn" on:click={() => alert(developerContact)}>건의, 문의하기</button>
     </div>
     