export enum StaticStateActionTypes {
	SET_MNEMONIC_AND_PIN = "@@STATIC/SET_MNEMONIC_AND_PIN",
	CHECK_PIN = "@@STATIC/CHECK_PIN",
}

export interface IStaticReducerAction {
	mnemonic: string;
	pin: string;
	type: StaticStateActionTypes;
}

export class StaticState {
	mnemonic: string = "";
	pin: string = "";
}

export const initialState: StaticState = new StaticState();

const staticReducer = (
	state: StaticState = initialState,
	action: IStaticReducerAction,
): StaticState => {
	switch (action.type) {
		case StaticStateActionTypes.SET_MNEMONIC_AND_PIN:
			return {
				mnemonic: action.mnemonic,
				pin: action.pin,
				...action,
			};
		default:
			return {
				...state,
			};
	}
};

export default staticReducer;
