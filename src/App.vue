<template>
	<div class="lg:container lg:mx-auto relative flex flex-col min-h-screen bg-white border-l border-r">
		<header class="flex justify-between px-10 pt-5">
			<div class="logo"></div>

			<div class="flex justify-between flex-1 self-start pt-2 border-b">
				<MainNav class="" />
				<SearchForm class="w-1/3 self-start" />
			</div>
		</header>

		<div class="flex-1">
			<router-view></router-view>
		</div>

		<Player v-if="albumLoaded" class="sticky left-0 right-0 bottom-0 bg-white" />
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
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
			albumLoaded: computed(() => store.state.player.album)
		}
	}
}
</script>

<style scoped>
.logo {
	width: 6.6rem;
	height: 7.7rem;
	background-image: url('./assets/logo.svg');
	background-repeat: no-repeat;
}
</style>
