<template>
	<img class="md:w-4/6 mt-6 md:-mt-10 mb-6 md:mb-10 mx-auto" src="/@/assets/bismillah.svg" />

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
import CategoryNav from '/@/components/CategoryNav.vue'
import AlbumItem from '/@/components/AlbumItem.vue'

export default {
	components: {
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

