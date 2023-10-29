import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EastIcon from "@mui/icons-material/East";
import "../styles/CardStyles.css";

// Card to display financial analysis and guidelines
export default function FinancialCard(props) {
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const financialArray = props.response.data.solarPotential.financialAnalyses;

  // Cash purchase values
  let cashSavingsYear1 = 0;
  let cashSavingsYear20 = 0;
  let cashPresentValueOfSavingsYear20 = 0;
  let cashSavingsLifetime = 0;
  let cashPresentValueOfSavingsLifetime = 0;
  let cashUpfrontCost = 0;
  let cashOutOfPocketCost = 0;
  let cashRebateValue = 0;

  // Loan values
  let LoanSavingsYear1 = 0;
  let LoanSavingsYear20 = 0;
  let LoanSavingsLifetime = 0;
  let LoanPresentValueOfSavingsLifetime = 0;
  let annualLoanPayment = 0;
  let loanInterestRate = 0;

  // Lease values
  let LeaseSavingsYear1 = 0;
  let LeaseSavingsYear20 = 0;
  let LeasePresentValueOfSavingsLifetime = 0;
  let LeaseSavingsLifetime = 0;
  let annualLeasingCost = 0;

  // show cost and savings for cash purchase of solar panels
  function getCashSavingsValues() {
    cashSavingsYear1 = 0;
    cashSavingsYear20 = 0;
    cashPresentValueOfSavingsYear20 = 0;
    cashSavingsLifetime = 0;
    cashUpfrontCost = 0;
    cashOutOfPocketCost = 0;
    cashRebateValue = 0;

    financialArray.map((config) => {
      cashSavingsYear1 += Number(
        config.cashPurchaseSavings.savings.savingsYear1.units
      );
      cashSavingsYear20 += Number(
        config.cashPurchaseSavings.savings.savingsYear20.units
      );
      cashPresentValueOfSavingsYear20 += Number(
        config.cashPurchaseSavings.savings.presentValueOfSavingsYear20.units
      );
      cashSavingsLifetime += Number(
        config.cashPurchaseSavings.savings.savingsLifetime.units
      );
      cashPresentValueOfSavingsLifetime = Math.abs(
        config.cashPurchaseSavings.savings.presentValueOfSavingsLifetime.units
      );
      cashUpfrontCost += Number(config.cashPurchaseSavings.upfrontCost.units);
      cashOutOfPocketCost += Number(
        config.cashPurchaseSavings.outOfPocketCost.units
      );
      cashRebateValue += Number(config.cashPurchaseSavings.rebateValue.units);
    });

    // Taking average values from the entire response
    cashSavingsYear1 = Math.round((cashSavingsYear1 / 23) * 10000) / 10000;
    cashSavingsYear20 = Math.round((cashSavingsYear20 / 23) * 10000) / 10000;
    cashPresentValueOfSavingsYear20 =
      Math.round((cashPresentValueOfSavingsYear20 / 23) * 10000) / 10000;
    cashSavingsLifetime =
      Math.round((cashSavingsLifetime / 23) * 10000) / 10000;
    cashPresentValueOfSavingsLifetime =
      Math.round((cashPresentValueOfSavingsLifetime / 23) * 10000) / 10000;
    cashUpfrontCost = Math.round((cashUpfrontCost / 23) * 10000) / 10000;
    cashOutOfPocketCost =
      Math.round((cashOutOfPocketCost / 23) * 10000) / 10000;
    cashRebateValue = Math.round((cashRebateValue / 23) * 10000) / 10000;
  }

  // show cost and savings for financed loan of solar panels
  function getLoanSavingsValues() {
    LoanSavingsYear1 = 0;
    LoanSavingsYear20 = 0;
    LoanPresentValueOfSavingsLifetime = 0;
    LoanSavingsLifetime = 0;
    LoanPresentValueOfSavingsLifetime = 0;
    annualLoanPayment = 0;
    loanInterestRate = 0;

    financialArray.map((config) => {
      LoanSavingsYear1 += Math.abs(
        config.financedPurchaseSavings.savings.savingsYear1.units
      );

      LoanSavingsYear20 += Math.abs(
        config.financedPurchaseSavings.savings.savingsYear20.units
      );
      LoanPresentValueOfSavingsLifetime += Math.abs(
        config.financedPurchaseSavings.savings.presentValueOfSavingsLifetime
          .units
      );
      LoanSavingsLifetime += Math.abs(
        config.financedPurchaseSavings.savings.savingsLifetime.units
      );
      LoanPresentValueOfSavingsLifetime += Math.abs(
        config.financedPurchaseSavings.savings.presentValueOfSavingsLifetime
          .units
      );
      loanInterestRate += Number(
        config.financedPurchaseSavings.loanInterestRate
      );
      annualLoanPayment += Number(
        config.financedPurchaseSavings.annualLoanPayment.units
      );
    });

    // Calculating average of the values
    LoanSavingsYear1 = Math.round((LoanSavingsYear1 / 23) * 10000) / 10000;
    LoanSavingsYear20 = Math.round((LoanSavingsYear20 / 23) * 10000) / 10000;
    LoanPresentValueOfSavingsLifetime =
      Math.round((LoanPresentValueOfSavingsLifetime / 23) * 10000) / 10000;
    LoanSavingsLifetime =
      Math.round((LoanSavingsLifetime / 23) * 10000) / 10000;
    LoanPresentValueOfSavingsLifetime =
      Math.round((LoanPresentValueOfSavingsLifetime / 23) * 10000) / 10000;
    loanInterestRate = Math.round((loanInterestRate / 23) * 10000) / 10000;
    annualLoanPayment = Math.round((annualLoanPayment / 23) * 10000) / 10000;
  }

  // show cost and savings for solar panels on lease
  function getLeaseSavingsValues() {
    LeaseSavingsYear1 = 0;
    LeaseSavingsYear20 = 0;
    LeasePresentValueOfSavingsLifetime = 0;
    LeaseSavingsLifetime = 0;
    annualLeasingCost = 0;

    financialArray.map((config) => {
      LeaseSavingsYear1 += Math.abs(
        config.leasingSavings.savings.savingsYear1.units
      );
      LeaseSavingsYear20 += config.leasingSavings.savings.savingsYear20.units;
      LeasePresentValueOfSavingsLifetime += Math.abs(
        config.leasingSavings.savings.presentValueOfSavingsLifetime.units
      );
      LeaseSavingsLifetime += Math.abs(
        config.leasingSavings.savings.savingsLifetime.units
      );
      annualLeasingCost += Number(
        config.leasingSavings.annualLeasingCost.units
      );
    });

    // Calculating average of values
    LeaseSavingsYear1 = Math.round((LeaseSavingsYear1 / 23) * 10000) / 10000;
    LeaseSavingsYear20 = Math.round((LeaseSavingsYear20 / 23) * 10000) / 10000;
    LeasePresentValueOfSavingsLifetime =
      Math.round((LeasePresentValueOfSavingsLifetime / 23) * 10000) / 10000;
    LeaseSavingsLifetime =
      Math.round((LeaseSavingsLifetime / 23) * 10000) / 10000;
    annualLeasingCost = Math.round((annualLeasingCost / 23) * 10000) / 10000;
  }

  return (
    <Card sx={{ minWidth: 275, borderRadius: "5px", width: "fit-content" }}>
      <CardContent sx={{}}>
        <Typography sx={{ mb: 1.5, textAlign: "center" }} color="#1b4552">
          Financial Analysis and Guidelines
        </Typography>
        <hr width="70%" color="#cccccc" />

        {/* Cash Purchased */}
        <Accordion onChange={getCashSavingsValues()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <Typography>Cash Purchase</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Purchasing a solar energy system with cash</Typography>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ padding: "10px" }}>
                <Typography sx={{ mb: 1.5 }} color="error">
                  Cost (USD)
                </Typography>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Out of Pocket Cost (before tax incentives):{" "}
                    {cashOutOfPocketCost}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Rebate value : {cashRebateValue}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Upfront Cost (after tax incentives) : {cashUpfrontCost}
                  </Typography>
                </div>
              </div>
              <hr />
              <div style={{ padding: "10px" }}>
                <Typography sx={{ mb: 1.5, color: "green" }}>
                  Savings (USD)
                </Typography>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    in Year1 : {cashSavingsYear1}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Lifetime : {cashSavingsLifetime}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Present Value of Cumulative Lifetime :{" "}
                    {cashPresentValueOfSavingsLifetime}
                  </Typography>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Financed Loan */}
        <Accordion onChange={getLoanSavingsValues()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <Typography>Financed</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Purchasing a solar energy system with loan</Typography>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ padding: "10px" }}>
                <Typography sx={{ mb: 1.5 }} color="error">
                  Cost (USD)
                </Typography>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Annual Loan payment: {annualLoanPayment}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Interest Rate : {loanInterestRate}
                  </Typography>
                </div>
              </div>
              <hr />
              <div style={{ padding: "10px" }}>
                <Typography sx={{ mb: 1.5, color: "green" }}>
                  Savings (USD)
                </Typography>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    in Year1 : {LoanSavingsYear1}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Lifetime : {LoanSavingsLifetime}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Present Value of Savings Lifetime :{" "}
                    {LoanPresentValueOfSavingsLifetime}
                  </Typography>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Solar leases */}
        <Accordion onChange={getLeaseSavingsValues()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <Typography>Solar leases</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Leasing a solar energy system</Typography>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ padding: "10px" }}>
                <Typography sx={{ mb: 1.5 }} color="error">
                  Cost (USD)
                </Typography>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Annual Leasing Cost: {annualLeasingCost}
                  </Typography>
                </div>
              </div>
              <hr />
              <div style={{ padding: "10px" }}>
                <Typography sx={{ mb: 1.5, color: "green" }}>
                  Savings (USD)
                </Typography>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    in Year1 : {LeaseSavingsYear1}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Lifetime : {LeaseSavingsLifetime}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Present Value of Savings Lifetime :{" "}
                    {LeasePresentValueOfSavingsLifetime}
                  </Typography>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Guidelines for community or Shared solar */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <Typography>Community or Shared solar </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Enables a group of participants to pool their purchasing power to
              buy solar into a solar system at a level that fits their needs and
              budget. Can be owned by utilities, solar dev, non profit entities
              or community members. Can opt if unable to claim state/federal
              investment tax credits
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Guidelines for Power Purchase Agreements */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <Typography>Power Purchase Agreements (PPA)</Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
          <Grid item xs={12} md={6}>
            <Demo>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EastIcon />
                  </ListItemIcon>
                  <ListItemText primary=" PPA allows consumers to host solar energy systems owned by solar comapnies and purchase back the electricity generated." />
                </ListItem>
                ,
                <ListItem>
                  <ListItemIcon>
                    <EastIcon />
                  </ListItemIcon>
                  <ListItemText primary="This is a financial agreement where a developer arranges for the design, permitting, financing, and installation on a consumer's property at little to no upfront cost. " />
                </ListItem>
                ,
                <ListItem>
                  <ListItemIcon>
                    <EastIcon />
                  </ListItemIcon>
                  <ListItemText primary="The host consumer agrees to purchase the power generated by the system at a set price(often lower than the local utility's retail rate) per kilowatt-hour of electricity produced over the life of the system. " />
                </ListItem>
                ,
              </List>
            </Demo>
          </Grid>
        </Accordion>

        {/* Guidelines for Solarize programs */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <Typography>Solarize programs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Allows locally organized group of home owners and business to pool
              their purchasing power to competitively select an installer and
              negotiate reduced rates. Can opt if you are eligible for state or
              federal investement tax credits
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}
