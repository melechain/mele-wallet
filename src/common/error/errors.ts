type ErrorType = {
	status: number;
	code: string;
	message?: string;
};

export class ThrowableError {
	public error: DefaultError;
	public cause?: any;

	constructor(error: DefaultError, cause?: any) {
		this.error = error;
		this.cause = cause;
	}
}

export class DefaultError {
	public status: number;
	public code: string;
	public message?: string;

	constructor(error: ErrorType) {
		this.status = error.status;
		this.code = error.code;
		this.message = error.message;
	}

	public throw(cause: any = null) {
		throw new ThrowableError(this, cause);
	}

	public build(error: any) {
		if (error.constructor.name === DefaultError.name) {
			return error;
		}
		return this;
	}

	public static build(error: ErrorType): DefaultError {
		return new DefaultError(error);
	}
}

export const Errors = {
	SERVER_CONNECTION_PROBLEM: DefaultError.build({
		status: -1,
		code: "SERVER_CONNECTION_PROBLEM",
	}),
	INVALID_RESPONSE: DefaultError.build({
		status: 500,
		code: "INTERNAL_SERVER_ERROR",
	}),
};
