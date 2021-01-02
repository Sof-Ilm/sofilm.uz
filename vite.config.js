import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

module.exports = {
	plugins: [
		VitePWA({
			manifest: {
				'name': 'Sof Ilm',
				'short_name': 'Sof Ilm',
				'start_url': '/mavzular/fiqh',
				'display': 'standalone',
				'background_color': '#fff',
				'description': 'sofilm.uz',
				'lang': 'uz',
				'icons': [
					{
						'src': '/favicon.ico',
						'sizes': '64x64 32x32 24x24 16x16',
						'type': 'image/x-icon'
					},
					{
						'src': '/images/logo-192x192.png',
						'sizes': '192x192',
						'type': 'image/png'
					},
					{
						'src': '/images/logo-512x512.png',
						'sizes': '512x512',
						'type': 'image/png'
					}
				]
			},
			workbox: {
				mode: process.env.NODE_ENV
			},
		})
	],
	alias: {
		'/@/': path.resolve(__dirname, 'src')
	}
}
