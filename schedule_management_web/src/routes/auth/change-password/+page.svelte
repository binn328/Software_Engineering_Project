<script>
    
</script>

<div>
<article>
    <h1>비밀번호 변경</h1>
    <form method="POST" >
     <div class="centered">
        
        <input type="password" name="password"
        placeholder="현재 비밀번호" required>
        <input type="password" name="newPassword"
        placeholder="새 비밀번호" required>
        <input type="password" name="passwordConfirm"
        placeholder="비밀번호 확인" required>
        <button type="submit">확인</button>

    </div>
    </form>
</article>

</div>

<style>
    div{
        margin:5% auto;
            width: 100%;
            height: 100%;
            display:block;
            justify-content: center;
            align-items: center;
    }
    
    article{
        
        width:55%;
            margin:0 auto;
            text-align: center;
            padding:70px; /*로그인창 크기조절*/
            border-radius:20px;
            
        }
    </style>