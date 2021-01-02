<template>
	<section class="sm:grid sm:grid-cols-albums-fill sm:justify-between md:gap-3">
		<AlbumItem
			v-for="album in getAlbums(category)"
			:key="album.id"
			class="mb-10"
			:album="album" />
	</section>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'
import AlbumItem from '/@/components/AlbumItem.vue'

export default {
	components: {
		AlbumItem,
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
		}
	}
}
</script>
