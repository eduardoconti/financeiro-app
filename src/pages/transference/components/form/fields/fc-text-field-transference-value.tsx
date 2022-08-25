import FcTextFieldValue from "@components/fc-forms/fc-fields/fc-text-field-value";
import { useFormTransference } from "@pages/transference/hooks";
import shallow from "zustand/shallow";
const NUMERIC_REGEXP = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;

export function FcTextFieldTransferenceValue() {
  const { value, setValue, invalidFields } = useFormTransference(
    (s) => ({
      value: s.value,
      setValue: s.setValue,
      invalidFields: s.invalidFields,
    }),
    shallow
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (value && !value.match(NUMERIC_REGEXP)) {
      return;
    }
    setValue(value);
  };

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "valor";
  });

  return (
    <FcTextFieldValue
      value={value}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
    />
  );
}
