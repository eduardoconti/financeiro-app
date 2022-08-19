import { FcTextFieldDescription } from "@components/fc-forms/fc-fields";
import { useFormEarning } from "@pages/earning/hooks";
import shallow from "zustand/shallow";

export function FcTextFiealEarningDescription() {
  const { description, setForm, invalidFields } = useFormEarning((state) => (
    {
      description: state.description,
      setForm: state.setDescription,
      invalidFields: state.invalidFields
    }), shallow);

  const onChange = (e: any) => {
    setForm(e.target.value);
  }

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "descricao";
  });

  return (
    <FcTextFieldDescription value={description} onChange={onChange} invalidFields={invalidFieldMessage} />
  )
}