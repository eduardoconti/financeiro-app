import { useTheme } from "@material-ui/core";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import FcIconButton from "components/fc-button/fc-icon-button";

export  function FcIconButtonFlagPayed(props: any) {
  const theme = useTheme();
  const { onClick, payed, size="medium" } = props;
  return (
    <FcIconButton
      aria-label="pago"
      color={payed ? theme.palette.success.dark : theme.palette.error.light}
      onClick={onClick}
    >
      <FiberManualRecordTwoToneIcon fontSize={size}/>
    </FcIconButton>
  );
}
