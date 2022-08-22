import { FcCard } from "@components/fc-cards";
import { useTheme } from "@material-ui/core";

export function FcCardWalletBalance(props: {
  value: number;
  description: string;
}) {
  const { value, description } = props;
  const theme = useTheme();
  function onClick() {
    return null;
  }
  return (
    <FcCard
      onClick={onClick}
      value={value}
      description={description}
      legendColor={theme.palette.text.primary}
    />
  );
}
