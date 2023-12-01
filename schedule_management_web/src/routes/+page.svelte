<script>

	export let data;
	
	
	import {onMount} from 'svelte';
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
	"허물이 있다면 버리기를 두려워말라.",
	"노력에 집착하라. 숙명적인 노력을.",
	"강인한 의지 없이는 뛰어난 재능도 없다.",
	"나는 이룰 때까지 노력할 것이다.",
 
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
 
 <div>
	<h1>어서오세요! {data.profile?.name || ''}님 </h1>
	<div class="equl-line">
	   <h2 class="time">
		  {currentTime.toLocaleTimeString([],
		   { hour: '2-digit', minute: '2-digit', hour12:false })}
	
	   </h2>
	   <blockquote>
		  <p>{currentQuote}</p>
	   </blockquote>
	</div>
	<textarea bind:value={memo} placeholder="메모를 입력하세요. 새로고침시 내용이 사라집니다." rows="6" cols="30"></textarea>
	<button class ="btn" on:click={() => alert(developerContact)}>건의, 문의하기</button>
 </div>

 
 <style>
   
 
   h1{
	color:white;
   }
   p, h2 {
	
	 color: black;
   }
 
   .time{
	margin-top:100px;
   }
 
   .btn {
	 background: none;
	 color: black;
	 border: none;
	 text-decoration: underline;
	 font-size: 12px;
	 margin-top: 90px; 
	
   }
   textarea {
	 margin-top: 10px; /* 여백 조절 */
	 resize: none; /* 사용자가 크기를 조정하지 못하도록 함 */
	 font-size: 13px;
	background-color:rgb(8, 6, 133);
	opacity:0.4;
	color:white;
	border:none;
	
   }
 
   div {
	 max-width: 800px;
	 margin: 0 auto;
   }
 
   
 
  
 </style>