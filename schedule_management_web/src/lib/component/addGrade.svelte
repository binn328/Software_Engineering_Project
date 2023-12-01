<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
 
	function close() {
	   dispatch('close');
	}
	export let componentData;
	const year = componentData.year;
	const semester = componentData.semester;
 </script>
 
 <div class="add-grade-modal">
	<form method="post" action="?/addGrade">
	   <h2>학점 추가하기</h2>
	   <label>
		  과목 이름
		  <input name="subject" type="text" required />
	   </label>
	   <label>
		  학점
		  <input name="credit" type="number" required min="1" max="6" />
	   </label>
	   <label>
		  구분
		  <select name="is_major" required>
			 <option value="true">전공</option>
			 <option value="false">교양</option>
		  </select>
	   </label>
	   <label>
		  학년
		  <input name="year" type="number" value={year} required min="1" max="6" />
	   </label>
	   <label>
		  학기
		  <input name="semester" type="number" value={semester} required min="1" max="2" />
	   </label>
	   <label>
		  점수
		  <input name="grade" type="number" required min="0.0" max="4.5" step="0.5" value="4.0" />
	   </label>
	   <div class="buttons">
		  <button type="submit" style="background-color: #34347c;">추가하기</button>
		  <button type="reset" on:click={close} style="background-color: #34347c;">닫기</button>
	   </div>
	</form>
 </div>
 
 <style>
	.add-grade-modal {
	   position: fixed;
	   top: 50%;
	   left: 50%;
	   transform: translate(-50%, -50%);
	   background-color: rgb(229, 229, 236);
	   width: 500px;
	   height: 700px;
	   overflow-y: auto; /* Add this line to enable vertical scrolling */
 
	   padding: 30px;
	   border-radius: 8px;
	   box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	   z-index: 1000;
	   color: black;
	}
 
	h2 {
	   text-align: center;
	   color: black;
	}
	label {
	   color: black; /* Set text color to black */
	}
	input, select {
		 background-color: white;
	 }
 </style>