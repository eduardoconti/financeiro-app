import { useEffect, useContext } from "react";
import FcDataGrid from "../fc-datagrid";
import FcColumnActionsCategory from "../../../pages/category/components/table/fc-columns-actions-category";
import FcColumnDescription from "../fc-column-description";
import { ContextCategory } from "pages/category/context/category-context";

export default function FcDataGridCategory() {
  const { categories } = useContext(ContextCategory);

  let columns = [
    new FcColumnDescription(),
    {
      field: "actions",
      headerName: "Operação",
      width: 140,
      sortable: false,
      renderCell: function operacoes(field) {
        return <FcColumnActionsCategory field={field} />;
      },
    },
  ];

  useEffect(() => {}, [categories]);

  return <FcDataGrid rows={categories} columns={columns} />;
}
