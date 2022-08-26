import React from "react";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { CategoryResponseDTO } from "api/category/dto";
import FcColumnActionsCategory from "pages/category/components/table/fc-columns-actions-category";
import FcColumnActionsSubCategory from "./fc-columns-actions-sub-category";
import { useMemo } from "react";
import { useCategory } from "@pages/category/hook";
const defaultTheme = createTheme();
const useRowStyles = makeStyles(
  (theme) => {
    return {
      root: {
        "& .MuiTableCell-body": {
          borderBottom: 0,
          padding: theme.spacing(0),
        },
        "& .MuiTableCell-root": {
          borderBottom: 0,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        },
        "& .MuiTableCell-head": {
          borderBottom: 0,
        },
      },
    };
  },
  { defaultTheme }
);

interface RowProps {
  row: CategoryResponseDTO;
}
function Row(props: RowProps) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const existsSubCategories = useMemo(() => {
    return row.subCategories && row.subCategories.length > 0;
  }, [row.subCategories]);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{ width: "10%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            disabled={!existsSubCategories}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.descricao}
        </TableCell>
        <TableCell align="right">
          <FcColumnActionsCategory field={row} />
        </TableCell>
      </TableRow>
      <TableRow className={classes.root}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: "none" }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table aria-label="purchases">
              <TableBody>
                {row.subCategories.map((subCategory) => (
                  <TableRow key={subCategory.id}>
                    <TableCell style={{ width: "10%" }} />
                    <TableCell component="th" scope="row">
                      <li>{subCategory.description}</li>
                    </TableCell>
                    <TableCell align="right">
                      <FcColumnActionsSubCategory field={subCategory} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function FcTableCategory(): JSX.Element {
  const categories = useCategory(s => s.categories)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Descricao</TableCell>
            <TableCell align="right">Operação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => {
            return <Row key={category.id} row={category} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
