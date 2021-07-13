const { getDefaultConfig } = require("metro-config");
const path = require("path");

module.exports = (async () => {
	const {
		resolver: { sourceExts, assetExts },
	} = await getDefaultConfig();
	return {
		transformer: {
			babelTransformerPath: require.resolve("react-native-svg-transformer"),
			getTransformOptions: async () => ({
				transform: {
					experimentalImportSupport: false,
					inlineRequires: false,
				},
			}),
		},
		resolver: {
			assetExts: assetExts.filter((ext) => ext !== "svg"),
			sourceExts: [...sourceExts, "svg", "umd.js", "cjs.js"],
			extraNodeModules: {
				...require("node-libs-react-native"),
				fs: path.resolve(__dirname, "./node_modules/fake-fs"),
			},
		},
	};
})();
