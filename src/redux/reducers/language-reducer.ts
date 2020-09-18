import { Reducer, Action } from "redux";

export enum LanguageStateActionTypes {
	CHANGE_LANGUAGE = "@@Language/CHANGE_LANGUAGE",
}

export interface ILanguageReducerAction {
	type: LanguageStateActionTypes;
	language: "en" | "ar";
}

export class LanguageState {
	currentLanguage: "en" | "ar" = "en";
	languages: { value: string; label: string }[] = [
		{ value: "en", label: "English" },
		{ value: "ar", label: "Arabic" },
	];
}

export const initialState: LanguageState = new LanguageState();

const languageReducer = (
	state: LanguageState = initialState,
	action: ILanguageReducerAction,
): LanguageState => {
	switch (action.type) {
		case LanguageStateActionTypes.CHANGE_LANGUAGE:
			return {
				...state,
				currentLanguage: action.language,
			};
		default:
			return {
				...state,
			};
	}
};

export default languageReducer;
