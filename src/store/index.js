import { createStore, createLogger } from 'vuex'
import album from './modules/album.js'
import audioPlayer from './modules/audio-player.js'
import videoPlayer from './modules/video-player.js'

export default createStore({
	plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],

	modules: {
		album,
		audioPlayer,
		videoPlayer,
	}
})
