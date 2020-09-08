declare module "*.svg" {
	import { SvgProps } from "react-native-svg";

	interface SvgPropsCustom extends React.FC<SvgProps> {
		height?: number;
		width?: number;
	}

	const content: SvgPropsCustom;
	export default content;
}
