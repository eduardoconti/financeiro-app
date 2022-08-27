import FcIconButton from "@components/fc-button/fc-icon-button";
import { useTheme } from "@material-ui/core";

import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
export default function FcFormIconButtonDelete(props: any) {
  const theme = useTheme();
  const { onClick, disabled, ...rest } = props;

  return (
    <FcIconButton
      color={theme.palette.error.light}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <DeleteForeverTwoToneIcon fontSize="large" />
    </FcIconButton>
  );
}
