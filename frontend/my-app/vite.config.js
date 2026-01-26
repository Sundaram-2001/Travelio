import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		// Add this block
		allowedHosts: true, 
		// Optional: Ensure host is 0.0.0.0 so it's accessible outside the container
		host: true 
	}
});