import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import SpinCircular from "../fc-spin/fc-spin";
export default function FcButton(props) {
  const { description, onClick, className } = props;
  const [spin, setSpin] = useState(false);
  return (
    <Button
      variant="contained"
      size="small"
      onClick={async() => {
        setSpin(true);
        onClick();
        //await new Promise(r => setTimeout(r, 1000));
        setSpin(false);

      }}
      className={className}
    >
      {spin ? <SpinCircular size={20} color="secondary"/> :  description }
    </Button>
  );
}
