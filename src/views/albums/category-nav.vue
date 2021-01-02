<template>
	<nav class="flex border-b mb-8">
		<router-link
			v-for="{ name, meta } in categories"
			:key="name"
			:to="{name}"
			class="mr-6 pb-2 border-b-2 border-transparent uppercase hover:text-gold cursor-pointer no-underline"
			active-class="border-gold text-gold">
			{{ meta.title }}
		</router-link>
	</nav>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
	setup () {
		const route = useRoute()
		const router = useRouter()
		const categories = router.getRoutes()
			.find(r => r.name === 'mavzular')
			.children
		
		return {
			categories,
		}
	}
}
</script>
