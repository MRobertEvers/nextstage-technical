/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		dirs: ['pages', 'widgets']
	}
};

module.exports = nextConfig;
