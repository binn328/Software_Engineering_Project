<script>
	// @ts-nocheck
	export let data;
	import NavBar from '$lib/component/navBar.svelte';

</script>

<body>
	<main class="container">
		<div>
			<NavBar {data} />
			
			<slot />
		</div>
	</main>
</body>

