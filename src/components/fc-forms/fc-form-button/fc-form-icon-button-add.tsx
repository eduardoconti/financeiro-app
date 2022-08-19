import { useTheme } from "@material-ui/core";
import FcIconButton from "../../fc-button/fc-icon-button";
import AddIcon from "@material-ui/icons/Add";
export function FcFormIconButtonAdd(props: any) {
  const theme = useTheme();
  const { onClick, disabled = false, ...rest } = props;
  return (
    <FcIconButton
      color={theme.palette.success.main}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <AddIcon fontSize="large" />
    </FcIconButton>
  );
}
