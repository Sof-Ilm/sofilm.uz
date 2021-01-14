<template>
	<Banner />
	<router-view></router-view>
</template>

<script>
import Banner from '/@/components/Banner.vue'

export default {
	components: {
		Banner,
	},
}
</script>

