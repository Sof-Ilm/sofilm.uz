<template>
	<Banner />

	<CategoryNav />

	<section class="sm:grid sm:grid-cols-albums-fill sm:justify-between">
		<AlbumItem
			v-for="album in getAlbums()"
			:key="album.id"
			class="mb-10"
			:album="album" />
	</section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Banner from '/@/components/Banner.vue'
import CategoryNav from '/@/components/CategoryNav.vue'
import AlbumItem from '/@/components/AlbumItem.vue'

export default {
	components: {
		Banner,
		CategoryNav,
		AlbumItem,
	},
	setup () {
		const store = useStore()
		const getAlbums = computed(() => store.getters['album/getAlbums'])

		return {
			getAlbums
		}
	}
}
</script>

