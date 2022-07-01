import MenuItem from "@material-ui/core/MenuItem";

export default function Menu(obj) {
  return obj.map((obj, i) => {
    return (
      <MenuItem key={i} value={obj.id}>
        {obj.descricao}
      </MenuItem>
    );
  });
}
