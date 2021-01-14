<template>
	<DesktopNav
		:subnav-route="subnavRoute"
		:nav-items="navItems"
		:current-nav-route="currentNavRoute"
		:current-child-route="currentChildRoute"
		@toggle-subnav="toggleSubnav($event)" />

	<MobileHeader
		:current-nav-route="currentNavRoute"
		:current-child-route="currentChildRoute"
		:mobile-nav-open="mobileNavOpen"
		@open-subnav="openSubnav($event)"
		@toggle-mobile-nav="toggleMobileNav($event)" />

	<teleport v-if="mobileNavOpen" to="body">
		<MobileNav
			:subnav-route="subnavRoute"
	  		:nav-items="mobileNavItems"
			:current-nav-route="currentNavRoute"
			:current-child-route="currentChildRoute"
			@toggle-subnav="toggleSubnav($event)" />
	</teleport>
</template>

<script>
import { ref, shallowRef, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DesktopNav from './desktop.vue'
import MobileNav from './mobile.vue'
import MobileHeader from './mobile-header.vue'

export default {
	components: {
		DesktopNav,
		MobileNav,
		MobileHeader,
	},
	setup (props, { emit }) {
		const route = useRoute()
		const router = useRouter()

		const mobileNavOpen = ref(false)
		const subnavRoute = shallowRef({})
		const navItems = router.getRoutes().filter(r => r.meta.mainNav)

		const currentNavRoute = computed(() => {
			const navRoute = route.matched.find(r => r.meta.mainNav)
			return navRoute ? navRoute : route
		})
		const currentChildRoute = computed(() => {
			return route.matched.length > 1
				? route.matched[route.matched.length - 1]
				: null
		})
		const mobileNavItems = computed(() => {
			if (subnavRoute.value.name) {
				return []
			}
			return navItems
		})

		const openSubnav = route => {
			subnavRoute.value = route
			toggleMobileNav(true)
		}
		const toggleSubnav = route => {
			subnavRoute.value = subnavRoute.value.name === route.name
				? {}
				: route
		}
		const toggleMobileNav = (val = !mobileNavOpen.value) => {
			mobileNavOpen.value = val

			if (!val) {
				toggleSubnav({})
			}
			document.querySelector('body').classList
				[val ? 'add' : 'remove']('overflow-hidden', 'fixed', 'inset-0')
		}

		watch(() => route.name, () => {
			toggleMobileNav(false)
			toggleSubnav({})
		})

		return {
			mobileNavOpen,
			subnavRoute,
			navItems,

			currentNavRoute,
			currentChildRoute,
			mobileNavItems,

			openSubnav,
			toggleSubnav,
			toggleMobileNav,
		}
	}
}
</script>
