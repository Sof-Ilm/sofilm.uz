module.exports = {
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: [
			'./index.html',
			'./src/**/*.vue',
		]
	},
	theme: {
		extend: {
			colors: {
				'nobel': '#9f9f9f',
				'gold': '#ceae55',
				'smoke': {
					'100': '#F8F8F8',
					'200': '#E0E0E0',
					'300': '#C8C8C8',
					'400': '#888888',
					'500': '#707070',
					'600': '#505050',
					'700': '#383838',
					'800': '#282828',
					'900': '#101010',
				},
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
