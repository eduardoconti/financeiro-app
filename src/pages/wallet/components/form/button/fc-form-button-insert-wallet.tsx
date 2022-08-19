import { setCreatedAlert } from "@common/AlertFuncoes";
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { useWallet } from "@pages/wallet/hooks";
import { useFormWallet } from "@pages/wallet/hooks/use-form-wallet";
import { ContextAlert, SpinContext } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export function FcFormButtonInsertWallet() {
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useContext(SpinContext);
  const { form: { id, description }, setInvalidFields, clear } = useFormWallet((state) => (
    {
      form: state.form,
      setInvalidFields: state.setInvalidFields,
      clear: state.clearAllFields
    }
  ), shallow);
  const insert = useWallet((state) => state.insertWallet);
  const onClick = async () => {
    try {
      setSpin(true);
      const { status, message, internalMessage } = await insert({ id, descricao: description });
      setAlert(setCreatedAlert(status, message, internalMessage));
      clear();
    } catch (error: any) {
      setInvalidFields(error.invalidFields)
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  }

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={onClick}
    />
  );
}
