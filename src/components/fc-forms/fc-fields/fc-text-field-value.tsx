import { FcTextField, FcTextFieldProps } from "./fc-text-field";

export default function FcTextFieldValue(props: Partial<FcTextFieldProps>) {
  const { id, ...rest } = props;
  return <FcTextField id={id ?? "text-field-value"} label="Valor" {...rest} />;
}
