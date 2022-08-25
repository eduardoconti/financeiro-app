import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonDelete from "@components/fc-forms/fc-form-button/fc-form-icon-button-delete";
import { useSpin } from "@hooks/use-spin";
import {
  useTransference,
  useFormTransference,
} from "@pages/transference/hooks";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export function FcFormButtonDeleteTransference() {
  const { deleteTransference, transferences } = useTransference(
    (s) => ({
      deleteTransference: s.deleteTransference,
      transferences: s.transferences,
    }),
    shallow
  );
  const { id, clearAllFields: clear } = useFormTransference(
    (s) => ({
      id: s.id,
      clearAllFields: s.clearAllFields,
    }),
    shallow
  );
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  const onClick = async () => {
    try {
      setSpin(true);
      const transference = transferences.find((e) => e.id === id);
      if (!transference) return;
      const { status, message, internalMessage } = await deleteTransference(id);

      setAlert(setCreatedAlert(status, message, internalMessage));
      clear();
    } catch (error: any) {
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
