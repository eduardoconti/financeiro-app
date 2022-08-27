import Menu from "../fc-forms/fc-menu-tem/fc-menu-item";
import { Box } from "@material-ui/core";
import { useCurrentTime } from "@hooks/use-current-time";
import shallow from "zustand/shallow";
import { FcTextField } from "../fc-forms/fc-fields";
import { getYear } from "@common/DateHelper";


export function FcSelectYearButton() {
  const { year, setYear } = useCurrentTime(
    (state) => ({ year: state.year, setYear: state.setYear }),
    shallow
  );

  const handleChange = (event: any) => {
    setYear(Number(event.target.value) || getYear());
  };

  const Years = Menu([
    { id: 2021, descricao: "2021" },
    { id: 2022, descricao: "2022" },
    { id: 2023, descricao: "2023" },
  ]);

  return (
    <Box>
      <FcTextField
        select
        id="year-button"
        value={year}
        onChange={handleChange}
      >
        {Years}
      </FcTextField>
    </Box>
  );
}
