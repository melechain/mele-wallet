import AsyncStorage from "@react-native-community/async-storage";
import base64 from "base-64";

export enum StaticStateActionTypes {
	SET_MNEMONIC_AND_PIN = "@@STATIC/SET_MNEMONIC_AND_PIN",
	SET_ACCOUNT_ID = "@@STATIC/SET_ACCOUNT_ID",
	UPDATE__PIN = "@@STATIC/UPDATE__PIN",
}

export interface IStaticReducerAction {
	type: StaticStateActionTypes;
	mnemonic: string;
	pin: string;
	accountId: string;
}

export class StaticState {
	mnemonic?: string = "";
	pin: string = "";
	accountId?: string = "";
}

export const initialState: StaticState = new StaticState();

const staticReducer = (
	state: StaticState = initialState,
	action: IStaticReducerAction,
): StaticState => {
	switch (action.type) {
		case StaticStateActionTypes.SET_MNEMONIC_AND_PIN:
			AsyncStorage.setItem("pin", base64.encode(action.pin));
			AsyncStorage.setItem("mnemonic", base64.encode(action.mnemonic));
			return {
				mnemonic: action.mnemonic,
				pin: action.pin,
				accountId: "",
			};
		case StaticStateActionTypes.UPDATE__PIN:
			return {
				...state,
				pin: action.pin,
			};
		case StaticStateActionTypes.SET_ACCOUNT_ID:
			return {
				...state,
				accountId: action.accountId,
			};
		default:
			return {
				...state,
			};
	}
};

export default staticReducer;
