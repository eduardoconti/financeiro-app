import Button from "@material-ui/core/Button";
import SpinCircular from "components/fc-spin/fc-spin";
import { useSpin } from "@hooks/use-spin";

export type FcButton = {
  
}
export default function FcButton(props: any) {
  const { description, onClick, className } = props;
  const { spin } = useSpin();
  return (
    <Button
      variant="contained"
      size="small"
      onClick={onClick}
      className={className}
      disabled={spin}
    >
      {spin ? <SpinCircular size={20} color="secondary" /> : description}
    </Button>
  );
}
