<!--네비게이션 바 컴포넌트-->
<script>
   // @ts-nocheck
   export let data;
</script>

<div class="background-box"></div>

<div class="container">
   <nav>
      <!--타이틀-->
      <ul>
         <li><a href="/">Schedule Management</a></li>
      </ul>
      <!--네비게이션-->
      <ul>
         <li><a href="/schedule">Schedule</a></li>
         <li><a href="/calendar">Calendar</a></li>
         <li><a href="/grade">Grade</a></li>
         <li><a href="/todo">Todo</a></li>
         <li><a href="/timetable">TimeTable</a></li>
      </ul>
      <!--유저 정보-->
      <ul >
         {#if data?.profile}
            <!--로그인된 상태라면 유저 이름을 표시하고 logout을 표시-->
            <li>
               <details role="list" dir="rtl">
                  <summary aria-haspopup="listbox" role="link" class="secondary"
                     >{data.profile?.name}</summary
                  >
                  <ul role="listbox">
                     <li><a href='/auth/profile'>profile</a></li>
                     <li><a href="/auth/logout">logout</a></li>
                  </ul>
               </details>
            </li>
         {:else}
            <!--그렇지 않으면 이름을 visitor로 표현하고 로그인과 회원가입을 표시-->
            <li>
               <details role="list" dir="rtl">
                  <summary aria-haspopup="listbox" role="link" class="secondary">visitor</summary>
                  <ul role="listbox">
                     <li><a href="/auth/login">login</a></li>
                     <li><a href="/auth/register">register</a></li>
                  </ul>
               </details>
            </li>
         {/if}
      </ul>
   </nav>

   <!-- Rectangular box -->
   <div class="rectangular-box"></div>
</div>

<style>
   .container {
      /*position: relative;*/
      margin: 0;
      padding: 0;
   }

   nav {
      top: -70px;
      padding: 10px; /* 원하는 여백 설정 */
      position: relative;
      z-index: 1; /* Ensure the navigation bar is above other elements */
   }

   ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
   }
   .secondary{
      color:white;
   }

   li {
      display: inline-block;
      margin-right: 15px;
   }

   a {
      text-decoration: none;
      color: white;  /*원하는 글자색으로 변경 */
   }
   

   /* 추가적인 스타일을 적용할 수 있습니다. */
   .rectangular-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 300px;
      background-color: #272737;
      z-index: -1;
      padding: 100px;
   }

   .background-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ebe9e9;
        z-index: -1; 
    }

</style>