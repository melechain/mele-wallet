import { accountSaga } from "./account-saga";
export const rootSaga = function* handleMessage(
	params: any,
): IterableIterator<any> {
	yield accountSaga(params);
};
