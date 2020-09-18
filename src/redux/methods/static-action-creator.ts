import {
	StaticStateActionTypes,
	IStaticReducerAction,
} from "../reducers/static-reducer";
import BaseActionCreator from "./base-action-creator";
import { Actions } from "react-native-router-flux";

export default class StaticActionCreator extends BaseActionCreator<
	StaticStateActionTypes,
	IStaticReducerAction
> {
	setMnemonicAndPin = async (mnemonic: string, pin: string) => {
		this.dispatch({
			type: StaticStateActionTypes.SET_MNEMONIC_AND_PIN,
			mnemonic: mnemonic,
			pin: pin,
		});
	};
}
