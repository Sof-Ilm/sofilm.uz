import { createRouter, createWebHistory } from 'vue-router'
import AudioKitoblar from '/@/views/audio-kitoblar/index.vue'
import AlbumList from '/@/views/audio-kitoblar/album-list.vue'

const routes = [
	{
		path: '/',
		redirect: {name: 'audio-kitoblar/fiqh'}
	},
	{
		name: 'audio-kitoblar',
		path: '/audio-kitoblar',
		redirect: {name: 'audio-kitoblar/fiqh'},
		component: AudioKitoblar,
		meta: {
			mainNav: true,
			title: 'Audio kitoblar',
			icon: 'AudioBookIcon',
		},
		children: [
			{
				name: 'audio-kitoblar/fiqh',
				path: 'fiqh',
				component: AlbumList,
				meta: {
					title: 'Fiqh',
				},
			},
			{
				name: 'audio-kitoblar/hadis',
				path: 'hadis',
				component: AlbumList,
				meta: {
					title: 'Hadis',
				},
			},
			{
				name: 'audio-kitoblar/solih-kishilar',
				path: 'solih-kishilar',
				component: AlbumList,
				meta: {
					title: 'Solih kishilar',
				},
			},
			{
				name: 'audio-kitoblar/turli-mavzular',
				path: 'turli-mavzular',
				component: AlbumList,
				meta: {
					title: 'Turli mavzular',
				},
			},
		]
	},
	{
		name: 'video-tasvirlar',
		path: '/video-tasvirlar',
		component: AudioKitoblar,
		meta: {
			mainNav: true,
			title: 'Video tasvirlar',
			icon: 'FilmRollIcon',
		}
	},
	{
		name: 'biz-haqimizda',
		path: '/biz-haqimizda',
		component: () => import('/@/views/biz-haqimizda/index.vue'),
		meta: {
			mainNav: true,
			title: 'Biz haqimizda',
			icon: 'TeamIcon',
		}
	}
]

export default createRouter({
	history: createWebHistory(),
	routes
})
