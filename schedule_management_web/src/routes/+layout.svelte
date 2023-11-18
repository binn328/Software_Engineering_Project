<script>
  // 토스트 메시지 컨테이너 배치
  import { SvelteToast, toast } from '@zerodevx/svelte-toast'

  // 토스트 메시지 옵션
  const options = {
    duration: 10000
  }
  export let data;
 
  //여기부터 추가함
  let isMenuOpen = false;
  //let isCalendarOpen = false;


  function openMenu(){
    isMenuOpen=true;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
 
  $: {
    if (isMenuOpen) {
      // Perform actions when the menu is opened, if needed
    }
  }

//여까지
</script>

<div class="container">
    <nav>
      <ul>
      <li><a href="/" style="color:blue; font-weight: bold; font-size: 2rem">SMW</a></li>
      
    </ul>
    <ul>
      {#if data?.profile}
      <li>
        <form action="/logout" method="post">
            <button on:click={() => toast.push("로그아웃했습니다.")}>로그아웃</button>
        </form>
      </li>
      {:else}
      <li><a href="/auth/login">로그인</a></li>
      <li><a href="/auth/register">회원가입</a></li>

      {/if}
    </ul>
  </nav>
  <slot />

</div>


<button class="menu-button" on:click={openMenu}></button>


{#if isMenuOpen}
  <div class="menu-bar show" on:click={closeMenu}>
    <!-- 메뉴 목록 -->
    <a href="/auth/profile" class="menu-item">개인정보</a>
    <a href="/schedule" class="menu-item">스케쥴</a>
    <a href="/calendar" class="menu-item">캘린더</a>
    <a href="/grade" class="menu-item">학점</a>
    <a href="todo" class="menu-item">해야할 일</a>
    <a href="/timetable" class="menu-item">시간표</a>
  </div>
{/if}

<!--{#if isCalendarOpen}
  <a href="/calendar" class="menu-item">캘린더</a>
{/if}-->


<style>


  .menu-button {
    background: url('menu.png') no-repeat center center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-size:100% 100%;

    position: fixed; /* 고정 위치로 설정 */
    top: 20px; /* 원하는 상단 여백으로 설정 */
    left: 20px; /* 원하는 왼쪽 여백으로 설정 */
    /*z-index: 2;*/ /* 다른 요소 위에 표시 */
  }
/*메뉴바 목록 창*/
  .menu-bar {
    display: flex;
    flex-direction: column;
    background-color: #333;
    color: #FFF;
    width: 0;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.3s;
    z-index: 1;
    overflow-x: hidden;
  }
 /*메뉴바 글자 배치-위/왼*/
  .menu-bar.show {
    width: 250px;
    padding:150px 20px;

    
    
 }
 .menu-item{
  margin-top:10px;
    color:rgb(255, 255, 255,0.7);
 }
</style>

<SvelteToast {options} />