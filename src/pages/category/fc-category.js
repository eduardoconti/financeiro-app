import React from "react";
import { emptyFormularioCategoria } from "../../common/EmptyStates";
import CorpoCategorias from "./fc-category-body";
import { FormProvider } from "../../Context/FormContext";

export default function FcCategory() {
  return (
    <FormProvider form={emptyFormularioCategoria}>
      <CorpoCategorias />
    </FormProvider>
  );
}
