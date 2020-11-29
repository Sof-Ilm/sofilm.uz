<template>
	<img class="w-4/6 -mt-10 mb-10 mx-auto" src="/@/assets/bismillah.svg" />

	<main class="mx-10">
		<CategoryNav />

		<section class="grid grid-cols-albums-fill justify-between">
			<AlbumItem
				v-for="album in getAlbums()"
				:key="album.id"
				class="mb-8"
				:album="album" />
		</section>
	</main>
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

