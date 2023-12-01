<script>
   // @ts-nocheck
   import { createEventDispatcher } from 'svelte';
   const dispatch = createEventDispatcher();

   function close() {
      dispatch('close');
   }

   export let goal;

   function convert_date(datetime) {
      console.log(datetime.split('T')[0]);
      return datetime.split(' ')[0];
   }
</script>

<div class="update-goal-modal">
   <form method="post" action="?/updateGoal">
      <h2>목표 수정</h2>
      <label>
         목표 이름
         <input name="goal_name" type="text" required value={goal.goal_name} />
      </label>
        <label
        >달성 여부
        <select name="is_complete" required value={goal.is_complete}>
            <option value="true">목표 달성</option>
            <option value="false">목표 미달성</option>
        </select>
    </label>
      <input name="id" type="text" value={goal.id} hidden />
      <div class="buttons">
         <button type="submit">수정하기</button>
         <button type="reset" on:click={close}>닫기</button>
      </div>
   </form>
</div>

<style>
   /* editGoal 컴포넌트에 대한 스타일 추가 */
   .update-goal-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      width: 500px;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      z-index: 1000;
   }
 
   .re-che {
      margin-left: 360px;
   }
 
   h2 {
      text-align: center;
   }
 
   /* Set the background color of input fields to white */
   .update-goal-modal input {
      background-color: white;
   }

   .update-goal-modal select {
      background-color: white;
   }
 
   .buttons button {
     padding: 10px;
     margin: 5px;
     border: none;
     cursor: pointer;
     border-radius: 5px;
     color: white; /* Text color */
   }
 
   button[type="submit"] {
      background-color: rgb(107, 107, 161); /* Green color for '수정하기' button */
   }
 
   button[type="reset"] {
      background-color: rgb(107, 107, 161); /* Red color for '닫기' button */
   }
 </style>
 