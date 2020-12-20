import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/@/views/home/index.vue'

const routes = [
	{
		name: 'audio-kitoblar',
		path: '/',
		component: Home
	},
	{
		name: 'video-tasvirlar',
		path: '/video-tasvirlar',
		component: Home
	},
	{
		name: 'biz-haqimizda',
		path: '/biz-haqimizda',
		component: Home
	}
]

export default createRouter({
	history: createWebHashHistory(),
	routes
})
