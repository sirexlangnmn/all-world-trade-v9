/** @type {import('tailwindcss').Config} */

module.exports = {
	mode: 'jit',
    content: [
		'./public/**/*.{html,js,ejs,css}',
		'./node_modules/flowbite/**/*.js'
	],
	purge: [
		'./public/**/*.{html,js,ejs, css}',
		'./node_modules/flowbite/**/*.js'
	],
    theme: {
        extend: {},
    },
    plugins: [require('flowbite/plugin')],

};

