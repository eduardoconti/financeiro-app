import React, { useContext } from "react";

import CorpoCategorias from "./CorpoCategorias";
import CorpoDespesas from "./CorpoDespesas";
import CorpoReceitas from "./CorpoReceitas";
import CorpoCarteiras from "./CorpoCarteiras";
import CorpoSaldo from "./CorpoSaldo";
import CorpoTransferencias from "./CorpoTransferencias";
import * as Constants from "../common/Constantes";
import { FormProvider } from "../Context/FormContext";
import { ContextAnoMes } from "../Context/AnoMesContext";
import {
  emptyFormularioDespesa,
  emptyFormularioReceita,
} from "../common/EmptyStates";
import AlertComponent from "./Alert";

export default function CurrentBody({ stateCurrentBody }) {
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  if (stateCurrentBody === Constants.CORPO_DESPESAS) {
    return (
      <FormProvider form={emptyFormularioDespesa(stateAnoAtual, stateMesAtual)}>
        <AlertComponent />
        <CorpoDespesas />
      </FormProvider>
    );
  } else if (stateCurrentBody === Constants.CORPO_RECEITAS) {
    return (
      <FormProvider form={emptyFormularioReceita(stateAnoAtual, stateMesAtual)}>
        <AlertComponent />
        <CorpoReceitas />
      </FormProvider>
    );
  } else if (stateCurrentBody === Constants.CORPO_CATEGORIAS) {
    return <CorpoCategorias />;
  } else if (stateCurrentBody === Constants.CORPO_CARTEIRAS) {
    return <CorpoCarteiras />;
  } else if (stateCurrentBody === Constants.CORPO_SALDO) {
    return <CorpoSaldo />;
  } else if (stateCurrentBody === Constants.CORPO_TRANSFERENCIAS) {
    return <CorpoTransferencias />;
  } else if (stateCurrentBody === Constants.CORPO_BALANCO) {
    return (
      <AlertComponent
        alert={{
          isOpen: true,
          title: "Alerta",
          type: "warning",
          message: "Em Desenvolvimento",
        }}
        setAlert={() => {}}
      />
    );
  }
}
