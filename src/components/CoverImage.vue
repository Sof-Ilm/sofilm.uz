<template>
	<div
		:class="['rounded bg-white bg-no-repeat bg-center', {'bg-img-podcast': !src}]"
		:style='{
			width: `${width}px`,
			height: `${height}px`,
			backgroundSize: "60%"
		}'>
		<div
			v-if="src"
			class="bg-no-repeat bg-center bg-cover rounded"
			:style='{
				width: `${width}px`,
				height: `${height}px`,
				backgroundImage: `url("${src}")`
			}'>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		src: String,
		width: Number,
		height: Number,
	},
}
</script>

<style scoped>
.bg-img-podcast {
	background-image: url('/src/assets/podcast.svg')
}
</style>
