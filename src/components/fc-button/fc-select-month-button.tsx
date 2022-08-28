import Menu from "../fc-forms/fc-menu-tem/fc-menu-item";
import { Box } from "@material-ui/core";
import { monthNames } from "common";
import { useCurrentTime } from "@hooks/use-current-time";
import { FcTextField } from "../fc-forms/fc-fields";

export function FcSelectMonthButton() {
  const { month, setMonth } = useCurrentTime();

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  const months = Menu(
    monthNames.map((item, i) => {
      return {
        id: i,
        descricao: item,
      };
    })
  );

  return (
    <Box>
      <FcTextField
        id="fc-select-month-button"
        value={month}
        onChange={handleChange}
        select
      >
        {months}
      </FcTextField>
    </Box>
  );
}
