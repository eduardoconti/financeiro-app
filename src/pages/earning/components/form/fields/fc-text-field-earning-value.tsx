import FcTextFieldValue from "@components/fc-forms/fc-fields/fc-text-field-value";
import { useFormEarning } from "@pages/earning/hooks";
import shallow from "zustand/shallow";

export function FcTextFieldEarningValue() {
  const { value, setForm, invalidFields } = useFormEarning((state) => (
    {
      value: state.value,
      setForm: state.setValue,
      invalidFields: state.invalidFields
    }), shallow);

  const onChange = (e: any) => {
    setForm(e.target.value);
  }

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "valor";
  });

  return (
    <FcTextFieldValue value={value} onChange={onChange} invalidFields={invalidFieldMessage} />
  )
}