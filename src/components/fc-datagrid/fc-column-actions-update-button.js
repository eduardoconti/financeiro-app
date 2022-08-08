import { useTheme } from "@material-ui/core";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import FcIconButton from "components/fc-button/fc-icon-button";

export default function ActionUpdateButon(props) {
  const theme = useTheme();
  const { onClick } = props;
  return (
    <FcIconButton
      aria-label="alterar"
      style={{ padding: 2 }}
      color={theme.palette.primary.main}
      onClick={onClick}
    >
      <CreateTwoToneIcon />
    </FcIconButton>
  );
}
