import { HttpStatus } from "common/enum";

export class ResponseDataDto {
  constructor(
    public readonly status: HttpStatus,
    public readonly internalMessage?: string,
    public readonly message?: string,
  ) {}
}
