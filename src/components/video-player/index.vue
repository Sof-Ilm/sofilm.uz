<template>
	<div class="fixed inset-0 z-30 bg-black bg-opacity-80">
		<div class="mobile-landscape:flex h-full w-full lg:w-11/12 xl:w-3/4 mx-auto bg-gray-100">
			<div class="mobile-landscape:w-3/5 h-2/6 md:h-4/6 mobile-landscape:h-full">
				<iframe
					v-if="currentVideo"
					width="100%"
					height="100%"
					:src="`https://www.youtube-nocookie.com/embed/${currentVideo.id}`"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen>
				</iframe>
			</div>

			<div class="mobile-landscape:w-2/5 h-4/6 md:h-2/6 mobile-landscape:h-full lg:grid lg:grid-cols-2 lg:gap-6 py-4 px-4 lg:px-6 overflow-auto border-l border-r">
				<div class="order-1 lg:sticky top-0 mb-4 lg:mb-0 self-start">
					<button class="mb-6 text-lg font-bold rounded uppercase text-gray-500" @click="$emit('back-click')">
						&larr;<span class="ml-3">Orqaga qaytish</span>
					</button>

					<div class="px-4 pt-4 pb-6 bg-gold rounded bg-opacity-20" style="min-height:130px">
						<CoverImage class="float-left mr-3" :width="100" :height="100" src="" />

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
import CoverImage from '/@/components/CoverImage.vue'

export default {
	components: {CoverImage},
	setup () {
		const bodyScrollPosition = window.pageYOffset

		const store = useStore()
		const videos = computed(() => store.state.videoPlayer.playlist)
		const currentVideo = ref(null)

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
			album: computed(() => store.state.videoPlayer.album),
			videos,
			currentVideo,
			playVideo,
		}
	}
}
</script>
