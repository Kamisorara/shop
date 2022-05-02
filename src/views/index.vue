<template>
	<div class="home">
		<top></top>
	</div>
</template>

<script>
	// @ is an alias to /src
	import top from "@/components/top.vue";

	export default {
		name: "HomeView",
		components: {
			top,
		},
	};
</script>
