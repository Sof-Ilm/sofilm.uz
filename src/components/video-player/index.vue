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

			<div class="mobile-landscape:w-2/5 h-4/6 md:h-2/6 mobile-landscape:h-full lg:grid lg:grid-cols-2 lg:gap-6 py-4 px-4 lg:px-6 overflow-auto">
				<button class="md:hidden px-2 py-1 mb-4 font-bold rounded bg-gray-400 uppercase text-gray-100" @click="$emit('back-click')">
					&larr;<span class="ml-3">Orqaga qaytish</span>
				</button>

				<div class="order-1 lg:sticky top-0 mb-4 lg:mb-0 self-start">
					<div class="px-4 pt-4 pb-6 bg-gold rounded bg-opacity-20" style="min-height:130px">
						<CoverImage class="float-left mr-3" :width="100" :height="100" :src="album.cover" />

						<h2 class="mb-1 text-lg font-bold">{{ album.title }}</h2>
						<span class="text-sm">{{ album.description }}</span>
					</div>
				</div>

				<ul>
					<li v-for="video in videos" :key="video.id">
						<button
							@click="playVideo(video)"
							:class="[
								'flex justify-between w-full p-2 hover:bg-gold hover:bg-opacity-20 rounded cursor-pointer',
								{'bg-gold bg-opacity-20': video.id === currentVideo?.id}
							]">
							<span class="truncate">{{ video.title }}</span>
							<span class="ml-3 italic opacity-50">{{ video.duration }}</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import Topbar from './topbar.vue'
import CoverImage from '/@/components/CoverImage.vue'

export default {
	components: {
		Topbar,
		CoverImage,
	},
	setup () {
		const bodyScrollPosition = window.pageYOffset

		const store = useStore()
		const currentVideo = ref(null)
		const topbarVisible = ref(false)
		const videos = computed(() => store.state.videoPlayer.playlist)

		const playVideo = video => {
			currentVideo.value = video
		}

		document.querySelector('body').classList
			.add('overflow-hidden')

		watch(
			() => videos,
			list => {
				if (list.value?.length) {
					playVideo(list.value[0])
				}
			},
			{immediate: true}
		)
		
		onBeforeUnmount(() => {
			document.querySelector('body').classList
				.remove('overflow-hidden')

			window.scrollTo(0, bodyScrollPosition)
		})

		return {
			topbarVisible,
			videos,
			currentVideo,
			album: computed(() => store.state.videoPlayer.album),
			playVideo,
		}
	}
}
</script>
