const plugin = require('tailwindcss/plugin');
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(({ addVariant, e }) => {
			addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
				modifySelectors(
					({ className }) =>
						`.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`
				);
			});
		}),
	],
};
