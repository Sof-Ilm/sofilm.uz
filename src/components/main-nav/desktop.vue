<template>
	<nav class="hidden md:flex">
		<div v-for="{ name, meta, children } in navItems" :key="name" class="first-level mx-2">
			<router-link v-if="children.length" to="" custom>
				<div
					:class="[
						'relative pt-4 pl-4 pr-4',
						{
							'rounded-t bg-smoke-100 shadow-md': subnavRoute.name === name,
							'router-link-active': currentNavRoute.name === name,
						}
					]">
					<button
						@click="$emit('toggle-subnav', {name, meta, children})"
						:class="[
							'pb-2 border-b-2 border-transparent text-lg lg:text-xl uppercase hover:border-gold',
							{'border-none': subnavRoute.name === name}
						]">
						<component :is="meta.icon" class="inline w-6 h-6 mb-1 mr-2" />{{ currentChildRoute?.meta.title || meta.title }}
						<CaretIcon class="inline w-3 h-3 mb-1 ml-2" />
					</button>

					<nav
						v-if="subnavRoute.name === name"
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
</template>

<script>
import CaretIcon from '/@/components/icons/Caret.vue'

export default {
	props: {
		navItems: Array,
		subnavRoute: Object,
		currentNavRoute: Object,
		currentChildRoute: Object,
	},
	components: {
		CaretIcon,
	}
}
</script>

<style scoped>
.first-level .router-link-active {
	& > span,
	& > button {
		@apply text-gold border-gold;
	}
}
</style>
