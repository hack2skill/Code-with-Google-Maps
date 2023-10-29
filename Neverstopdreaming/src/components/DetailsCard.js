import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import PlaceIcon from "@mui/icons-material/Place";
import Co2Icon from "@mui/icons-material/Co2";
import TimelineIcon from "@mui/icons-material/Timeline";
import BoltIcon from "@mui/icons-material/Bolt";
import Crop169Icon from "@mui/icons-material/Crop169";
import LightModeIcon from "@mui/icons-material/LightMode";
import ImageAspectRatioIcon from "@mui/icons-material/ImageAspectRatio";
import SolarPower from "@mui/icons-material/SolarPower";
import BarChart from "./BarChart";
import "../styles/CardStyles.css";

//Card displaying Solar Potential information of the building
export default function DetailsCard(props) {
  return (
    <Card sx={{ minWidth: 275, borderRadius: "5px", width: "fit-content" }}>
      <CardContent sx={{}}>
        <Typography sx={{ mb: 1.5, textAlign: "center" }} color="#1b4552">
          Solar Potential of the Building
        </Typography>

        <hr width="70%" color="#cccccc" />

        {/* Displaying all the important values of solar potential */}
        <div className="elements">
          <div className="flex">
            <PlaceIcon sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px" }}
              color="text.secondary"
            >
              Latitude:
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.center.latitude}
          </Typography>
        </div>

        <div className="elements">
          <div className="flex">
            <PlaceIcon sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              Longitude:
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.center.longitude}
          </Typography>
        </div>

        <div className="elements">
          <div className="flex">
            <PublicIcon sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              Region:
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.administrativeArea},
            {props.response.data.regionCode}
          </Typography>
        </div>

        <div className="elements">
          <div className="flex">
            <SolarPower sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              Max Array Panel Count:{" "}
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.solarPotential.maxArrayPanelsCount}
          </Typography>
        </div>

        <div className="elements">
          <div className="flex">
            <ImageAspectRatioIcon sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              Max Array Area m2:{" "}
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.solarPotential.maxArrayAreaMeters2}
          </Typography>
        </div>

        <div className="elements">
          <div className="flex">
            <LightModeIcon sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              Max Sunshine Hours Per Year:
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.solarPotential.maxSunshineHoursPerYear}
          </Typography>
        </div>

        <div className="elements">
          <div className="flex">
            <TimelineIcon sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              Panel Lifetime Years:{" "}
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.solarPotential.panelLifetimeYears}
          </Typography>
        </div>

        <div className="elements">
          <div className="flex">
            <BoltIcon sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              Panel Capacity Watts:{" "}
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.solarPotential.panelCapacityWatts}
          </Typography>
        </div>

        <div className="elements">
          <div className="flex">
            <Crop169Icon sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              Panel Dimensions W x H:{" "}
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.solarPotential.panelWidthMeters} x{" "}
            {props.response.data.solarPotential.panelHeightMeters} m
          </Typography>
        </div>

        <div className="elements">
          <div className="flex">
            <Co2Icon sx={{ color: "#4285f4" }} />
            <Typography
              sx={{ mb: 1.5, paddingTop: "10px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              Carbon Offset Factor KgPerMwh:{" "}
            </Typography>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.response.data.solarPotential.carbonOffsetFactorKgPerMwh}
          </Typography>
        </div>

        {/* Bar Chart to show sunniness of rooftop */}
        <BarChart
          sunshineQuantiles={
            props.response.data.solarPotential.wholeRoofStats.sunshineQuantiles
          }
        />
      </CardContent>
    </Card>
  );
}
