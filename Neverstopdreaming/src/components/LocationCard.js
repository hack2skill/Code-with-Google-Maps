import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";

// Displays card with ldetails of location that is to be analysed
export default function BasiCard(props) {
  const navigate = useNavigate();

  // On selecting any of the location, redirect to View location page 
  const handleClick = (e) => {
    navigate("/view-location", {
      state: { lat: props.lat, lng: props.lng, id: props.id , address:props.title},
    });
  };

  return (
    <Card sx={{ minWidth: 275, margin: "7px", width: "31%" }}>
      <CardActionArea onClick={handleClick}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PlaceIcon
            sx={{ paddingLeft: "10px", marginTop: "-5px", color: "#b30000" }}
          />
          <CardContent>
            <Typography variant="h7" component="div">
            {/* {props.title} */}
Demo Location 
            </Typography>
            <Typography
              sx={{ fontSize: 10 }}
              color="text.secondary"
              gutterBottom
            >
             {/* {props.lat},{props.lng} */}
Click Here
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
