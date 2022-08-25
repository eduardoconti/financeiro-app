import { FcTextField, FcTextFieldProps } from "./fc-text-field";

export function FcTextFieldDescription(props: Partial<FcTextFieldProps>) {
  const { label, ...rest } = props;
  return <FcTextField id="descricao" label={label ?? "Descricao"} {...rest} />;
}
