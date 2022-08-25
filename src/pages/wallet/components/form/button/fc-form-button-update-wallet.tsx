import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonUpdate from "@components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { useWallet } from "@pages/wallet/hooks";
import { useFormWallet } from "@pages/wallet/hooks/use-form-wallet";
import { ContextAlert, SpinContext } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export default function FcFormButtonUpdateWallet() {
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useContext(SpinContext);
  const {
    form: { id, description },
    setInvalidFields,
    clear,
  } = useFormWallet(
    (state) => ({
      form: state.form,
      setInvalidFields: state.setInvalidFields,
      clear: state.clearAllFields,
    }),
    shallow
  );
  const update = useWallet((state) => state.updateWallet);
  const onClick = async () => {
    try {
      const { status, message, internalMessage } = await update({
        id,
        descricao: description,
      });
      setAlert(setCreatedAlert(status, message, internalMessage));
      clear();
    } catch (error: any) {
      setInvalidFields(error.invalidFields);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };

  return <FcFormIconButtonUpdate description="alterar" onClick={onClick} />;
}
