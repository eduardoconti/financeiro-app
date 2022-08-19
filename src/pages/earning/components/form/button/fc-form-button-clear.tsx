import FcFormIconButtonClear from "@components/fc-forms/fc-form-button/fc-form-icon-button-clear";
import { useFormEarning } from "@pages/earning/hooks";

export default function FcFormButtonClearEarning() {
  const clear = useFormEarning((state) => state.clearAllFields)
  const onClick = () => {
    clear();
  }
  return <FcFormIconButtonClear description="limpar" onClick={onClick} />;
}
