<script>
	export let form;
</script>

<div>
	<article>
		<h1>로그인</h1>
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
		<form method="POST">
			<input type="email" name="email" placeholder="이메일" required />
			<input type="password" name="password" placeholder="비밀번호" required />
			<button type="submit">로그인</button>
		</form>
	</article>
</div>

<style>
    .text-register {
        margin-left: 35px;
    }

    div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    article {
        width: 55%;
        margin: 10px auto;
        text-align: center;
        padding: 70px; /* Adjust the login window size */
        border-radius: 20px;
    }

    p {
        margin-top: 30px;
    }

    .error {
        color: red;
    }
</style>