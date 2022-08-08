import { CategoryResponseDTO } from "api/category/dto";
import { SubCategoryResponseDTO } from "api/sub-category/dto";
import { WalletResponseDTO } from "api/wallet/dto";

export class ExpenseResposeDTO {
  id?: number;
  userId?: string;
  descricao!: string;
  categoria!: CategoryResponseDTO;
  subCategory!: SubCategoryResponseDTO;
  carteira!: WalletResponseDTO;
  valor!: number;
  instalment!: number;
  vencimento?: Date | string;
  pagamento?: Date | string;
  updatedAt?: Date | string;
  pago?: boolean;

  constructor(
    descricao: string,
    valor: number,
    categoria: CategoryResponseDTO,
    subCategory: SubCategoryResponseDTO,
    carteira: WalletResponseDTO,
    instalment: number,
    userId?: string,
    vencimento?: Date | string,
    pagamento?: Date | string,
    pago?: boolean,
    updatedAt?: Date | string,
  ) {
    this.userId = userId;
    this.descricao = descricao;
    this.valor = valor;
    this.categoria = categoria;
    this.carteira = carteira;
    this.vencimento = vencimento;
    this.pagamento = pagamento;
    this.instalment = instalment;
    this.pago = pago;
    this.updatedAt = updatedAt;
    this.subCategory = subCategory;
  }

  static build = ({
    userId,
    descricao,
    valor,
    categoria,
    subCategory,
    carteira,
    vencimento,
    pagamento,
    pago,
    updatedAt,
    instalment,
  }: ExpenseResposeDTO): ExpenseResposeDTO => {
    return new ExpenseResposeDTO(
      descricao,
      valor,
      categoria,
      subCategory,
      carteira,
      instalment,
      userId,
      vencimento,
      pagamento,
      pago,
      updatedAt,
    );
  };
}
