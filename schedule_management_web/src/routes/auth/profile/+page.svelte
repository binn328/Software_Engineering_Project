<script>
    export let data;
</script>

<article>
        <h1>개인 정보</h1>

         <div class="centered">
            
           <h3> {data.profile?.name}</h3>
           <h3>{data.profile?.email}</h3>
            <div class="btnCP">
                <a role="button" href="/auth/change-password">비밀번호 변경</a>
            
                <a role="button" href="/auth/withdrawal">회원탈퇴</a>
            </div>
        </div>
</article>

<style>
    article{
        max-width: 800px;
      margin: 20px auto;
      font-family: 'Arial', sans-serif;
      transition: background-color 0.3s ease;
      background-color: white;
      padding: 30px;
      box-shadow: 10px 10px 10px 10px rgb(0,0,0, 0.5);
    }
    a{
    
        background-color:rgb(52, 69, 126);
    }
</style>