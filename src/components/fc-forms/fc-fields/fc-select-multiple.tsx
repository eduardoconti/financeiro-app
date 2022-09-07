import { FcTextField } from "./fc-text-field";
import Autocomplete from "@material-ui/lab/Autocomplete";

export function FcSelectMultiple(props: any) {
  const {
    options = [],
    placeHolder,
    getOptionLabel,
    onChange,
    defaultValue,
    ...rest
  } = props;

  return (
    <Autocomplete
      multiple
      id="FcSelectMultiple"
      size="small"
      options={options}
      getOptionLabel={getOptionLabel}
      filterSelectedOptions
      defaultValue={defaultValue}
      onChange={onChange}
      renderInput={(params) => {
        return (
          <FcTextField
            {...params}
            // placeholder={placeHolder}
            // value={value}
            {...rest}
          />
        );
      }}
    />
  );
}
