<template>
	<header class="flex justify-between mx-4 md:mx-10 mt-2">
		<div class="logo mt-1 md:mt-2"></div>

		<div class="flex justify-between flex-1 self-start pb-2 md:pb-0 border-b">
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
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineAsyncComponent } from 'vue'
import SearchForm from '/@/components/SearchForm.vue'
import MainNav from '/@/components/MainNav.vue'

export default {
	name: 'App',
	components: {
		MainNav,
		SearchForm,
		AudioPlayer: defineAsyncComponent(() => import('/@/components/audio-player/index.vue')),
		VideoPlayer: defineAsyncComponent(() => import('/@/components/video-player/index.vue')),
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
