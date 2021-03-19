import { db } from '/@/lib/firebase.js'

export default {
	namespaced: true,

	state: {
		albums: [],
	},

	getters: {
		getAlbums: state => (category) => 
			state.albums.filter(a => a.category === category)
	},

	mutations: {
		addAlbums (state, { albums }) {
			state.albums = state.albums.concat(albums)
		},
	},

	actions: {
		async fetchAlbums ({ commit }, { category }) {
			const albumsSnap = await db.collection('albums').where('categories', 'array-contains', category).get()
			const albums = albumsSnap.docs.map(a => ({id: a.id, category, ...a.data()}))

			for (const alb of albums) {
				if (alb.descriptionId) {
					const description = await db.collection('content').doc(alb.descriptionId).get()
					alb.description = description.data()?.text
				}
			}

			commit('addAlbums', {albums})
		},
	}
}

