<template>
	<div class="flex md:hidden justify-between w-full">
		<button
			@click="currentChildRoute && $emit('open-subnav', currentNavRoute)"
			:class="['w-full pr-6 text-xl uppercase text-center font-bold text-gold', {invisible: mobileNavOpen}]">
			<component :is="currentNavRoute.meta.icon" class="inline-block w-6 h-6 mb-1 mr-2" />
			<span>{{ currentChildRoute?.meta.title || currentNavRoute.meta.title }}</span>
			<CaretIcon v-if="currentChildRoute" class="inline w-3 h-3 mb-1 ml-2" />
		</button>

		<button @click="$emit('toggle-mobile-nav')" :class="['z-30', {'text-gold': mobileNavOpen}]">
			<GridIcon class="block w-6" />
		</button>
	</div>
</template>

<script>
import CaretIcon from '/@/components/icons/Caret.vue'
import GridIcon from '/@/components/icons/Grid.vue'

export default {
	props: {
		currentNavRoute: Object,
		currentChildRoute: Object,
		mobileNavOpen: Boolean,
	},
	components: {
		CaretIcon,
		GridIcon,
	}
}
</script>
