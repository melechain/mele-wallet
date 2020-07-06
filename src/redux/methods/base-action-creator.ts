import { Action, Dispatch } from "redux";

export default class BaseActionCreator<ActionType, ActionData> {
	constructor(dispatch: Dispatch) {
		this.dispatch = dispatch as any;
	}

	protected dispatch(dispatch: { type: ActionType } & Partial<ActionData>) {}
}
