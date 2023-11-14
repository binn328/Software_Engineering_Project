<script>
	// @ts-nocheck

	import NavBar from '$lib/component/navBar.svelte';
</script>

<body>
	<main class="container">
		<div>
			<NavBar />
		</div>
		<div>
			<slot />
		</div>
	</main>
</body>
