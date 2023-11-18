<script>
	// @ts-nocheck
	export let data;
	import NavBar from '$lib/component/navBar.svelte';
  // 토스트 메시지 컨테이너 배치
  import { SvelteToast, toast } from '@zerodevx/svelte-toast'

  // 토스트 메시지 옵션
  const options = {
    duration: 10000
  }
 
  let isMenuOpen = false;
  let isCalendarOpen=false;


  function openMenu(){
    isMenuOpen=true;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function openCalendar(){
    isCalendar=true;
    isMenuOpen =false; //close the menu whenthe calendar is opend
  }
 

</script>

<div class="container">
    <nav>
      <ul>
      <li><a href="/" style="color:blue; font-weight: bold; font-size: 2rem">SMW</a></li>
     </ul>
    <ul>
      {#if data?.profile}
      <li>
        <form action="/auth/logout" method="post">
            <button>로그아웃</button>
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
