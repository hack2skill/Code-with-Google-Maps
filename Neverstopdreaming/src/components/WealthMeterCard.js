import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import Slider from "@mui/material/Slider";

import "../styles/CardStyles.css";

export default function WealthMeterCard() {
  // all states
  const [consumptionInput, setConsumptionInput] = React.useState("");
  const [productionInput, setProductionInput] = React.useState("");
  const [buyBackRate, setBuyBackRate] = React.useState("");
  const [sellingPrice, setSellingPrice] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState(false);
  const [netProduction, setNetProduction] = React.useState(0);
  const [profit, setProfit] = React.useState(0);
  const [color, setColor] = React.useState("error");
  const [showZeroCost, setShowZeroCost] = React.useState(false);

  // defining marks for the slider
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 500,
      label: "500",
    },
    {
      value: 1500,
      label: "1500",
    },
    {
      value: 3000,
      label: "3000",
    },
    {
      value: 5000,
      label: "5000",
    },
  ];

  React.useEffect(() => {
    // calculating profits
    if (consumptionInput > productionInput) {
      const profit = (consumptionInput - productionInput) * sellingPrice;
      setProfit(profit);
    } else if (consumptionInput < productionInput) {
      const profit = (productionInput - consumptionInput) * buyBackRate;
      setProfit(profit);
    } else {
      setProfit(0);
    }

    if (profit > 0 && profit < 500) {
      setColor("error");
    } else if (profit > 500 && profit < 1500) {
      setColor("error");
    } else if (profit > 1500) {
      setColor("success");
    }
  }, [
    productionInput,
    buyBackRate,
    consumptionInput,
    sellingPrice,
    netProduction,
    profit,
    color,
    showZeroCost,
  ]);

  // handle click event for wealth meter
  function handleWealthMeter() {
    if (consumptionInput > productionInput) {
      setShowZeroCost(true);
    }

    if (consumptionInput && productionInput && buyBackRate && sellingPrice) {
      setIsSubmitted(!isSubmitted);
      if (isSubmitted) {
        setProductionInput(0);
        setConsumptionInput(0);
        setBuyBackRate(0);
        setSellingPrice(0);
        setIsSubmitted(!isSubmitted);
        setShowZeroCost(!showZeroCost);
      }
    } else {
      setFormError(true);
    }

    const netProd = productionInput - consumptionInput;
    setNetProduction(netProd);
    // const profit =
    //   netProduction * sellingPrice -
    //   (netProduction < 0 ? Math.abs(netProduction) * buyBackRate : 0);
    // setProfit(profit);
  }

  return (
    <Card sx={{ minWidth: 275, borderRadius: "5px", width: "fit-content" }}>
      <CardContent sx={{}}>
        <hr width="70%" color="#cccccc" />
        <Typography sx={{ mb: 1.5, textAlign: "center" }} color="#1b4552">
         Calculator
        </Typography>

        <hr width="70%" color="#cccccc" />

        {/* Average Consumption */}
        <Typography sx={{ padding: "10px" }}>
          Average Monthly Consumption
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "10px",
              paddingLeft: "10px",
            }}
          >
            <Typography fontSize={"12px"} sx={{ paddingRight: "10px" }}>
              In kw:
            </Typography>
            <TextField
              id="consumption"
              label="Consumption units"
              variant="outlined"
              size="small"
              error={formError && !consumptionInput}
              value={consumptionInput}
              onChange={(event) => {
                setConsumptionInput(event.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "10px",
              paddingLeft: "10px",
            }}
          >
            <Typography fontSize={"12px"}>Rate per unit:</Typography>
            <TextField
              id="sellingPrice"
              label="Enter rate "
              variant="outlined"
              size="small"
              error={formError && !sellingPrice}
              value={sellingPrice}
              onChange={(event) => {
                setSellingPrice(event.target.value);
              }}
            />
          </div>
        </div>

        {/* Estimated Production */}
        <Typography sx={{ padding: "10px" }}>
          {" "}
          Estimated Monthly Production
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "10px",
              paddingLeft: "10px",
            }}
          >
            <Typography fontSize={"12px"} sx={{ paddingRight: "10px" }}>
              {" "}
              In kw:
            </Typography>
            <TextField
              id="production"
              label="Production units"
              variant="outlined"
              size="small"
              error={formError && !productionInput}
              value={productionInput}
              onChange={(event) => {
                setProductionInput(event.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "10px",
            }}
          >
            <Typography fontSize={"12px"} sx={{ paddingLeft: "10px" }}>
              Rate per unit:
            </Typography>
            <TextField
              id="buyPrice"
              label="Enter rate "
              variant="outlined"
              size="small"
              sx={{ fontSize: "10px" }}
              error={formError && !buyBackRate}
              value={buyBackRate}
              onChange={(event) => {
                setBuyBackRate(event.target.value);
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontStyle: "italic" }}>
            Find out what does your Wealth Meter looks like
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleWealthMeter}
          >
            <NetworkCheckIcon />
          </Button>
        </div>

        {/* Wealth meter slider */}
        {isSubmitted && (
          <div style={{ padding: "20px" }}>
            <Slider
              value={profit}
              min={0}
              max={5000}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => value}
              marks={marks}
              color={color}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  textAlign: "center",
                  paddingTop: "20px",
                }}
              >
                Profit:
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  textAlign: "center",
                  paddingTop: "20px",
                }}
              >
                {profit}
              </Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  textAlign: "center",
                  paddingTop: "20px",
                }}
              >
                Monthly bill:
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  textAlign: "center",
                  paddingTop: "20px",
                }}
              >
                {consumptionInput * sellingPrice}
              </Typography>
            </div>
            {
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "12px", paddingTop: "5px" }}>
                  Estimated energy needed to achieve zero cost:
                </Typography>
                <Typography sx={{ fontSize: "12px", paddingTop: "5px" }}>
                  {consumptionInput - productionInput < 0 && 0}
                  {consumptionInput - productionInput > 0 &&
                    consumptionInput - productionInput}
                </Typography>
              </div>
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
}
