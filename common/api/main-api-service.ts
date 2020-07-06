import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";

const getUrl = () => {
	if (typeof window !== "undefined") {
		return "";
	} else {
		return process.env.API_URL || "http://localhost:8005";
	}
};
// check if browser
export const API_URL = getUrl() + "/api";
// export const API_URL = "http://192.168.1.91:8005/api";

export interface ServiceRequestParam {
	timeout?: number;
	method?: Method;
	headers?: any;
	data?: any;
	path: string;
	authRequired: boolean;
	body?: FormData;
}

export default class MainApiService {
	protected request = async (p: ServiceRequestParam): Promise<any> => {
		const defaultHeaders: any = {
			Accept: "application/json",
		};

		if (!p.body) {
			defaultHeaders["Content-Type"] = "application/json";
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
		let result: AxiosResponse<any> = null;
		try {
			result = await axios({
				...fetchParam,
				url: API_URL + p.path,
			});
		} catch (e) {
			if (!e.response) {
				throw FrontErrors.SERVER_CONNECTION_PROBLEM.throw(e);
			}
			result = e.response;
		}

		let body = null;
		try {
			body = await result.data;
		} catch (e) {
			throw FrontErrors.INVALID_RESPONSE.throw();
		}

		if (!body) {
			throw FrontErrors.INVALID_RESPONSE.throw();
		}
		if (result.status < 200 || result.status > 299) {
			if (!body.success) {
				if (body.error.code == Errors.UNAUTHORIZED.code) {
					if (p.authRequired) {
						// if browser do stuff
						//window.location.replace("/");
					}
					throw Errors.UNAUTHORIZED.throw();
				}
				throw DefaultError.build(body.error).throw();
			}
			throw FrontErrors.SERVER_CONNECTION_PROBLEM.throw(body);
		}
		if (
			body.session &&
			MainApiService.reduxStore &&
			p.method.toLowerCase() !== "options"
		) {
			MainApiService.reduxStore.dispatch({
				type: "@@AUTH/UPDATE_SESSION",
				session: body.session,
			});
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
