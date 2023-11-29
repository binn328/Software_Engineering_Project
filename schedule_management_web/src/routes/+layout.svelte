<script>
	// @ts-nocheck
	export let data;
	import NavBar from '$lib/component/navBar.svelte';

</script>

<body>
	<main class="container">
		<div>
			<NavBar {data} />
			
		
		</div>
		<a href="/test"> test</a>
		<div>
			<slot />
		</div>
	</main>
</body>

