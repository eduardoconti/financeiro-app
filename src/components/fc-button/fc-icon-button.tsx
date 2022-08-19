import { useTheme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { SpinContext } from "Context";
import { useContext } from "react";

export default function FcIconButton(props: any) {
  const { color, onClick, children, description, disabled = false, style, ...rest } = props;
  const { spin} = useContext(SpinContext);
  const theme = useTheme();
  return (
    <IconButton
      aria-label={description}
      style={{
        color: disabled || spin ? theme.palette.grey[400] : color,
        padding: 2,
        ...style,
      }}
      onClick={onClick}
      disabled={disabled || spin}
      {...rest}
    >
      {children}
    </IconButton>
  );
}
