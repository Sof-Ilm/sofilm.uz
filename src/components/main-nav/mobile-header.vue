<template>
	<div class="flex md:hidden justify-between w-full">
		<button
			@click="$emit('toggle-mobile-nav')"
			:class="['w-full pr-6 text-xl uppercase text-center font-bold text-gold', {invisible: mobileNavOpen}]">
			<component :is="currentNavRoute.meta.icon" class="inline-block w-6 h-6 mb-1 mr-2" />
			<span>{{ currentChildRoute?.meta.title || currentNavRoute.meta.title }}</span>
		</button>

		<button @click="$emit('toggle-mobile-nav')" :class="['z-30', {'text-gold': mobileNavOpen}]">
			<GridIcon class="block w-6" />
		</button>
	</div>
</template>

<script>
import GridIcon from '/@/components/icons/Grid.vue'

export default {
	props: {
		currentNavRoute: Object,
		currentChildRoute: Object,
		mobileNavOpen: Boolean,
	},
	components: {
		GridIcon,
	}
}
</script>
