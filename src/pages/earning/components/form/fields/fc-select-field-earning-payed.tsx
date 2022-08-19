import { FcSelectFieldPayed } from "@components/fc-forms/fc-fields";
import { useFormEarning } from "@pages/earning/hooks";
import shallow from "zustand/shallow";

export function FcSelectFieldEarningPayed() {
  const { payed, setForm, invalidFields } = useFormEarning((state) => (
    {
      payed: state.payed,
      setForm: state.setPayed,
      invalidFields: state.invalidFields
    }), shallow);

  const onChange = (e: any) => {
    setForm(Boolean(e.target.value));
  }

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "pago";
  });
  
  return (
    <FcSelectFieldPayed value={payed} onChange={onChange} invalidFields={invalidFieldMessage} />
  )
}