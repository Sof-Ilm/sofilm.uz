<template>
	<nav class="hidden sm:flex">
		<router-link
			v-for="[ routeName, title, icon ] in menuItems"
			:key="routeName"
			:to="{name: routeName}"
			class="pb-2 text-lg lg:text-xl uppercase mx-4 border-b-2 border-transparent"
			active-class="border-gold text-gold">
			<component :is="icon" class="inline-block w-6 h-6 mb-1 mr-2" />{{ title }}
		</router-link>
	</nav>

	<div class="flex justify-end w-full sm:hidden">
		<button
			@click="toggleMenu()"
			:class="['w-full pr-6 text-xl uppercase text-center font-bold text-gold', {invisible: menuOpen}]">
			<AudioBookIcon class="inline-block w-6 h-6 mb-1 mr-2" />Audio kitoblar
		</button>
		<button @click="toggleMenu()" :class="['z-30', {'text-gold': menuOpen}]">
			<GridIcon class="block w-6" />
		</button>
	</div>

	<teleport v-if="menuOpen" to="#app">
		<div class="sm:hidden absolute top-0 bottom-0 left-0 right-0 z-20 p-4 bg-white">
			<div class="mobile-nav">
				<router-link
					v-for="[ routeName, title, icon ] in menuItems"
					:key="routeName"
					:to="{name: routeName}"
					@click="toggleMenu()"
					class="w-32 h-32 text-sm text-center border rounded">
					<component :is="icon" class="block w-14 h-14 mx-auto my-4" />
					<span class="font-bold uppercase">{{ title }}</span>
				</router-link>
			</div>
		</div>
	</teleport>
</template>

<script>
import { ref } from 'vue'
import AudioBookIcon from '/@/components/icons/AudioBook.vue'
import FilmRollIcon from '/@/components/icons/FilmRoll.vue'
import TeamIcon from '/@/components/icons/Team.vue'
import GridIcon from '/@/components/icons/Grid.vue'

export default {
	components: {
		AudioBookIcon,
		FilmRollIcon,
		TeamIcon,
		GridIcon,
	},
	setup (props, { emit }) {
		const menuOpen = ref(false)
		const menuItems = ref([
			['audio-kitoblar', 'Audio kitoblar', 'AudioBookIcon'],
			['video-tasvirlar', 'Video tasvirlar', 'FilmRollIcon'],
			['biz-haqimizda', 'Biz haqimizda', 'TeamIcon'],
		])

		return {
			menuOpen,
			menuItems,
			toggleMenu: () => {
				menuOpen.value = !menuOpen.value
				document.querySelector('body').style.overflow = menuOpen.value
					? 'hidden'
					: 'auto'
			}
		}
	}
}
</script>

<style scoped>
.mobile-nav {
	@apply mt-16 grid justify-center gap-4 sm:gap-8;
	grid-template-columns: repeat(3, theme('width.32'));

	@media (max-width: 380px) {
		grid-template-columns: repeat(2, theme('width.32'));
	}
}
</style>
