const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);

module.exports = {
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
};
