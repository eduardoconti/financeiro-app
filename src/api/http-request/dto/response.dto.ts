import { HttpStatus } from "common/enum";

export class ResponseDTO {
  constructor(
    public readonly status: HttpStatus,
    public readonly title?: string
  ) {}
}
