import { HttpErrorResponse } from '@angular/common/http';
import { ErrorModel } from '../models/error.model';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { JsonHelper } from './json.helper';
import { ErrorInterface } from '../interfaces/error.interface';

export class ErrorHelper {
  public static createErrorModelFromHttpError(error: HttpErrorResponse): ErrorModel<void, HttpErrorResponse> {
    const parsedErrorBody: KeyValueInterface<any> = JsonHelper.parse(error.error);

    return new ErrorModel<void, HttpErrorResponse>({
      description: parsedErrorBody.description,
      error
    } as ErrorInterface<void, HttpErrorResponse>);
  }
}
