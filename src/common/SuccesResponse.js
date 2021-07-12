export class ResponseData {
  constructor(data, status, message) {
    this.data = data;
    this.status = status;
    this.message = message;

    if (this.status >= 400) {
    }
  }
}
