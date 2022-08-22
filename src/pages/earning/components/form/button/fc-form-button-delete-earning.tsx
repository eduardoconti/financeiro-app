import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonDelete from "@components/fc-forms/fc-form-button/fc-form-icon-button-delete";
import { useEarning, useFormEarning } from "@pages/earning/hooks";
import { ContextAlert, SpinContext } from "Context";
import { useContext } from "react";

export function FcFormButtonDeleteEarning() {
  const { deleteEarning } = useEarning();
  const { id, setInvalidFields, clearAllFields: clear } = useFormEarning();
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useContext(SpinContext);
  const onClick = async () => {
    try {
      const { status, message, internalMessage } = await deleteEarning(id);
      setAlert(setCreatedAlert(status, message, internalMessage));
      clear();
    } catch (error: any) {
      setInvalidFields(error.invalidFields);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return (
    <FcFormIconButtonDelete
      description="delete"
      disabled={id === 0}
      onClick={onClick}
    />
  );
}
