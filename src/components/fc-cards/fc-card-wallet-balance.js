import React from "react";

import FcCard from "./fc-card";

export default function FcCardWalletBalance(props) {
  const { value, description } = props;
  function onClick() {
    return null;
  }
  return (
    <FcCard
      onClick={onClick}
      value={value}
      description={description}
      legendColor="#FFF"
    />
  );
}
