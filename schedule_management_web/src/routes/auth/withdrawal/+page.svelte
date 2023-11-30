<script>
    let showModal = false;

    function openModal() {
        showModal = true;
    }

    function goProfile(){
        window.location.href ='/auth/profile';
    }
    export let data;
   
</script>

<article>
    <form method="post">
    <h1>회원탈퇴 하시겠습니까?</h1>
    <div class="btn">
        <input name="id" type="text" value={data.profile?.id} hidden>
        <button type="submit" onclick="alert('탈퇴되었습니다.')" formaction="?/deleteUsers">예</button>
        <button type="button" on:click={goProfile}>아니오</button>
    </div>
</form>
</article>

{#if showModal}
<div class="modal">
    <div class="modal-content">
        <p>회원탈퇴되었습니다.</p>
    </div>
</div>
{/if}

<style>
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    h1{
        text-align:center;
    }

    .btn {
        display: flex;
        gap: 10px;
        justify-content: center;
       margin : 0 auto;
        width:25%;
    }

</style>