//const { getDefaultConfig } = require("metro-config");

// module.exports = (async () => {
// 	const {
// 		resolver: { sourceExts, assetExts },
// 	} = await getDefaultConfig();
// 	return {
// 		transformer: {
// 			babelTransformerPath: require.resolve("react-native-sass-transformer"),
// 		},
// 		resolver: {
// 			sourceExts: [...sourceExts, ...assetExts, "scss", "sass"],
// 		},
// 	};
// })();

// const { getDefaultConfig } = require("metro-config");

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts  }
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false
//         }
//       }),
//       babelTransformerPath: require.resolve("./transformer.js")
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== "svg"),
//       sourceExts: [...sourceExts, "svg"]
//     }
//   };
// })();

const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
	const {
		resolver: { sourceExts, assetExts },
	} = await getDefaultConfig();
	return {
		transformer: {
			babelTransformerPath: require.resolve("react-native-svg-transformer"),
		},
		resolver: {
			assetExts: assetExts.filter((ext) => ext !== "svg"),
			sourceExts: [...sourceExts, "svg"],
			extraNodeModules: require("node-libs-react-native"),
		},
	};
})();
