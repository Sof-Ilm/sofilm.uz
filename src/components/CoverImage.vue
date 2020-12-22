<template>
	<div
		class="cover-placeholder rounded border bg-white bg-no-repeat bg-center"
		:style="{width: `${width}px`, height: `${height}px`}">
		<div
			v-if="src"
			class="bg-no-repeat bg-center bg-cover"
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
.cover-placeholder {
	background-image: url('../assets/podcast.svg');
	background-size: 80%;
}
</style>
