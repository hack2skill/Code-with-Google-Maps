import React, { useState } from "react";
import InputSlider from "./Slider";
import InfoCard from "./Card";
import DetailsCard from "./DetailsCard";
import Map from "./Map2";
import FinancialCard from "./FinancialCard";
import WealthMeterCard from "./WealthMeterCard";
import "../styles/MapStyles.css";

const MapOverlay = (props) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const [panelCount, setPanelCount] = useState(4);

  return (
    <div className="container">
      {/* Display insights info card with panel count and yearly energy */}
      {props.isInsight && (
        <div className="card">
          <InfoCard
            count={panelCount}
            max={props.response.data.solarPotential.maxArrayPanelsCount}
            response={props.response}
            setMoreInfo={setMoreInfo}
            moreInfo={moreInfo}
          />
        </div>
      )}

      {/* Slider to adjust number of panels on rooftop */}
      {props.isInsight && (
        <div className="slider">
          <InputSlider
            maxPanels={props.response.data.solarPotential.maxArrayPanelsCount}
            setCount={setPanelCount}
          />
        </div>
      )}

      {/* Card displaying more details of solar potential of the building */}
      {moreInfo && (
        <div className="detailsCard">
          <DetailsCard response={props.response} />
        </div>
      )}

      {/* Displays Financial analysis and guidelines  */}
      {props.isFinance && (
        <div className="financeCard">
          <FinancialCard response={props.response} />
        </div>
      )}

      {/* Displays wealth meter */}
      {props.isWealthMeter && (
        <div className="wealthMeterCard">
          <WealthMeterCard />
        </div>
      )}

      {/* Renders Map */}
      <div className="map">
        <Map
          panelCount={panelCount}
          lat={props.lat}
          lng={props.lng}
          isInsight={props.isInsight}
          response={props.response}
        />
      </div>
    </div>
  );
};

export default MapOverlay;
