<!-- src/components/ShareSchedule.svelte -->

<script>
    import { createEventDispatcher } from 'svelte';
  
    let friends = [
      { id: 1, name: '친구1' },
      { id: 2, name: '친구2' },
      { id: 3, name: '친구3' },
      // Add more friends as needed
    ];
  
    let selectedFriends = [];
  
    const dispatch = createEventDispatcher();
  
    function toggleFriendSelection(id) {
      const index = selectedFriends.indexOf(id);
      if (index === -1) {
        selectedFriends = [...selectedFriends, id];
      } else {
        selectedFriends = selectedFriends.filter((friendId) => friendId !== id);
      }
    }
  
    function shareSchedule() {
      const selectedFriendNames = friends
        .filter((friend) => selectedFriends.includes(friend.id))
        .map((friend) => friend.name);
  
      // Dispatch the selected friend names to the parent component
      dispatch('share', selectedFriendNames);
  
      // Reset the selected friends
      selectedFriends = [];

    }

function close(){
    dispatch('close');
}
  </script>
  
  <style>
    /* ShareSchedule 컴포넌트에 대한 스타일 추가 */
    .share-schedule-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      width: 450px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .friends-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  
    .friend-list-container {
      width: 48%;
    }
  
    .friends-list {
      list-style: none;
      padding: 0;
      max-height: 150px;
      overflow-y: auto;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    .friend {
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  
    .selected {
      background-color: #f0f0f0;
    }
  
    .title {
      font-weight: bold;
      margin-bottom: 8px;
    }
    button{
        width:150px;
        margin-top:20px;
       margin-right:8px;
    }
  </style>
  
  <div class="share-schedule-modal">
    <h2>일정 공유하기</h2>
    <div class="friends-container">
      <div class="friend-list-container">
        <p class="title">친구목록</p>
        <div class="friends-list">
          {#each friends as { id, name }}
            <li class:friend={selectedFriends.includes(id)} on:click={() => toggleFriendSelection(id)}>
              {name}
            </li>
          {/each}
        </div>
      </div>
      <div class="friend-list-container">
        <p class="title">공유할 친구</p>
        {#if selectedFriends.length === 0}
          <p>친구를 선택하세요.</p>
        {:else}
          <ul class="friends-list">
            {#each selectedFriends as friendId}
              <li>{friends.find((friend) => friend.id === friendId).name}</li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
    <div class="buttons">
      <button on:click={shareSchedule}>공유하기</button>
      <button on:click={close}>취소</button>
    </div>
  </div>
  