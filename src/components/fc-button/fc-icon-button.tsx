import { useTheme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { SpinContext } from "Context";
import { useEffect } from "react";
import { useContext } from "react";

export default function FcIconButton(props: any) {
  const { color, onClick, children, description, disabled = false } = props;
  const { spin, setSpin } = useContext(SpinContext);
  const theme = useTheme();
  useEffect(() => {
  }, [spin]);
  const onClickSpin = () => {
    setSpin(true);
    onClick();
    setSpin(false);
  }
  return (
    <IconButton
      aria-label={description}
      style={{ color: (disabled || spin) ? theme.palette.grey[400] : color, padding: 2 }}
      onClick={onClickSpin}
      disabled={disabled || spin}
    >
      {children}
    </IconButton>
  );
}
