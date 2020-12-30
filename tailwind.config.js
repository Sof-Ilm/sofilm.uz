module.exports = {
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: [
			'./public/index.html',
			'./src/**/*.vue',
		]
	},
	theme: {
		extend: {
			colors: {
				'nobel': '#9f9f9f',
				'gold': '#ceae55',
			},
			gridTemplateColumns: {
				'albums-fill': 'repeat(auto-fill, 200px)',
			},
			width: {
				'album': '202px'
			},
			screens: {
				'mobile-landscape': {'raw': 'screen and (max-width: 900px) and (orientation: landscape)'},
				'can-hover': {'raw': '(hover: hover)'},
				'cannot-hover': {'raw': '(hover: none)'},
			},
		},
		fontFamily: {
			'sans': ['Arsenal', 'sans-serif'],
		}
	},
	variants: {
		extend: {
			borderRadius: ['first', 'last']
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
