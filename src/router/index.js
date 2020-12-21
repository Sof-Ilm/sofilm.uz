import { createRouter, createWebHistory } from 'vue-router'
import AudioKitoblar from '/@/views/audio-kitoblar/index.vue'

const routes = [
	{
		name: 'audio-kitoblar',
		path: '/',
		component: AudioKitoblar
	},
	{
		name: 'video-tasvirlar',
		path: '/video-tasvirlar',
		component: AudioKitoblar
	},
	{
		name: 'biz-haqimizda',
		path: '/biz-haqimizda',
		component: () => import('/@/views/biz-haqimizda/index.vue')
	}
]

export default createRouter({
	history: createWebHistory(),
	routes
})
