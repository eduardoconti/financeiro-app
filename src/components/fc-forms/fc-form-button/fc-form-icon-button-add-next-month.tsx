import FcIconButton from "@components/fc-button/fc-icon-button";
import { useTheme } from "@material-ui/core";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";

export default function FcFormIconButtonAddNextMonth(props: any) {
  const theme = useTheme();
  const { onClick, disabled, ...rest } = props;

  return (
    <FcIconButton
      color={theme.palette.success.main}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <ArrowForwardIosTwoToneIcon fontSize="large" />
    </FcIconButton>
  );
}
