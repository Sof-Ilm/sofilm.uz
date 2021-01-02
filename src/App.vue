<template>
	<div class="xl:container xl:mx-auto relative flex flex-col min-h-screen bg-white border-l border-r">
		<header class="flex justify-between mx-4 md:mx-10 mt-5">
			<div class="logo mt-1 md:mt-0"></div>

			<div class="flex justify-between flex-1 self-start pb-2 md:pb-0 md:pt-2 border-b">
				<MainNav />
				<SearchForm class="w-1/3 self-start" />
			</div>
		</header>

		<main class="flex-1 mx-4 md:mx-10">
			<router-view></router-view>
		</main>

		<AudioPlayer v-if="audioAlbumLoaded" class="sticky left-0 right-0 bottom-0 bg-white" />

		<teleport v-if="videoAlbumLoaded" to="body">
			<VideoPlayer @back-click="unloadVideoAlbum" />
		</teleport>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import SearchForm from '/@/components/SearchForm.vue'
import MainNav from '/@/components/MainNav.vue'
import AudioPlayer from '/@/components/audio-player/index.vue'
import VideoPlayer from '/@/components/video-player/index.vue'

export default {
	name: 'App',
	components: {
		MainNav,
		SearchForm,
		AudioPlayer,
		VideoPlayer,
	},
	setup () {
		const store = useStore()

		return {
			audioAlbumLoaded: computed(() => store.state.audioPlayer.album),
			videoAlbumLoaded: computed(() => store.state.videoPlayer.album),
			unloadVideoAlbum () {
				store.commit('videoPlayer/setAlbum', {album: null})
				store.commit('videoPlayer/setPlaylist', {videos: null})
			}
		}
	}
}
</script>

<style scoped>
.logo {
	width: 4.6rem;
	height: 5.4rem;
	background-image: url('./assets/logo.svg');
	background-repeat: no-repeat;

	@screen md {
		width: 6.6rem;
		height: 7.7rem;
	}
}
</style>
