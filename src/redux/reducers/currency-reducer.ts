export enum CurrencyStateActionTypes {
	CHANGE_CURRENCY = "@@Currency/CHANGE_CURRENCY",
}

export interface ICurrencyReducerAction {
	type: CurrencyStateActionTypes;
	currency: "usd";
}

export class CurrencyState {
	currentCurrency: "usd" = "usd";
	currencies: { value: string; label: string }[] = [
		{ value: "usd", label: "USD" },
	];
}

export const initialState: CurrencyState = new CurrencyState();

const currencyReducer = (
	state: CurrencyState = initialState,
	action: ICurrencyReducerAction,
): CurrencyState => {
	switch (action.type) {
		case CurrencyStateActionTypes.CHANGE_CURRENCY:
			return {
				...state,
				currentCurrency: action.currency,
			};
		default:
			return {
				...state,
			};
	}
};

export default currencyReducer;
