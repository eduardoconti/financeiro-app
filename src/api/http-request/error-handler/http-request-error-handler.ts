import { HttpStatus } from "common/enum";
import { ErrorResponseDTO } from "../dto";

export class HttpRequestErrorHandler {
  static handle(error: any): ErrorResponseDTO {
    if (error?.response?.data) {
      const {
        response: { data },
      } = error;
      return new ErrorResponseDTO(
        data.title,
        data.detail,
        data.status,
        data.invalidFields
      );
    }
    return new ErrorResponseDTO(
      "Internal Server Error",
      "",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
