<template>
	<article class="album-item text-center sm:text-left">
		<button @click="fetchTracks()">
			<CoverImage :width="200" :height="200" :src="album.cover" />
		</button>
		<h2 class="mt-3">
			<button @click="fetchTracks()" class="w-full text-center sm:text-left truncate">{{ album.title }}</button>
		</h2>
	</article>
</template>

<script>
import { useStore } from 'vuex'
import CoverImage from '/@/components/CoverImage.vue'

export default {
	components: {CoverImage},
	props: {
		album: Object
	},
	setup (props) {
		const store = useStore()

		return {
			fetchTracks () {
				store.dispatch('player/fetchTracks', {album: props.album})
			}
		}
	}
}
</script>

<style scoped>
.album-item {
	width: 90vw;

	@screen sm {
		width: 200px;
	}
}
</style>
