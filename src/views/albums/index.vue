<template>
	<Banner />
	<CategoryNav />
	<router-view></router-view>
</template>

<script>
import Banner from '/@/components/Banner.vue'
import CategoryNav from './category-nav.vue'

export default {
	components: {
		Banner,
		CategoryNav,
	},
}
</script>

