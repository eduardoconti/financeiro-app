import Button from "@material-ui/core/Button";
import SpinCircular from "components/fc-spin/fc-spin";
import { useSpin } from "@hooks/use-spin";

export default function FcButton(props: any) {
  const { description, onClick, className, ...rest } = props;
  const { spin } = useSpin();
  return (
    <Button
      variant="contained"
      size="small"
      onClick={onClick}
      className={className}
      disabled={spin}
      {...rest}
    >
      {spin ? <SpinCircular size={20} color="secondary" /> : description}
    </Button>
  );
}
