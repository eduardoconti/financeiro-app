import { FcTextField, FcTextFieldProps } from "./fc-text-field";

export default function FcTextFieldDueDate(props: Partial<FcTextFieldProps>) {
  return (
    <FcTextField
      id="vencimento"
      label="Vencimento"
      type="date"
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
}
