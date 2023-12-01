<script>
   
    export let onSelectCategory;
  export let data;
  const todoList = data.todoList;
  

  </script>
  
  <div class="category-modal">
    <ul>
      {#each todoList as todolist}
        <li role="button" on:click={() => onSelectCategory(todolist.category)}>{todolist.category}</li>
      {/each}
    </ul>
   
  </div>
  
  <style>
    .category-modal {
        position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      
      padding: 20px;
      border: 1px solid #ccc;
      z-index: 999; 
      padding: 30px;
	  border-radius: 8px;
	  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
      width:300px;
   
    }
    li{
        background-color: transparent; /* Remove background color */
        border: none;
        color:black;
        text-decoration: underline;
    }
   
    
   
    
  </style>
  