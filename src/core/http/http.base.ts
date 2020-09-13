
export class TValidationError {
  message: string;
  members: string[];
}

export class TError {
  code = 0;
  message: string;
  details: string;
  validationErrors: TValidationError[];
}

export class TResult<T> {
  result: T;
  targetUrl = '';
  success = true;
  error: TError;
  unAuthorizedRequest = true;
  __tserver = true;
}