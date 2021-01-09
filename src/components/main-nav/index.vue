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
import { ref, computed, watch } from 'vue'
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
		const subnavRoute = ref({})
		const currentNavRoute = computed(() => {
			const navRoute = route.matched.find(r => r.meta.mainNav)
			return navRoute ? navRoute : route
		})
		const currentChildRoute = computed(() => {
			return route.matched.length > 1
				? route.matched[route.matched.length - 1]
				: null
		})
		const navItems = router.getRoutes().filter(r => r.meta.mainNav)
		const mobileNavItems = computed(() => {
			if (subnavRoute.value.name) {
				return []
			}
			return navItems
		})

		const toggleSubnav = route => {
			subnavRoute.value = subnavRoute.value.name === route.name
				? {}
				: route
		}
		const toggleMobileNav = (val = !mobileNavOpen.value) => {
			mobileNavOpen.value = val
			toggleSubnav({})

			document.querySelector('body').classList
				[val ? 'add' : 'remove']('overflow-hidden', 'fixed', 'inset-0')
		}

		watch(() => route.name, () => {
			toggleMobileNav(false)
			toggleSubnav({})
		})

		return {
			currentNavRoute,
			currentChildRoute,
			mobileNavOpen,
			navItems,
			mobileNavItems,
			toggleMobileNav,
			subnavRoute,
			toggleSubnav,
		}
	}
}
</script>
