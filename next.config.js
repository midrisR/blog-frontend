const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);

module.exports = {
	withTM,
	images: {
		domains: ['images.unsplash.com', 'localhost', 'res.cloudinary.com'],
	},
	compiler: {
		styledComponents: true,
	},
};
