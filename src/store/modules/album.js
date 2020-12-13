import { db } from '/@/lib/firebase.js'

export default {
	namespaced: true,

	state: {
		albums: [],
		category: 'fiqh',

		categories: [
			{id: 'fiqh', title: 'Fiqh'},
			{id: 'hadis', title: 'Hadis'},
			{id: 'solih-kishilar', title: 'Solih kishilar'},
			{id: 'turli-mavzular', title: 'Turli mavzular'},
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
			const albumsSnap = await db.collection('albums').where('categories', 'array-contains', category).get()
			const albums = albumsSnap.docs.map(a => ({id: a.id, category, ...a.data()}))

			commit('addAlbums', {albums})
		},
	}
}

