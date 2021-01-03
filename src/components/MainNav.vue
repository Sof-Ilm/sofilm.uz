<template>
	<nav class="hidden md:flex">
		<div v-for="{ name, meta, children } in menuItems" :key="name" class="first-level mx-2">
			<router-link v-if="children.length" to="" custom>
				<div
					:class="[
						'relative pt-4 pl-4 pr-4',
						{
							'rounded-t bg-smoke-100 shadow-md': submenuOpenFor === name,
							'router-link-active': currentNavRoute.name === name,
						}
					]">
					<button
						@click="toggleSubmenuFor(name)"
						:class="[
							'pb-2 border-b-2 border-transparent text-lg lg:text-xl uppercase hover:border-gold',
							{'border-none': submenuOpenFor === name}
						]">
						<component :is="meta.icon" class="inline w-6 h-6 mb-1 mr-2" />{{ currentChildRouteTitle || meta.title }}
						<CaretIcon class="inline w-3 h-3 mb-1 ml-2" />
					</button>

					<nav
						v-if="submenuOpenFor === name"
						class="absolute left-0 min-w-full pt-2 pr-4 pb-4 pl-4 rounded-b bg-smoke-100 shadow-md"
						style="top: 3.4rem">
						<ul>
							<li v-for="{ name, meta } in children" :key="name" class="py-1 text-left">
								<router-link
									:to="{name}"
									class="whitespace-nowrap uppercase cursor-pointer no-underline hover:underline"
									active-class="text-gold">
									{{ meta.title }}
								</router-link>
							</li>
						</ul>
					</nav>
				</div>
			</router-link>

			<div v-else class="pt-4 pl-4 pr-4">
				<router-link
					:to="{name}"
					class="no-underline">
					<span class="block pb-2 border-b-2 border-transparent text-lg lg:text-xl uppercase hover:border-gold">
						<component :is="meta.icon" class="inline w-6 h-6 mb-1 mr-2" />{{ meta.title }}
					</span>
				</router-link>
			</div>
		</div>
	</nav>

	<div class="flex md:hidden justify-end w-full">
		<button
			@click="toggleMobileNav()"
			:class="['w-full pr-6 text-xl uppercase text-center font-bold text-gold', {invisible: menuOpen}]">
			<component :is="currentNavRoute.meta.icon" class="inline-block w-6 h-6 mb-1 mr-2" />{{ currentNavRoute.meta.title }}
		</button>
		<button @click="toggleMobileNav()" :class="['z-30', {'text-gold': menuOpen}]">
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
import GridIcon from '/@/components/icons/Grid.vue'
import CaretIcon from '/@/components/icons/Caret.vue'

export default {
	components: {
		GridIcon,
		CaretIcon,
	},
	setup (props, { emit }) {
		const route = useRoute()
		const router = useRouter()
		const menuOpen = ref(false)
		const submenuOpenFor = ref(null)
		const currentNavRoute = computed(() => {
			const navRoute = route.matched.find(r => r.meta.mainNav)
			return navRoute ? navRoute : route
		})
		const currentChildRouteTitle = computed(() => {
			const child = route.matched.length > 1
				? route.matched[route.matched.length - 1]
				: null

			return child
				? child.meta.title
				: null
		})
		const menuItems = router.getRoutes().filter(r => r.meta.mainNav)

		const toggleMobileNav = (val = !menuOpen.value) => {
			menuOpen.value = val

			document.querySelector('body').classList
				[val ? 'add' : 'remove']('overflow-hidden', 'fixed', 'inset-0')
		}
		const toggleSubmenuFor = routeName => {
			submenuOpenFor.value = submenuOpenFor.value === routeName
				? null
				: routeName
		}

		watch(() => route.name, () => {
			toggleMobileNav(false)
			toggleSubmenuFor(null)
		})

		return {
			currentNavRoute,
			currentChildRouteTitle,
			menuOpen,
			menuItems,
			toggleMobileNav,
			submenuOpenFor,
			toggleSubmenuFor,
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

.first-level .router-link-active {
	& > span,
	& > button {
		@apply text-gold border-gold;
	}
}
</style>
