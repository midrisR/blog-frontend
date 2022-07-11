const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
module.exports = (phase, defaultConfig) => {
	return withBundleAnalyzer(defaultConfig, {
		withTM,
		images: {
			domains: [
				'images.unsplash.com',
				'localhost',
				'res.cloudinary.com',
				'avatars.githubusercontent.com',
				'platform-lookaside.fbsbx.com',
				'pbs.twimg.com',
			],
		},
		compiler: {
			styledComponents: true,
		},
		reactStrictMode: true,
	});
};
