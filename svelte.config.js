import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: { default: true },
	},
	vite: {
		resolve: {
			alias: {
				"socket.io-client": "socket.io-client/dist/socket.io.js",
			},
		},
	},
	
};

export default config;
