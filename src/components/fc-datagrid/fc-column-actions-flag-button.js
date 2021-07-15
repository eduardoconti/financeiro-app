import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import { SpinContext } from "../../Context/SpinContext";
import { ContextAlert } from "../../Context/AlertContext";
import { setCreatedAlert } from "../../common/AlertFuncoes";

export default function ActionFlagButon(props) {
  const theme = useTheme();
  const { onClick, payed } = props;
  const ctxSpin = useContext(SpinContext);
  const ctxAlert = useContext(ContextAlert);

  return (
    <IconButton
      aria-label="pago"
      style={{
        color: payed ? theme.palette.secondary.dark : theme.palette.error.main,
        padding: 2,
      }}
      onClick={async () => {
        ctxSpin.setSpin(true);
        const { statusCode, message, internalMessage } = await onClick();
        ctxAlert.setAlert(
          setCreatedAlert(statusCode, message, internalMessage)
        );

        ctxSpin.setSpin(false);
      }}
    >
      <FiberManualRecordTwoToneIcon />
    </IconButton>
  );
}
