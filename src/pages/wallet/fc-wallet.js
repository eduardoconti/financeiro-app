import React from "react";
import {
  emptyFormularioCarteira,
} from "../../common/EmptyStates";
import CorpoCarteiras from "./fc-wallet-body";
import { FormProvider } from "../../Context/FormContext";

export default function FcWallet() {
  return (
    <FormProvider form={emptyFormularioCarteira}>
      <CorpoCarteiras />
    </FormProvider>
  );
}
