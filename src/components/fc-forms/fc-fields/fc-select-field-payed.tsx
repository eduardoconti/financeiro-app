import Menu from "../fc-menu-tem/fc-menu-item";
import { FcTextField, FcTextFieldProps } from "./fc-text-field";
export function FcSelectFieldPayed(props: Partial<FcTextFieldProps>) {
  const options = [
    { id: false, descricao: "Aberto" },
    { id: true, descricao: "Pago" },
  ];

  return (
    <FcTextField
      id="pago"
      label="Pago"
      select
      {...props}
    >
      {Menu(options)}
    </FcTextField>
  );
}
