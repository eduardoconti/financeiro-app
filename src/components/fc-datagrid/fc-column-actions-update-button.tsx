import { useTheme } from "@material-ui/core";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import FcIconButton from "components/fc-button/fc-icon-button";

export default function ActionUpdateButon(props: {
  onClick: () => void
  style?: React.CSSProperties
}) {
  const theme = useTheme();
  const { onClick, style } = props;
  return (
    <FcIconButton
      aria-label="alterar"
      style={{ padding: 2, ...style }}
      color={theme.palette.primary.main}
      onClick={onClick}
    >
      <CreateTwoToneIcon />
    </FcIconButton>
  );
}
