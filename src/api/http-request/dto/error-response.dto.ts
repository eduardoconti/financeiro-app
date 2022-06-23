import { HttpStatus } from "common/enum";
import { ResponseDTO } from "./response.dto";
import { ValidationErrorDTO } from "./validation-error.dto";

export class ErrorResponseDTO extends ResponseDTO {
  public readonly detail?: string;
  public readonly invalidFields?: ValidationErrorDTO[];

  constructor(
    title: string,
    detail?: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    invalidFields?: ValidationErrorDTO[]
  ) {
    super(status, title);
    this.detail = detail;
    this.invalidFields = invalidFields;
  }
}
