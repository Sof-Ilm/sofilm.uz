<template>
	<article class="album-item">
		<button @click="fetchTracks()">
			<img src="https://via.placeholder.com/200" />
		</button>
		<h2 class="mt-3">
			<button @click="fetchTracks()">{{ album.title }}</button>
		</h2>
		<p class="mt-2 text-xs">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
		<small class="text-xs">Kecha</small>
	</article>
</template>

<script>
import { useStore } from 'vuex'

export default {
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
	width: 200px;
}
</style>
