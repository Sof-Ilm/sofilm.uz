import { getPlaylistVideos } from '/@/lib/youtube.js'

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
		setPlaylist (state, { videos }) {
			state.playlist = videos
		}
	},

	actions: {
		async fetchVideos ({ commit }, { album }) {
			if (!album.youtubePlaylistId) {
				return
			}

			const videos = await getPlaylistVideos(album.youtubePlaylistId)

			commit('setPlaylist', {videos})
			commit('setAlbum', {album})
		}
	}
}
