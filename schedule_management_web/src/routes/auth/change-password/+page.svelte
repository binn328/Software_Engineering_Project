<script>
    export let data;
</script>

<div>
<article>
    <h1>비밀번호 변경</h1>
    <form method="post" action="?/updateUsers">
     <div class="centered">
        <input type="password" name="oldPassword"
        placeholder="현재 비밀번호" required>
        <input type="password" name="password"
        placeholder="새 비밀번호" required>
        <input type="password" name="passwordConfirm"
        placeholder="비밀번호 확인" required>
        <input name="id" type="text" value={data.profile?.id} hidden>
        <button type="submit" onclick="alert('비밀번호 변경 완료. 재 로그인 부탁드립니다.')">확인</button>

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
            max-width: 800px;
    }
    
    article{
        
        width:55%;
            margin:0 auto;
            text-align: center;
            padding:70px; /*로그인창 크기조절*/
            border-radius:20px;
            
        }
        button{
            background-color:rgb(52, 69, 126)
        }
    </style>