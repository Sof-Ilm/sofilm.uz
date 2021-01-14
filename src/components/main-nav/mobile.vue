<template>
	<div class="md:hidden fixed inset-0 z-20 p-4 bg-white">
		<button @click="$emit('toggle-subnav', {})" :class="['z-30', {'invisible': !subnavRoute.name}]">
			<LeftArrowIcon class="block w-8" />
		</button>

		<nav v-if="navItems.length" class="grid-nav">
			<div v-for="{ name, meta, children } in navItems" :key="name" class="w-32 h-32 px-1 border rounded text-center">
				<router-link v-if="children.length" to="" custom>
					<button
						@click="$emit('toggle-subnav', {name, meta, children})"
						:class="['text-sm', {'text-gold': name === currentNavRoute.name}]">
						<component :is="meta.icon" class="block w-14 h-14 mx-auto my-4" />
						<span class="font-bold uppercase">{{ meta.title }}</span>
						<CaretIcon class="inline w-3 h-3 mb-1 ml-2" />
					</button>
				</router-link>

				<router-link
					v-else
					:to="{name}"
					class="text-sm no-underline"
					active-class="text-gold">
					<component :is="meta.icon" class="block w-14 h-14 mx-auto my-4" />
					<span class="font-bold uppercase">{{ meta.title }}</span>
				</router-link>
			</div>
		</nav>

		<nav v-if="subnavRoute.name">
			<div class="mb-8 text-center">
				<component :is="subnavRoute.meta.icon" class="inline w-6 h-6 mb-1 mr-2" />
				<span class="font-bold uppercase text-lg">{{ subnavRoute.meta.title }}</span>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<router-link
					v-for="{ name, meta } in subnavRoute.children"
					:key="name"
					:to="{name}"
					v-slot="{ navigate }"
					custom>
					<button
						@click="navigate()"
						:class="[
							'py-3 border rounded text-center uppercase',
							{'text-gold': name === currentChildRoute?.name}
						]">
						{{ meta.title }}
					</button>
				</router-link>
			</div>
		</nav>
	</div>
</template>

<script>
import CaretIcon from '/@/components/icons/Caret.vue'
import LeftArrowIcon from '/@/components/icons/LeftArrow.vue'

export default {
	props: {
		navItems: Array,
		subnavRoute: Object,
		currentNavRoute: Object,
		currentChildRoute: Object,
	},
	components: {
		CaretIcon,
		LeftArrowIcon,
	}
}
</script>

<style scoped>
.grid-nav {
	@apply mt-14 grid justify-center gap-4 sm:gap-8;
	grid-template-columns: repeat(3, theme('width.32'));

	@media (max-width: 380px) {
		grid-template-columns: repeat(2, theme('width.32'));
	}
}
</style>
