import { FcTextField } from "./fc-text-field";
import Autocomplete from '@material-ui/lab/Autocomplete';

export function FcSelectMultiple(props: any) {
  const {
    value = "",
    options = [],
    placeHolder,
    getOptionLabel,
    onChange,
    ...rest
  } = props;

  return (
    <Autocomplete
      multiple
      id="FcSelectMultiple"
      options={options}
      getOptionLabel={getOptionLabel}
      filterSelectedOptions
      onChange={onChange}
      renderInput={(params) => {
        return (
          <FcTextField
            {...params}
            placeholder={placeHolder}
            value={value}
            {...rest}
          />
        )
      }}
    />

  );
}
