<template>
	<div
		class="cover-placeholder"
		:style="{width: `${width}px`, height: `${height}px`}">
		<div
			v-if="src"
			class="img"
			:style="{
				width: `${width}px`,
				height: `${height}px`,
				backgroundImage: `url(${src})`
			}">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		src: String,
		width: Number,
		height: Number,
	}
}
</script>

<style scoped>
.cover-placeholder {
	background-color: white;
	background-image: url('../assets/podcast.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: 80%;

	.img {
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
	}
}
</style>
