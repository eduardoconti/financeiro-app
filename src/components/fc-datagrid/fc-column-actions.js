import React from "react";
export default function FcColumnActions(props) {
  const { children } = props;
  return {
    field: "actions",
    headerName: "Operação",
    width: 140,
    sortable: false,
    renderCell: function operations(field) {
      return children;
    },
  };
}
