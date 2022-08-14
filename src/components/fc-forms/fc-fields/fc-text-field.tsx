import { TextField, Typography } from "@material-ui/core";
import { ValidationErrorDTO } from "api/http-request/dto";

export type FcTextFieldProps = {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  required?: boolean;
  variant?: string;
  size?: string;
  fullWidth?: boolean;
  invalidFields?: ValidationErrorDTO[];
  children?: React.ReactNode;
  select?: boolean;
};
export function FcTextField(props: FcTextFieldProps) {
  const {
    variant,
    size,
    fullWidth = true,
    invalidFields,
    children,
    ...rest
  } = props;

  const helperText = () => {
    return invalidFields?.map((field, i) => {
      return (
        <Typography component={"span"} variant={"body2"} key={i}>
          {field.reason}
        </Typography>
      );
    });
  };
  return (
    <TextField
      error={invalidFields !== undefined && invalidFields.length > 0}
      variant="outlined"
      size="small"
      fullWidth={fullWidth}
      helperText={helperText()}
      {...rest}
    >
      {children}
    </TextField>
  );
}
