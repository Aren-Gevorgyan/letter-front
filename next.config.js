/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
	},
	images: {
		domains: ['lh3.googleusercontent.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'nextjs.org',
				port: '',
				pathname: 'https://lh3.googleusercontent.com/**',
			},
		],
	},
};

module.exports = nextConfig;
