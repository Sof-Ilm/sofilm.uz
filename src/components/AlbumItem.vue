<template>
	<article class="w-full sm:w-album sm:text-left">
		<div class="mx-auto w-album sm:w-full relative rounded border group">
			<CoverImage :width="200" :height="200" :src="album.cover" />

			<div class="w-full can-hover:absolute bottom-0 flex can-hover:opacity-0 group-hover:opacity-100">
				<button
					v-if="album.hasAudio"
					class="w-full py-3 first:rounded-bl last:rounded-br bg-white hover:text-gold border-r"
					@click="fetchTracks()">
					<AudioBookIcon class="w-full h-6" />
				</button>
				<button
					v-if="album.youtubePlaylistId"
					class="w-full py-3 first:rounded-bl last:rounded-br bg-white hover:text-gold"
					@click="fetchVideos()">
					<FilmRollIcon class="w-full h-6" />
				</button>
			</div>
		</div>

		<h3 class="mt-3 text-xl text-center sm:text-left truncate" :title="album.title">{{ album.title }}</h3>
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
				store.dispatch('audioPlayer/fetchTracks', {album: props.album})
			},
			fetchVideos () {
				store.dispatch('videoPlayer/fetchVideos', {album: props.album})
			},
		}
	}
}
</script>
