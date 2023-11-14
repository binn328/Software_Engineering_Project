<!--네비게이션 바 컴포넌트-->
<script>
	// @ts-nocheck
	export let data;
</script>

<nav>
	<!--타이틀-->
	<ul>
		<li><strong>Schedule Manager</strong></li>
	</ul>
	<!--네비게이션-->
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/schedule">Schedule</a></li>
		<li><a href="/calendar">Calendar</a></li>
		<li><a href="/grade">Grade</a></li>
		<li><a href="/todo">Todo</a></li>
		<li><a href="/timetable">TimeTable</a></li>
	</ul>
	<!--유저 정보-->
	<ul>
		{#if data?.profile}
			<!--로그인된 상태라면 유저 이름을 표시하고 logout을 표시-->
			<li>
				<details role="list" dir="rtl">
					<summary aria-haspopup="listbox" role="link" class="secondary"
						>{data.profile?.name}</summary
					>
					<ul role="listbox">
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
