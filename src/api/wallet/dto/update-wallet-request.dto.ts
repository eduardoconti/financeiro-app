export class UpdateWalletRequestDTO {
  id: number;
  description?: string;
  active?: boolean

  private constructor(id: number, active?: boolean, description?: string) {
    this.description = description;
    this.id = id;
    this.active = active
  }

  static build = ({ description, id , active}: UpdateWalletRequestDTO): UpdateWalletRequestDTO => {
    return new UpdateWalletRequestDTO(id, active, description);
  };
}
