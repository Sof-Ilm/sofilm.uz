import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

module.exports = {
	plugins: [
		VitePWA({
			manifest: {
				'name': 'Sof Ilm',
				'short_name': 'Sof Ilm',
				'start_url': '/',
				'display': 'standalone',
				'background_color': '#fff',
				'description': 'sofilm.uz',
				'lang': 'uz',
				'icons': ['192x192', '512x512'].map(size => {
					return {
						'src': `/images/logo-${size}.png`,
						'sizes': size,
						'type': 'image/png'
					}
				})
			},
			workbox: {},
		})
	],
	alias: {
		'/@/': path.resolve(__dirname, 'src')
	}
}
