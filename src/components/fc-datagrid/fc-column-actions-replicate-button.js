import IconButton from "@material-ui/core/IconButton";
import ImportExportTwoToneIcon from "@material-ui/icons/ImportExportTwoTone";
import { useTheme } from "@material-ui/core";

export default function ActionReplicateButon(props) {
  const { onClick } = props;
  const theme = useTheme();

  return (
    <IconButton
      aria-label="transfere"
      style={{ padding: 2 }}
      color={theme.palette.success.dark}
      onClick={onClick}
    >
      <ImportExportTwoToneIcon />
    </IconButton>
  );
}
