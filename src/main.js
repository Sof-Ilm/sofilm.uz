import { createApp } from 'vue'
import Router from '/@/router/index.js'
import Store from '/@/store/index.js'
import App from './App.vue'
import './index.css'
import 'plyr/dist/plyr.css'

createApp(App)
	.use(Router)
	.use(Store)
	.mount('#app')
