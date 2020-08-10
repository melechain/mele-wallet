import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";
import { Errors } from "../error/errors";

declare const global: {};

const getUrl = () => {
	return "https://api.dev.melechain.com";
};

export const API_URL = getUrl();

export interface ServiceRequestParam {
	timeout?: number;
	method?: Method;
	headers?: any;
	data?: any;
	path: string;
	body?: FormData;
}

export default class MainApiService {
	public static APPLICATION_STORE: {
		dispatch: (p: { type: any }) => {};
		getState: () => {
			account: {
				account?: {
					bearer: string;
					bearerExp: string;
				};
			};
		};
	};

	protected request = async (p: ServiceRequestParam): Promise<any> => {
		if (!MainApiService.APPLICATION_STORE) {
			throw "init the APPLICAITON STORE FIRST!";
		}

		const defaultHeaders: any = {
			Accept: "application/json",
		};

		if (!p.body) {
			defaultHeaders["Content-Type"] = "application/json";
		}

		if (MainApiService.APPLICATION_STORE.getState().account.account) {
			defaultHeaders["Authorization"] = `Bearer ${
				MainApiService.APPLICATION_STORE.getState().account.account!.bearer
			}`;
		}

		const fetchParam: AxiosRequestConfig = {
			method: p.method,
			headers: { ...defaultHeaders, ...p.headers },
		};
		if (p.data) {
			fetchParam.data = JSON.stringify(p.data);
		}
		if (p.body) {
			fetchParam.data = p.body;
		}
		let result: AxiosResponse<any>;
		try {
			result = await axios({
				...fetchParam,
				url: API_URL + p.path,
			});
		} catch (e) {
			if (!e.response) {
				throw Errors.SERVER_CONNECTION_PROBLEM.throw(e);
			}
			if (e.response.status == 401) {
				throw Errors.UNAUTHORIZED;
			}
			result = e.response;
		}
		const body = await result.data;

		if (result.status < 200 || result.status > 299) {
			//TODO hadnle all the edge cases here (unauthorized, ..., ...)
			if (result.status == 401) {
				MainApiService.APPLICATION_STORE.dispatch({
					type: "@@ACCOUNT/LOG_OUT_SUCCESSFUL",
				});
			}

			throw Errors.SERVER_CONNECTION_PROBLEM.throw(body);
		}
		return { body: body, result: result };
	};

	protected post = async (p: ServiceRequestParam) => {
		p.method = "POST";
		const resp = await this.request(p);
		return resp.body;
	};

	protected patch = async (p: ServiceRequestParam) => {
		p.method = "PATCH";
		const resp = await this.request(p);
		return resp.body;
	};

	protected get = async (p: ServiceRequestParam) => {
		p.method = "GET";
		const resp = await this.request(p);
		return resp.body;
	};

	protected delete = async (p: ServiceRequestParam) => {
		p.method = "DELETE";
		const resp = await this.request(p);
		return resp.body;
	};

	protected put = async (p: ServiceRequestParam) => {
		p.method = "PUT";
		const resp = await this.request(p);
		return resp.body;
	};
}
