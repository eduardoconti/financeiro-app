import { useEffect, useState, useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";
import { isAuthenticated } from "../../../common/Auth";
import { SubCategoryService } from "api/sub-category/service";
import { SubCategoryResponseDTO } from "api/sub-category/dto";
import { MenuItem } from "@material-ui/core";

export default function FcSelectFieldSubCategory() {
  const [subCategories, setSubCategories] = useState<SubCategoryResponseDTO[]>([]);
  const { form, setForm } = useContext(ContextForm);

  useEffect(() => {
    async function fetchData() {
      const service = new SubCategoryService();
      const { data } = await service.getAll();
      setSubCategories(data.filter(item => item.categoryId === form.categoriaId));
    }
    if (isAuthenticated()) {
      fetchData();
    }
  }, [form.categoriaId]);

  const Menu = () => {
    return subCategories.map((obj: SubCategoryResponseDTO, i: number) => {
      return (
        <MenuItem key={i} value={obj.id}>
          {obj.description}
        </MenuItem>
      );
    });
  }
  return (
    <TextField
      id="subCategoryId"
      label="Sub Categoria"
      variant="outlined"
      size="small"
      fullWidth
      value={form.subCategoryId ?? ""}
      select
      onChange={(event) => {
        setForm({ ...form, subCategoryId: event.target.value });
      }}
    >
      {Menu()}
    </TextField>
  );
}
