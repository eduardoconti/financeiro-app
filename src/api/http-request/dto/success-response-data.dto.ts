
import { HttpInternalMessages, HttpStatus } from 'common/enum';

export type SuccessResponseData<D> = {
  data:D
  status: HttpStatus
  message?: string 
  internalMessage?: HttpInternalMessages
}
