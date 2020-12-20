<template>
	<div class="xl:container xl:mx-auto relative flex flex-col min-h-screen bg-white border-l border-r">
		<header class="flex justify-between mx-4 md:mx-10 mt-5">
			<div class="logo mt-1 sm:mt-0"></div>

			<div class="flex justify-between flex-1 self-start pb-2 sm:pb-0 sm:pt-2 border-b">
				<MainNav />
				<SearchForm class="w-1/3 self-start" />
			</div>
		</header>

		<main class="flex-1 mx-4 md:mx-10">
			<router-view></router-view>
		</main>

		<Player v-if="albumLoaded" class="sticky left-0 right-0 bottom-0 bg-white" />
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'
import SearchForm from '/@/components/SearchForm.vue'
import MainNav from '/@/components/MainNav.vue'
import Player from '/@/components/player/index.vue'

export default {
	name: 'App',
	components: {
		SearchForm,
		MainNav,
		Player
	},
	setup () {
		const store = useStore()
		const { value:getAlbums } = computed(() => store.getters['album/getAlbums'])

		watch(() => store.state.album.category, cat => {
			if (cat) {
				if (getAlbums(cat).length) {
					return
				}
				store.dispatch('album/fetchAlbums', {category: cat})
			}
		}, {immediate: true})

		return {
			albumLoaded: computed(() => store.state.player.album),
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
