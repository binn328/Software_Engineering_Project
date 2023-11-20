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
        <input type="password" name="passwordConfirm"
        placeholder="비밀번호 확인" required>
        <button type="submit">가입하기</button>
    </form>
</article>

<style>
    article{/*회원가입 창 크기 조절*/
        width:70%;
        text-align: center;
        margin:0 auto;
        border-radius:20px;
      
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
</style>