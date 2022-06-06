/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]);
const nextConfig = {
	images: {
		domains: ["images.unsplash.com"],
	},
	compiler: {
		styledComponents: true,
	},
};
module.exports = {
	withTM,
	nextConfig,
};
