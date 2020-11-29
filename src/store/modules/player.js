import { db } from '/@/lib/firebase.js'

const formatDuration = seconds => {
	return [
		parseInt(seconds / 60 % 60),
		parseInt(seconds % 60)
	].join(":").replace(/\b(\d)\b/g, "0$1")
}

export default {
	namespaced: true,

	state: {
		album: null,
		playlist: [],
	},

	mutations: {
		setAlbum (state, { album }) {
			state.album = album
		},
		setPlaylist (state, { tracks }) {
			state.playlist = tracks
		}
	},

	actions: {
		async fetchTracks ({ commit }, { album }) {
			const tracksSnap = await db.collection(`albums/${album.id}/tracks`).get()
			const tracks = tracksSnap.docs.map(t => {
				const data = t.data()
				data.id = t.id
				data.duration = formatDuration(data.duration)
				return data
			})

			commit('setPlaylist', {tracks})
			commit('setAlbum', {album})
		}
	}
}
