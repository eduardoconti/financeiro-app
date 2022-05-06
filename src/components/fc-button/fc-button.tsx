import { useState } from "react";
import Button from "@material-ui/core/Button";
import SpinCircular from "components/fc-spin/fc-spin";

export default function FcButton(props: any) {
  const { description, onClick, className } = props;
  const [spin, setSpin] = useState(false);
  return (
    <Button
      variant="contained"
      size="small"
      onClick={async () => {
        setSpin(true);
        await onClick();
        setSpin(false);
      }}
      className={className}
    >
      {spin ? <SpinCircular size={20} color="secondary" /> : description}
    </Button>
  );
}
