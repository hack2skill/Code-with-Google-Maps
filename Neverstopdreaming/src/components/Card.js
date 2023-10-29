import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SpeedIcon from "@mui/icons-material/Speed";

//Card that displays panel count and yearly energy for building insights
export default function InfoCard(props) {
  const solarConfigs = props.response.data.solarPotential.solarPanelConfigs;

  function getEnergyDetails() {
    for (let config in solarConfigs) {
      if (solarConfigs[config].panelsCount === props.count) {
        return Math.round(solarConfigs[config].yearlyEnergyDcKwh);
      }
    }
  }

  return (
    <div>
      <Card sx={{ minWidth: 275, borderRadius: "10px", width: "fit-content" }}>
        <CardContent sx={{}}>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            {/* Display Panel count */}
            <div style={{ padding: "10px" }}>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Panels Count
              </Typography>
              <SpeedIcon sx={{ marginLeft: "20%", fontSize: 40 }} />
              <div style={{ display: "flex" }}>
                <Typography sx={{ fontSize: 24 }} color="#4285f4" gutterBottom>
                  {props.count < 4 ? 4 : props.count}
                </Typography>
                <Typography sx={{ fontSize: 24 }} gutterBottom>
                  / {props.max}
                </Typography>
              </div>
            </div>

            <hr />

            {/* Display Yearly energy */}
            <div style={{ padding: "10px" }}>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Yearly Energy
              </Typography>
              <SpeedIcon sx={{ marginLeft: "20%", fontSize: 40 }} />
              <div style={{ display: "flex" }}>
                <Typography sx={{ fontSize: 24 }} color="#51bc16" gutterBottom>
                  {getEnergyDetails()}
                </Typography>
                <Typography
                  sx={{ fontSize: 24, paddingLeft: "7px" }}
                  gutterBottom
                >
                  kwh
                </Typography>
              </div>
            </div>
          </div>

          {/* Button to view Solar Potential information */}
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                props.setMoreInfo(!props.moreInfo);
              }}
            >
              {props.moreInfo
                ? "Hide Solar Potential"
                : "Solar Potential Details"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
