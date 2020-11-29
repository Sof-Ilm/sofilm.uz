import { db } from '/@/lib/firebase.js'

export default {
	namespaced: true,

	state: {
		albums: [],
		category: 'solih-kishilar',

		categories: [
			{id: 'solih-kishilar', title: 'Solih kishilar'},
			{id: 'fiqh', title: 'Fiqh'},
		]
	},

	getters: {
		getAlbums: state => (category = state.category) => 
			state.albums.filter(a => a.category === category)
	},

	mutations: {
		addAlbums (state, { albums }) {
			state.albums = state.albums.concat(albums)
		},
		setCategory (state, { category }) {
			state.category = category
		}
	},

	actions: {
		async fetchAlbums ({ commit }, { category }) {
			const albumsSnap = await db.collection('albums').where('category', '==', category).get()
			const albums = albumsSnap.docs.map(a => ({id: a.id, ...a.data()}))

			commit('addAlbums', {albums})
		},
	}
}

