<template>
	<nav class="flex border-b mb-8">
		<button
			v-for="{ id, title } in categories"
			:key="id"
			@click="setCategory(id)"
			:class="[
				'mr-6 pb-2 border-b-2 border-transparent uppercase hover:text-gold cursor-pointer',
				{'border-gold text-gold': category === id}
			]">
			{{ title }}
		</button>
	</nav>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
	setup () {
		const store = useStore()
		
		return {
			categories: computed(() => store.state.album.categories),
			category: computed(() => store.state.album.category),
			setCategory: category => store.commit('album/setCategory', {category})
		}
	}
}
</script>
