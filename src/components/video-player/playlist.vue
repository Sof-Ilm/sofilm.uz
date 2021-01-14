<template>
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
					@click="$emit('play-video', video)"
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
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import CoverImage from '/@/components/CoverImage.vue'

export default {
	props: {
		currentVideo: Object
	},
	components: {
		CoverImage,
	},
	setup (props, { emit }) {
		const store = useStore()
		const album = computed(() => store.state.videoPlayer.album)
		const videos = computed(() => store.state.videoPlayer.playlist)

		watch(
			() => videos,
			list => {
				if (list.value?.length) {
					emit('play-video', list.value[0])
				}
			},
			{immediate: true}
		)

		return {
			album,
			videos,
		}
	}
}
</script>
