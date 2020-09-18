var svgTransformer = require("react-native-svg-transformer");

module.exports.transform = function ({ src, filename, options }) {
	return svgTransformer.transform({ src, filename, options });
};
