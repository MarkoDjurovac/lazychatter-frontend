/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			height: {
				'app': '32rem'
			  },
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
