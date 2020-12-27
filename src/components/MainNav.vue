<template>
	<nav class="hidden md:flex">
		<router-link
			v-for="{ name, meta } in menuItems"
			:key="name"
			:to="{name}"
			class="pb-2 text-lg lg:text-xl uppercase mx-4 border-b-2 border-transparent no-underline"
			active-class="border-gold text-gold">
			<component :is="meta.icon" class="inline-block w-6 h-6 mb-1 mr-2" />{{ meta.title }}
		</router-link>
	</nav>

	<div class="flex justify-end w-full md:hidden">
		<button
			@click="toggleMenu()"
			:class="['w-full pr-6 text-xl uppercase text-center font-bold text-gold', {invisible: menuOpen}]">
			<component :is="currentNavRoute.meta.icon" class="inline-block w-6 h-6 mb-1 mr-2" />{{ currentNavRoute.meta.title }}
		</button>
		<button @click="toggleMenu()" :class="['z-30', {'text-gold': menuOpen}]">
			<GridIcon class="block w-6" />
		</button>
	</div>

	<teleport v-if="menuOpen" to="body">
		<div class="md:hidden fixed inset-0 z-20 p-4 bg-white">
			<div class="mobile-nav">
				<router-link
					v-for="{ name, meta } in menuItems"
					:key="name"
					:to="{name}"
					class="w-32 h-32 text-sm text-center border rounded no-underline"
					active-class="text-gold">
					<component :is="meta.icon" class="block w-14 h-14 mx-auto my-4" />
					<span class="font-bold uppercase">{{ meta.title }}</span>
				</router-link>
			</div>
		</div>
	</teleport>
</template>

<script>
import { ref, computed, watch } from 'vue'
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
		const currentNavRoute = computed(() => {
			const navRoute = route.matched.find(r => r.meta.mainNav)
			return navRoute ? navRoute : route
		})
		const menuItems = router.getRoutes().filter(r => r.meta.mainNav)

		const toggleMenu = (val = !menuOpen.value) => {
			menuOpen.value = val

			document.querySelector('body').classList
				[val ? 'add' : 'remove']('overflow-hidden', 'fixed', 'inset-0')
		}

		watch(() => route.name, () => toggleMenu(false))

		return {
			currentNavRoute,
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
