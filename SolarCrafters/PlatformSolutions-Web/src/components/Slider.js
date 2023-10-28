import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";

const Input = styled(MuiInput)`
  width: 42px;
`;

// Slider to change panel count value
export default function InputSlider(props) {
  const [value, setValue] = React.useState(4);

  const handleSliderChange = (event, newValue) => {
    if (newValue < 4) {
      setValue(4);
    } else {
      setValue(newValue);
    }
    props.setCount(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
    props.setCount(
      event.target.value === ""
        ? 0
        : event.target.value < 4
        ? 4
        : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > props.maxPanels) {
      setValue(props.maxPanels);
    } else if (value < 4) {
      setValue(4);
    } else {
      setValue(0);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <CalendarViewMonthIcon sx={{ color: "#3676e8" }} />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={props.maxPanels}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: props.maxPanels,
              type: "text",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
