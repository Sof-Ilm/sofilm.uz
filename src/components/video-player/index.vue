<template>
	<div class="fixed inset-0 z-30 bg-black bg-opacity-80">
		<div class="mobile-landscape:flex h-full w-full lg:w-11/12 xl:w-4/6 mx-auto bg-smoke-200">
			<div
				@mouseover="topbarVisible = true"
				@mouseleave="topbarVisible = false"
				class="relative mobile-landscape:w-3/5 h-2/6 md:h-4/6 mobile-landscape:h-full">
				<Topbar v-if="topbarVisible" @back-click="$emit('back-click')" />

				<iframe
					v-if="currentVideo"
					width="100%"
					height="100%"
					:src="`https://www.youtube.com/embed/${currentVideo.id}?rel=0`"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen>
				</iframe>
			</div>

			<Playlist
				:current-video="currentVideo"
				@play-video="playVideo($event)"
				@back-click="$emit('back-click')" />
		</div>
	</div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'
import Topbar from './topbar.vue'
import Playlist from './playlist.vue'

export default {
	components: {
		Topbar,
		Playlist,
	},
	setup () {
		const bodyScrollPosition = window.pageYOffset

		const currentVideo = ref(null)
		const topbarVisible = ref(false)

		const playVideo = video => {
			currentVideo.value = video
		}

		document.querySelector('body').classList
			.add('overflow-hidden')

		onBeforeUnmount(() => {
			document.querySelector('body').classList
				.remove('overflow-hidden')

			window.scrollTo(0, bodyScrollPosition)
		})

		return {
			topbarVisible,
			currentVideo,
			playVideo,
		}
	}
}
</script>
