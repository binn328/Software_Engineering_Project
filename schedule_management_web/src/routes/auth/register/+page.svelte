<script>

</script>

<article>
    <h1>회원가입</h1>
    <form method="POST">
        <input type="name" name="name"
        placeholder="이름" required>
        <input type="email" name="email"
        placeholder="이메일" required>
        <input type="password" name="password"
        placeholder="비밀번호" required>
        <p>* 비밀번호는 8글자이상 입력</p>
        <input type="password" name="passwordConfirm"
        placeholder="비밀번호 확인" required>
        <button type="submit">가입하기</button>
    </form>
</article>

<style>
    article{/*회원가입 창 크기 조절*/
        width:70%;
       
        margin:0 auto;
        border-radius:20px;
        max-width: 800px;
 
      transition: background-color 0.3s ease;
      background-color: white;
      padding: 30px;
      box-shadow: 10px 10px 10px 10px rgb(0,0,0, 0.5);
      
    }
    button{
        background-color:rgb(52,69,126);
    }
    h1{
        text-align: center;
    }
   
    .centered{/*안에 내부 요소 조절*/
        margin:0 auto;
        width:80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px; /* 요소 간 간격 */
    }

p{
    font-size:13px;
}
</style>