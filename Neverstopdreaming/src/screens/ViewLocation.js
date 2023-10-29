import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { getBuildingInsights, lookupVideo } from "../services/SolarService";
import MapOverlay from "../components/GroundOverlay";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import "../styles/HomeStyles.css";

export default function ViewLocation() {
  const [isBuildingInsight, setIsBuildingInsight] = useState(false);
  const [isDataLayers, setIsDataLayers] = useState(false);
  const [isAerialView, setIsAerialView] = useState(false);
  const [isFinancialAnalysis, setIsFinancialAnalysis] = useState(false);
  const [isWealthMeter, setIsWealthMeter] = useState(false);

  const [insights, setInsights] = useState();
  const location = useLocation();

  // get response of building insights
  function handleInsightsClick() {
    setIsBuildingInsight(!isBuildingInsight);
    const response = getBuildingInsights(
      location.state.lat,
      location.state.lng,
      location.state.id
    );
    setInsights(response);
  }

  // get response of aerial view api - in progress
  async function handleAerialViewClick() {
    setIsAerialView(!isAerialView);
    console.log("address->", location.state.address);
    const response = await lookupVideo(location.state.address);
    console.log("Aerial response:", response);
  }

  // toggle to show financial analysis card
  function handleFinancialClick() {
    setIsFinancialAnalysis(!isFinancialAnalysis);
  }

  // toggle to show wealth meter card
  function handleWealthMeterClick() {
    setIsWealthMeter(!isWealthMeter);
  }

  return (
    <div className="mainContainer">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            sx={{
              color: "white",
              borderRight: "1px solid white",
              borderColor: "white",
              backgroundColor: !isBuildingInsight ? "#493f5480" : "#0F9D58",
            }}
            onClick={handleInsightsClick}
          >
           AI Optimizer
          </Button>
          {isBuildingInsight && (
            <Button
              sx={{
                color: "white",
                backgroundColor: !isFinancialAnalysis ? "#493f5480" : "#DB4437",
              }}
              onClick={handleFinancialClick}
            >
             More Information
            </Button>
          )}

          {isBuildingInsight && (
            <Button
              sx={{
                color: "white",
                backgroundColor: !isWealthMeter ? "#493f5480" : "#4285F4",
              }}
              onClick={handleWealthMeterClick}
            >
              Calculator
            </Button>
          )}
        </ButtonGroup>

     
      </Box>
      <MapOverlay
        lat={location.state.lat}
        lng={location.state.lng}
        isInsight={isBuildingInsight}
        isDataLayers={isDataLayers}
        isFinance={isFinancialAnalysis}
        isWealthMeter={isWealthMeter}
        response={insights}
      />
    </div>
  );
}
