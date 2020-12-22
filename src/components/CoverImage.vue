<template>
	<div
		class="rounded border bg-white bg-no-repeat bg-center"
		:style='{
			width: `${width+2}px`,
			height: `${height+2}px`,
			backgroundSize: "60%",
			backgroundImage: src ? "none" : `url("/@/assets/podcast.svg")`
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
