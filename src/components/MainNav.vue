<template>
	<nav class="hidden md:flex">
		<router-link
			v-for="{ name, meta } in menuItems"
			:key="name"
			:to="{name}"
			class="pb-2 text-lg lg:text-xl uppercase mx-4 border-b-2 border-transparent"
			active-class="border-gold text-gold">
			<component :is="meta.icon" class="inline-block w-6 h-6 mb-1 mr-2" />{{ meta.title }}
		</router-link>
	</nav>

	<div class="flex justify-end w-full md:hidden">
		<button
			@click="toggleMenu()"
			:class="['w-full pr-6 text-xl uppercase text-center font-bold text-gold', {invisible: menuOpen}]">
			<component :is="route.meta.icon" class="inline-block w-6 h-6 mb-1 mr-2" />{{ route.meta.title }}
		</button>
		<button @click="toggleMenu()" :class="['z-30', {'text-gold': menuOpen}]">
			<GridIcon class="block w-6" />
		</button>
	</div>

	<teleport v-if="menuOpen" to="#app">
		<div class="md:hidden absolute top-0 bottom-0 left-0 right-0 z-20 p-4 bg-white">
			<div class="mobile-nav">
				<router-link
					v-for="{ name, meta } in menuItems"
					:key="name"
					:to="{name}"
					class="w-32 h-32 text-sm text-center border rounded"
					active-class="text-gold">
					<component :is="meta.icon" class="block w-14 h-14 mx-auto my-4" />
					<span class="font-bold uppercase">{{ meta.title }}</span>
				</router-link>
			</div>
		</div>
	</teleport>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
		const route = useRoute()
		const router = useRouter()
		const menuOpen = ref(false)
		const menuItems = router.getRoutes().filter(r => r.meta.title)

		const toggleMenu = () => {
			menuOpen.value = !menuOpen.value
			document.querySelector('body').style.overflow = menuOpen.value
				? 'hidden'
				: 'auto'
		}

		watch(() => route.name, () => menuOpen.value = false)

		return {
			route,
			menuOpen,
			menuItems,
			toggleMenu
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
