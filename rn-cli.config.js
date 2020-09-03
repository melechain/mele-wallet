module.exports = {
	resolver: {
		extraNodeModules: require("node-libs-react-native"),
		blacklistRE: /react-native\/local-cli\/core\/__fixtures__.*/,
	},
};
