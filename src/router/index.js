import { createRouter, createWebHistory } from 'vue-router'
import AudioKitoblar from '/@/views/audio-kitoblar/index.vue'

const routes = [
	{
		name: 'audio-kitoblar',
		path: '/',
		component: AudioKitoblar,
		meta: {
			title: 'Audio kitoblar',
			icon: 'AudioBookIcon',
		},
	},
	{
		name: 'video-tasvirlar',
		path: '/video-tasvirlar',
		component: AudioKitoblar,
		meta: {
			title: 'Video tasvirlar',
			icon: 'FilmRollIcon',
		}
	},
	{
		name: 'biz-haqimizda',
		path: '/biz-haqimizda',
		component: () => import('/@/views/biz-haqimizda/index.vue'),
		meta: {
			title: 'Biz haqimizda',
			icon: 'TeamIcon',
		}
	}
]

export default createRouter({
	history: createWebHistory(),
	routes
})
