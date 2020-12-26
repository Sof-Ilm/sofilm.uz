<template>
	<article class="w-full sm:w-album sm:text-left">
		<div class="mx-auto w-album sm:w-full relative rounded border group">
			<CoverImage :width="200" :height="200" :src="album.cover" />

			<div class="can-hover:absolute bottom-0 flex can-hover:opacity-0 group-hover:opacity-100">
				<button class="py-3 rounded-bl bg-white hover:text-gold border-r" @click="fetchTracks()">
					<AudioBookIcon class="w-full h-6" />
				</button>
				<button class="py-3 rounded-br bg-white hover:text-gold" @click="$emit('video-click')">
					<FilmRollIcon class="w-full h-6" />
				</button>
			</div>
		</div>

		<h2 class="mt-3">
			<button @click="fetchTracks()" class="w-full text-center sm:text-left truncate">{{ album.title }}</button>
		</h2>
	</article>
</template>

<script>
import { useStore } from 'vuex'
import CoverImage from '/@/components/CoverImage.vue'
import AudioBookIcon from '/@/components/icons/AudioBook.vue'
import FilmRollIcon from '/@/components/icons/FilmRoll.vue'

export default {
	components: {
		CoverImage,
		AudioBookIcon,
		FilmRollIcon,
	},
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
