<template>
	<section class="sm:grid sm:grid-cols-albums-fill sm:justify-between md:gap-3">
		<AlbumItem
			v-for="album in getAlbums(category)"
			:key="album.id"
			class="mb-10"
			:album="album"
			@video-click="videoPlayerVisible = true" />
	</section>

	<teleport v-if="videoPlayerVisible" to="body">
		<VideoPlayer @back-click="videoPlayerVisible = false" />
	</teleport>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'
import AlbumItem from '/@/components/AlbumItem.vue'
import VideoPlayer from '/@/components/video-player/index.vue'

export default {
	components: {
		AlbumItem,
		VideoPlayer,
	},
	setup () {
		const route = useRoute()
		const store = useStore()
		const category = computed(() => {
			return route.name.split('/')[1]
		})
		const { value:getAlbums } = computed(() => store.getters['album/getAlbums'])

		watch(category, cat => {
			if (cat) {
				// fetch only if not cached
				if (!getAlbums(cat).length) {
					store.dispatch('album/fetchAlbums', {category: cat})
				}
			}
		}, {immediate: true})

		return {
			getAlbums,
			category,
			videoPlayerVisible: ref(false)
		}
	}
}
</script>
