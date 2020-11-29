import { createStore, createLogger } from 'vuex'
import album from './modules/album.js'
import player from './modules/player.js'

export default createStore({
	plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],

	modules: {
		album,
		player,
	}
})
