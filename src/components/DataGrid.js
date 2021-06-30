import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";

export default function Browser(props) {
  return (
    <Box className="DataGrid">
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        rowHeight={26}
        hideFooterSelectedRowCount
        hideFooterRowCount
        disableColumnMenu
        hideFooter
        hideFooterPagination
      />
    </Box>
  );
}
