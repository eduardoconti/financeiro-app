import FcIconButton from "@components/fc-button/fc-icon-button";
import { useTheme } from "@material-ui/core";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

export default function ActionDeleteButon(props: any) {
  const theme = useTheme();
  let { onClick, ...rest } = props;

  return (
    <FcIconButton
      aria-label="excluir"
      color={theme.palette.error.light}
      onClick={onClick}
      {...rest}
    >
      <DeleteForeverTwoToneIcon />
    </FcIconButton>
  );
}
