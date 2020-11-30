module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: [],
	theme: {
		extend: {
			colors: {
				'nobel': '#9f9f9f',
				'gold': '#ceae55'
			},
			gridTemplateColumns: {
				'albums-fill': 'repeat(auto-fill, 200px)',
			},
		},
		fontFamily: {
			'sans': ['Arsenal', 'sans-serif'],
		}
	},
	variants: {},
	plugins: [],
}
