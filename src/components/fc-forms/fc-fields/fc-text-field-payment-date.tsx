import { FcTextField, FcTextFieldProps } from "./fc-text-field";

export function FcTextFieldPaymentDate(props: Partial<FcTextFieldProps>) {
  return (
    <FcTextField
      id="pagamento"
      label="Pagamento"
      type="date"
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
}
