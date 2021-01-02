import { createRouter, createWebHistory } from 'vue-router'
import Albums from '/@/views/albums/index.vue'
import AlbumList from '/@/views/albums/album-list.vue'
import BooksIcon from '/@/components/icons/Books.vue'
import MasjidIcon from '/@/components/icons/Masjid.vue'

const routes = [
	{
		name: 'not-found',
		path: '/:pathMatch(.*)*',
		component: import('/@/views/not-found.vue')
	},
	{
		name: 'home',
		path: '/',
		redirect: {name: 'mavzular/fiqh'}
	},
	{
		name: 'mavzular',
		path: '/mavzular',
		redirect: {name: 'mavzular/fiqh'},
		component: Albums,
		meta: {
			mainNav: true,
			title: 'Mavzular',
			icon: BooksIcon,
		},
		children: [
			{
				name: 'mavzular/fiqh',
				path: 'fiqh',
				component: AlbumList,
				meta: {
					title: 'Fiqh',
				},
			},
			{
				name: 'mavzular/hadis',
				path: 'hadis',
				component: AlbumList,
				meta: {
					title: 'Hadis',
				},
			},
			{
				name: 'mavzular/solih-kishilar',
				path: 'solih-kishilar',
				component: AlbumList,
				meta: {
					title: 'Solih kishilar',
				},
			},
			{
				name: 'mavzular/turli-mavzular',
				path: 'turli-mavzular',
				component: AlbumList,
				meta: {
					title: 'Turli mavzular',
				},
			},
		]
	},
	{
		name: 'biz-haqimizda',
		path: '/biz-haqimizda',
		component: () => import('/@/views/about-us/index.vue'),
		meta: {
			mainNav: true,
			title: 'Biz haqimizda',
			icon: MasjidIcon,
		}
	}
]

export default createRouter({
	history: createWebHistory(),
	routes
})
