<template>
	<div id="audio-player" style="touch-action: none">
		<Playlist
			v-if="playlistVisible"
			:album="album"
			:tracks="tracks"
			:current-track="currentTrack"
			@track-click="playTrack($event.id)"
			@close-click="togglePlaylist()" />

		<audio class="w-full" crossorigin="anonymous" controls></audio>

		<div class="flex justify-between px-4 sm:px-8 bg-gray-100">
			<div class="flex flex-col sm:flex-row justify-center sm:items-center h-32 sm:h-20">
				<Controls
					:is-playing="isPlaying"
					:playlist-visible="playlistVisible"
					:prev="prevAvailable"
					:next="nextAvailable"
					@prev-click="prevTrack()"
					@next-click="nextTrack()"
					@play-toggle-click="togglePlayback()"
					@playlist-click="togglePlaylist" />

				<div v-if="currentTrack" class="order-first sm:order-none sm:block mb-5 sm:mb-0 sm:ml-20 max-w-lg">
					<h5 class="truncate text-lg">{{ currentTrack.title }}</h5>
					<h6 class="text-sm text-gray-500">{{ album.title }}</h6>
				</div>
			</div>

			<ShareButton
				class="self-end sm:self-auto mb-6 sm:mb-0"
	 			:album="album"
				:track="currentTrack"
			/>
		</div>
	</div>
</template>

<script>
import Plyr from 'plyr/dist/plyr.polyfilled'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'
import Playlist from './playlist.vue'
import Controls from './controls.vue'
import ShareButton from './share-button.vue'

let player = {}

export default {
	name: 'AudioPlayer',
	components: {
		Playlist,
		Controls,
		ShareButton,
	},
	setup () {
		const store = useStore()
		const route = useRoute()
		const playlistVisible = ref(true)
		const currentTrack = ref(null)

		const tracks = computed(() => store.state.audioPlayer.playlist)
		let isPlaying = ref(false)
		let prevAvailable = ref(false)
		let nextAvailable = ref(false)

		const playTrack = async (trackId) => {
			const index = tracks.value.findIndex(({ id }) => id === trackId)
			if (index === -1) {
				return
			}

			const track = tracks.value[index]

			player.source = {
				type: 'audio',
				title: track.title,
				sources: [
					{type: 'audio/mp3', src: track.url}
				]
			}

			prevAvailable.value = tracks.value.length && index > 0
			nextAvailable.value = index < tracks.value.length - 1
			currentTrack.value = {
				index,
				id: track.id,
				title: track.title,
			}

			try {
				await player.play()
			}
			catch (err) {
				// autoplay might be not allowed,
				// otherwise, log if different error
				if (err.name !== 'NotAllowedError') {
					console.error(err)
				}
			}
		}
		const togglePlayback = () => {
			player.togglePlay()
		}
		const togglePlaylist = () => {
			playlistVisible.value = !playlistVisible.value
		}

		watch(() => store.state.videoPlayer.album, videoAlbum => {
			if (videoAlbum) {
				player.pause()
			}
		})

		onMounted(() => {
			player = new Plyr('#audio-player audio', {
				controls: ['progress']
			})
			player.on('play', () => {
				isPlaying.value = true
			})
			player.on('pause', () => {
				isPlaying.value = false
			})

			const trackQuery = route.query.track

			if (trackQuery && trackQuery.includes('/')) {
				const trackId = trackQuery.split('/')[1]
				
				if (trackId) {
					playTrack(trackId)
				}
				else if (tracks.value.length) {
					playTrack(tracks.value[0].id)
				}
			}
			else {
				playTrack(tracks.value[0].id)
			}

			watch(tracks, val => {
				if (val.length) {
					playlistVisible.value = true
					playTrack(val[0].id)
				}
			})
		})

		return {
			album: computed(() => store.state.audioPlayer.album),
			tracks,
			playlistVisible,
			currentTrack,
			isPlaying,
			prevAvailable,
			nextAvailable,

			prevTrack: () => playTrack(tracks.value[currentTrack.value.index - 1].id),
			nextTrack: () => playTrack(tracks.value[currentTrack.value.index + 1].id),
			playTrack,
			togglePlaylist,
			togglePlayback,
		}
	}
}
</script>
