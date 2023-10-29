import LocationCard from "../components/LocationCard";
import Box from "@mui/material/Box";

export default function LocationMenu() {
  // List of Locations to analyse
  const images = [
    {
      title:
        "45 Northeast 59th Street, Miami, FL 33137 Lemon City-Little Haiti Miami Florida United States",
      lat: 25.8299,
      lng: -80.195477,
      id: 1,
    },
    {
      title:
        "1226 Pfeifer Lane, El Cajon, CA 92020 El Cajon California United States",
      lat: 32.81191404727009,
      lng: -116.98483049869536,
      id: 2,
    },
    {
      title:
        "6376 Lake Arrowhead Drive, San Diego, CA 92119 Lake Murray, San Diego, California, United States",
      lat: 32.79626463265465,
      lng: -117.01002549380065,
      id: 3,
    },
    {
      title:
        "Heijo Palace Historical Park, tanida-nara line, Sakicho, Nara, Nara Prefecture 630-8003, Japan",
      lat: 34.69218672400119,
      lng: 135.79361468553543,
      id: 4,
    },
    {
      title:
        "Heijo Palace Historical Park, nara-seika line, Nijoji-minami 5-chome, Nara, Nara Prefecture 630-8577, Japan",
      lat: 34.693359972717694,
      lng: 135.7954328879714,
      id: 5,
    },
    {
      title: "Sakicho, Nara, 630-8003, Japan",
      lat: 34.69396643874814,
      lng: 135.79543758183718,
    },
    {
      title: "1151 Sakicho, Nara, 630-8001, Japan",
      lat: 34.69486785959089,
      lng: 135.8006839826703,
    },
    {
      title: "Japan, 630-8003 Nara, Sakichō, 1151 Ruins Exhibition Hall",
      lat: 34.69367092494664,
      lng: 135.79937104135752,
    },
    {
      title: "3 Chome-5-Number 1 Nijoojiminami, Nara, 630-8012, Japan",
      lat: 34.69346858559709,
      lng: 135.79929560422897,
    },
    {
      title: "286-1 Sakicho, Nara, 630-8003, Japan",
      lat: 34.693253013702254,
      lng: 135.7903303205967,
    },
    //3d video 1
    {
      title: "Mountain View, CA 94043, USA",
      lat: 37.422392,
      lng: -122.0867626,
    },
    //3d video 2
    {
      title: "200 1/2 San Antonio St, Austin, TX 78701, USA",
      lat: 30.265753,
      lng: -97.74884,
    },
  ];

  return (
    <div>
      <h2
        style={{ textAlign: "center", color: "white", paddingBottom: "20px" }}
      >
        Available Locations
      </h2>
      <div style={{ backgroundColor: "#fffbff" }}>
        <p style={{ padding: "10px 0px 0px 10px" }}>
          As the app is still a prototype, the Ai based Placement Recommendation is only available for these locations
        </p>
        <hr color="#4b6176" width="100%" />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
          }}
        >
          {images.map((image) => (
            <LocationCard
              title={image.title}
              lat={image.lat}
              lng={image.lng}
              id={image.id}
              style={{
                backgroundColor: "black", // Set the background color to black
                color: "white", // Set the text color to white
              }}
            />
          ))}
        </Box>
      </div>
    </div>
  );
  
}
