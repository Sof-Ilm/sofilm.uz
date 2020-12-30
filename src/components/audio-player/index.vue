<template>
	<div id="audio-player">
		<Playlist
			v-if="playlistVisible"
			:album="album"
			:tracks="tracks"
			:current-track="currentTrack"
			@track-click="playTrack($event)" />

		<audio class="w-full" crossorigin="anonymous" controls></audio>

		<div class="flex justify-between px-4 sm:px-8 bg-gray-100">
			<div class="flex flex-col sm:flex-row justify-center sm:items-center h-32 sm:h-20">
				<Controls
					:is-playing="isPlaying"
					:playlist-visible="playlistVisible"
					:prev="prevAvailable"
					:next="nextAvailable"
					@prev-click="prevTrack"
					@next-click="nextTrack"
					@play-toggle-click="togglePlayback"
					@playlist-click="togglePlaylist" />

				<div v-if="currentTrack" class="order-first sm:order-none sm:block mb-5 sm:mb-0 sm:ml-20 max-w-lg">
					<h5 class="truncate text-lg">{{ currentTrack.title }}</h5>
					<h6 class="text-sm text-gray-500">{{ album.title }}</h6>
				</div>
			</div>

			<VolumeControl class="self-end sm:self-auto mb-6 sm:mb-0" />
		</div>
	</div>
</template>

<script>
import Plyr from 'plyr/dist/plyr.polyfilled'
import { useStore } from 'vuex'
import { ref, computed, watch, onMounted } from 'vue'
import Playlist from './playlist.vue'
import Controls from './controls.vue'
import VolumeControl from './volume-control.vue'

let player = {}

export default {
	name: 'AudioPlayer',
	components: {
		Playlist,
		Controls,
		VolumeControl,
	},
	setup (props) {
		const store = useStore()
		const playlistVisible = ref(true)
		const currentTrack = ref(null)

		const tracks = computed(() => store.state.audioPlayer.playlist)
		let isPlaying = ref(false)
		let prevAvailable = ref(false)
		let nextAvailable = ref(false)

		const playTrack = track => {
			player.source = {
				type: 'audio',
				title: track.title,
				sources: [
					{type: 'audio/mp3', src: track.url}
				]
			}

			const index = tracks.value.findIndex(({ id }) => id === track.id)

			prevAvailable.value = tracks.value.length && index > 0
			nextAvailable.value = index < tracks.value.length - 1
			currentTrack.value = {
				index,
				id: track.id,
				title: track.title,
			}

			player.play()
		}
		const togglePlayback = () => {
			player.togglePlay()
		}
		const togglePlaylist = () => {
			playlistVisible.value = !playlistVisible.value
		}

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

			watch(tracks, val => {
				if (val.length) {
					playlistVisible.value = true
					playTrack(val[0])
				}
			}, {immediate: true})
		})

		return {
			album: computed(() => store.state.audioPlayer.album),
			tracks,
			playlistVisible,
			currentTrack,
			isPlaying,
			prevAvailable,
			nextAvailable,

			prevTrack: () => playTrack(tracks.value[currentTrack.value.index - 1]),
			nextTrack: () => playTrack(tracks.value[currentTrack.value.index + 1]),
			playTrack,
			togglePlaylist,
			togglePlayback,
		}
	}
}
</script>
