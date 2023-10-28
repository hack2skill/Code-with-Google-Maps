import React, { useEffect, useState } from "react";
import "./hospitals.css";

function Hospitals() {
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [totalHospitals, setTotalHospitals] = useState([]);
  const [totalShelters, setTotalShelters] = useState([]);
  const [displayedHospitals, setDisplayedHospitals] = useState([]);
  const [displayedShelters, setDisplayedShelters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [isInjured, setIsInjured] = useState(false);
  const [isSafe, setIsSafe] = useState(false);
  const [selectedHospitalLocation, setSelectedHospitalLocation] =
    useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [circleRadius, setCircleRadius] = useState(null);

  const hospitalsPerPage = 3;
  const sheltersPerPage = 3;

  const fetchLatestData = async () => {
    try {
      const response = await fetch("http://localhost:5000/alert");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const latestData = data.reduce((latest, current) => {
        if (!latest || current.createdAt > latest.createdAt) {
          return current;
        }
        return latest;
      }, null);

      if (latestData) {
        const { location_info, radius } = latestData;
        setLatitude(location_info.lat);
        setLongitude(location_info.lon);
        setCircleRadius(radius);
      }
    } catch (error) {
      console.error("Error fetching data from the backend: ", error);
    }
  };

  useEffect(() => {
    fetchLatestData();
    const fetchDataInterval = setInterval(() => {
      fetchLatestData();
    }, 500000);
    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);

  useEffect(() => {
    
    const initializeMap = async () => {
      if (window.google && window.google.maps) {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 15,
        });

        if ("geolocation" in navigator) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const userMarker = new window.google.maps.Marker({
            position: userLocation,
            map,
            title: "Your Location",
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
          });

          const createCircle = () => {
            if (
              latitude !== null &&
              longitude !== null &&
              circleRadius !== null
            ) {
              const cityCircle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillColor: "#FF5959",
                fillOpacity: 0.5,
                map,
                center: { lat: latitude, lng: longitude },
                radius: circleRadius,
              });

              const cityCircle2 = new google.maps.Circle({
                strokeColor: "yellow",
                strokeOpacity: 0.4,
                strokeWeight: 2,
                fillColor: "yellow",
                fillOpacity: 0.2,
                map,
                center: { lat: latitude, lng: longitude },
                radius: circleRadius * 1.6,
              });
            }
          };
          setUserMarker(userMarker);
          setLatitude(userLocation.lat);
          setLongitude(userLocation.lng);
          createCircle();

          map.setCenter(userLocation);

          const directionsService = new window.google.maps.DirectionsService();
          const directionsRenderer =
            new window.google.maps.DirectionsRenderer();
          directionsRenderer.setMap(map);
          setDirectionsService(directionsService);
          setDirectionsRenderer(directionsRenderer);

          const calculateAndDisplayRoute = (origin, destination) => {
            if (directionsService) {
              const distance =
                window.google.maps.geometry.spherical.computeDistanceBetween(
                  origin,
                  destination
                );

              const travelMode = distance <= 1000 ? "WALKING" : "DRIVING";

              const directionsRequest = {
                origin: origin,
                destination: destination,
                travelMode: travelMode,
              };

              directionsService.route(directionsRequest, (result, status) => {
                if (status === "OK") {
                  directionsRenderer.setDirections(result);
                } else {
                  console.error(
                    "Directions request failed with status:",
                    status
                  );
                }
              });
            } else {
              console.error("DirectionsService is not yet initialized.");
            }
          };

          const service = new window.google.maps.places.PlacesService(map);

          const request = {
            location: userLocation,
            radius: 10000,
            type: ["hospital"],
          };

        
          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              let hospitals = [];
              results.forEach((result) => {
                const hospitalLocation = result.geometry.location;

                const distance =
                  window.google.maps.geometry.spherical.computeDistanceBetween(
                    userLocation,
                    hospitalLocation
                  );

                if (distance > circleRadius) {
                  const hospitalMarker = new window.google.maps.Marker({
                    position: hospitalLocation,
                    map,
                    title: result.name,
                  });

                  hospitalMarker.addListener("click", () => {
                    setSelectedHospitalLocation(hospitalLocation);
                    calculateAndDisplayRoute(userLocation, hospitalLocation);
                  });

                  hospitals.push({
                    name: result.name,
                    distance: distance,
                    location: hospitalLocation,
                  });
                }
              });

              hospitals.sort((a, b) => a.distance - b.distance);

              setTotalHospitals(hospitals);
              setDisplayedHospitals(hospitals.slice(0, hospitalsPerPage));
              setShowMore(hospitals.length > hospitalsPerPage);
            }
          });

          const shelterTypes = [
            "school",
            "supermarket",
            "stadium",
            "secondary_school",
          ];
          shelterTypes.forEach((type) => {
            const shelterRequest = {
              location: userLocation,
              radius: 10000,
              type: [type],
            };

            service.nearbySearch(shelterRequest, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                let shelters = [];
                results.forEach((result) => {
                  const shelterLocation = result.geometry.location;

                  const distance =
                    window.google.maps.geometry.spherical.computeDistanceBetween(
                      userLocation,
                      shelterLocation
                    );

                  if (distance > circleRadius) {
                    const shelterMarker = new window.google.maps.Marker({
                      position: shelterLocation,
                      map,
                      title: result.name,
                      icon: {
                        url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                      },
                    });

                    shelterMarker.addListener("click", () => {
                      setSelectedHospitalLocation(shelterLocation);
                      calculateAndDisplayRoute(userLocation, shelterLocation);
                    });

                    shelters.push({
                      name: result.name,
                      distance: distance,
                      location: shelterLocation,
                    });
                  }
                });

                shelters.sort((a, b) => a.distance - b.distance);

                setTotalShelters(shelters);
                setDisplayedShelters(shelters.slice(0, sheltersPerPage));
                setShowMore(shelters.length > sheltersPerPage);
              }
            });
          });
        } else {
          alert("Geolocation is not available in your browser");
        }
      } else {
        console.error("Google Maps API not loaded.");
      }
    };

    initializeMap();
  }, [latitude, longitude, circleRadius]);

  const loadMoreHospitals = () => {
    const currentLength = displayedHospitals.length;
    const newLength = currentLength + hospitalsPerPage;
    setDisplayedHospitals(totalHospitals.slice(0, newLength));
    setShowMore(newLength < totalHospitals.length);
  };

  const loadMoreShelters = () => {
    const currentLength = displayedShelters.length;
    const newLength = currentLength + sheltersPerPage;
    setDisplayedShelters(totalShelters.slice(0, newLength));
    setShowMore(newLength < totalShelters.length);
  };

  const handleImSafeClick = () => {
    setIsAlertVisible(false);
    setIsSafe(true);
    setIsInjured(false);
  };

  const handleYesClick = () => {
    setIsAlertVisible(false);
    setIsInjured(true);
    setIsSafe(false);
  };

  // const calculateAndDisplayRoute = (origin, destination) => {
  //   if (directionsService) {
  //     const distance =
  //       window.google.maps.geometry.spherical.computeDistanceBetween(
  //         origin,
  //         destination
  //       );

  //     const travelMode = distance <= 1000 ? "WALKING" : "DRIVING";

  //     const directionsRequest = {
  //       origin: origin,
  //       destination: destination,
  //       travelMode: travelMode,
  //     };

  //     directionsService.route(directionsRequest, (result, status) => {
  //       if (status === "OK") {
  //         directionsRenderer.setDirections(result);
  //       } else {
  //         console.error("Directions request failed with status:", status);
  //       }
  //     });
  //   } else {
  //     console.error("DirectionsService is not yet initialized.");
  //   }
  // };

  return (
    <div>
      <div
        className={`googlemap ${
          isAlertVisible ? "with-alert" : "without-alert"
        }`}
        id="map"
      ></div>
      <div className="map_body">
        <div
          className={`map_injuredalert ${
            isAlertVisible ? "visible" : "hidden"
          }`}
        >
          <h1 className="map_injurehead">Are you Injured?</h1>
          <p className="map_injurebody">
            You’ll be directed to the nearest hospital
          </p>
          <div className="map_injuredbuttons">
            <button
              className={`map_notinjuredbtn ${isSafe ? "disabled" : ""}`}
              onClick={handleImSafeClick}
            >
              I'm Safe
            </button>
            <button
              className={`map_injuredbtn ${isInjured ? "disabled" : ""}`}
              onClick={handleYesClick}
            >
              Yes
            </button>
          </div>
        </div>
        {isInjured && !isAlertVisible && (
          <div>
            <div className="map_injuredhospitals visible">
              <h2 className="injuredhospitalshead">Hospitals Within 2.5 kms</h2>
              <hr className="injuredhospitals_line" />

              <ul className="injuredhospitals_list">
                {displayedHospitals.map((hospital, index) => (
                  <li key={index}>
                    <div
                      className="injuredhospital "
                      onClick={() => {
                        console.log("Hospital Location:", hospital.location);
                        calculateAndDisplayRouteToLocation(hospital.location);
                      }}
                    >
                      <div className="injuredhospitalstart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                        >
                          <rect
                            y="3.05176e-05"
                            width="67"
                            height="67"
                            rx="8"
                            fill="#EBEBEB"
                          />
                          <path
                            d="M53.9333 47.0944H53.0627V43.1333C53.0627 42.7547 52.7558 42.4478 52.3772 42.4478C51.9986 42.4478 51.6917 42.7547 51.6917 43.1333V47.0944H42.8043V44.5089H47.8965C48.7786 44.5089 49.4964 43.7912 49.4964 42.9091V29.4833C49.4964 28.6013 48.7786 27.8835 47.8965 27.8835H42.8043V25.2981H51.6917V40.1453C51.6917 40.524 51.9986 40.8308 52.3772 40.8308C52.7558 40.8308 53.0627 40.524 53.0627 40.1453V25.2981H54.8648C55.4952 25.2981 56.0075 24.7853 56.0075 24.1555V21.3891C56.0075 20.7587 55.4946 20.2464 54.8648 20.2464H42.8043V17.8191H44.6064C45.2368 17.8191 45.7491 17.3063 45.7491 16.6765V13.9095C45.7491 13.2792 45.2362 12.7669 44.6064 12.7669H22.3941C21.7637 12.7669 21.2514 13.2797 21.2514 13.9095V16.6759C21.2514 17.3063 21.7643 17.8186 22.3941 17.8186H24.1962V20.2459H20.3818C20.0032 20.2459 19.6964 20.5527 19.6964 20.9314C19.6964 21.31 20.0032 21.6169 20.3818 21.6169H24.1962V23.9261H12.364V21.6169H17.384C17.7626 21.6169 18.0695 21.31 18.0695 20.9314C18.0695 20.5527 17.7626 20.2459 17.384 20.2459H12.1357C11.5053 20.2459 10.9931 20.7587 10.9931 21.3885V24.1555C10.9931 24.7858 11.5059 25.2981 12.1357 25.2981H13.9378V47.0944H13.0672C11.4289 47.0944 10.0959 48.4274 10.0959 50.0657V52.0847C10.0959 52.715 10.6087 53.2273 11.2385 53.2273H55.7615C56.3918 53.2273 56.9041 52.7145 56.9041 52.0847V50.0657C56.9046 48.4274 55.5716 47.0944 53.9333 47.0944ZM48.1249 38.053H42.8043V34.3395H48.1249V38.053ZM47.8965 43.1375H42.8043V39.424H48.1249V42.9086C48.1249 43.035 48.0224 43.1375 47.8965 43.1375ZM47.8965 29.2545C48.0224 29.2545 48.1249 29.357 48.1249 29.4828V32.9675H42.8043V29.254L47.8965 29.2545ZM54.6365 21.6174V23.9266H42.8043V21.6174H54.6365ZM22.6229 14.1384H44.3781V16.4476H22.6229V14.1384ZM41.4328 17.8186V47.0938H39.4637V39.5119C39.4637 38.6298 38.746 37.912 37.8639 37.912H29.1361C28.254 37.912 27.5363 38.6298 27.5363 39.5119V47.0938H25.5672V17.8186H41.4328ZM28.9078 47.0944V39.5119C28.9078 39.386 29.0103 39.2835 29.1361 39.2835H32.8142V47.0944H28.9078ZM34.1857 39.2835H37.8639C37.9897 39.2835 38.0922 39.386 38.0922 39.5119V47.0938H34.1852L34.1857 39.2835ZM18.8756 34.3395H24.1962V38.053H18.8756V34.3395ZM24.1962 32.968H18.8756V29.4833C18.8756 29.3575 18.9781 29.255 19.104 29.255H24.1962V32.968ZM18.8756 39.4245H24.1962V43.138H19.104C18.9781 43.138 18.8756 43.0355 18.8756 42.9096V39.4245ZM15.3088 25.2981H24.1962V27.8835H19.104C18.2219 27.8835 17.5041 28.6013 17.5041 29.4833V42.9091C17.5041 43.7912 18.2219 44.5089 19.104 44.5089H24.1962V47.0944H15.3088V25.2981ZM55.5331 51.8558H11.4674V50.0651C11.4674 49.1831 12.1851 48.4653 13.0672 48.4653H53.9333C54.8154 48.4653 55.5331 49.1831 55.5331 50.0651V51.8558Z"
                            fill="black"
                          />
                          <path
                            d="M29.6292 26.5261H31.4599V28.3568C31.4599 28.9872 31.9727 29.4995 32.6026 29.4995H34.3974C35.0278 29.4995 35.5401 28.9866 35.5401 28.3568V26.5261H37.3708C38.0012 26.5261 38.5135 26.0132 38.5135 25.3834V23.5886C38.5135 22.9582 38.0007 22.4459 37.3708 22.4459H35.5401V20.6152C35.5401 19.9848 35.0273 19.4725 34.3974 19.4725H32.6026C31.9722 19.4725 31.4599 19.9853 31.4599 20.6152V22.4459H29.6292C28.9988 22.4459 28.4865 22.9587 28.4865 23.5886V25.3834C28.4865 26.0132 28.9993 26.5261 29.6292 26.5261ZM29.858 23.8169H31.6888C32.3191 23.8169 32.8314 23.3041 32.8314 22.6742V20.8435H34.1696V22.6742C34.1696 23.3046 34.6824 23.8169 35.3123 23.8169H37.143V25.1551H35.3123C34.6819 25.1551 34.1696 25.6679 34.1696 26.2977V28.1285H32.8314V26.2977C32.8314 25.6674 32.3186 25.1551 31.6888 25.1551H29.858V23.8169Z"
                            fill="#AF3D3D"
                          />
                          <path
                            d="M28.679 36.3221H38.3216C38.9519 36.3221 39.4642 35.8093 39.4642 35.1795V32.2326C39.4642 31.6022 38.9514 31.0899 38.3216 31.0899H28.679C28.0486 31.0899 27.5363 31.6028 27.5363 32.2326V35.1795C27.5363 35.8093 28.0491 36.3221 28.679 36.3221ZM38.0927 34.9506H34.1858V32.4609H38.0927V34.9506ZM28.9078 32.4609H32.8148V34.9506H28.9078V32.4609Z"
                            fill="black"
                          />
                        </svg>
                        <div className="injuredhospitaldetails">
                          <p className="injuredhospitalnames">
                            {hospital.name.substring(0, 15)}...
                          </p>
                          <p className="injuredhospitaldistance">
                            {hospital.distance < 1000
                              ? `${(hospital.distance / 1000).toFixed(
                                  2
                                )} meters`
                              : `${(hospital.distance / 1000).toFixed(2)} kms`}
                          </p>{" "}
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="49"
                        viewBox="0 0 48 49"
                        fill="none"
                      >
                        <rect
                          y="0.500031"
                          width="48"
                          height="48"
                          rx="8"
                          fill="#1D8D3E"
                        />
                        <path
                          d="M21.2477 22.6651C21.0043 22.6651 20.771 22.7618 20.5989 22.9338C20.4269 23.1059 20.3302 23.3393 20.3302 23.5826V27.2524H22.1651V24.5H24.9174V26.7937L28.1285 23.5826L24.9174 20.3715V22.6651H21.2477ZM24.6486 14.7686L33.7314 23.8514C33.9034 24.0234 34 24.2568 34 24.5C34 24.7433 33.9034 24.9766 33.7314 25.1487L24.6486 34.2314C24.4766 34.4034 24.2433 34.5 24 34.5C23.7567 34.5 23.5234 34.4034 23.3514 34.2314L14.2686 25.1487C14.0966 24.9766 14 24.7433 14 24.5C14 24.2568 14.0966 24.0234 14.2686 23.8514L23.3514 14.7686C23.5234 14.5967 23.7567 14.5 24 14.5C24.2433 14.5 24.4766 14.5967 24.6486 14.7686Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>

              {showMore && (
                <button
                  className="load-more-button"
                  onClick={loadMoreHospitals}
                >
                  <p>View More</p>
                </button>
              )}
            </div>

            <div className="map_injuredshelters visible">
              <h2 className="injuredsheltershead">Shelters Within 2.5 kms</h2>
              <hr className="injuredshelters_line" />

              <ul className="injuredshelters_list">
                {displayedShelters.map((shelter, index) => (
                  <li key={index}>
                    <div
                      className="injuredshelter"
                      onClick={() =>
                        calculateAndDisplayRouteToLocation(shelter.location)
                      }
                    >
                      <div className="injuredshelterstart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                        >
                          <rect
                            y="3.05176e-05"
                            width="67"
                            height="67"
                            rx="8"
                            fill="#EBEBEB"
                          />
                          <path
                            d="M53.9333 47.0944H53.0627V43.1333C53.0627 42.7547 52.7558 42.4478 52.3772 42.4478C51.9986 42.4478 51.6917 42.7547 51.6917 43.1333V47.0944H42.8043V44.5089H47.8965C48.7786 44.5089 49.4964 43.7912 49.4964 42.9091V29.4833C49.4964 28.6013 48.7786 27.8835 47.8965 27.8835H42.8043V25.2981H51.6917V40.1453C51.6917 40.524 51.9986 40.8308 52.3772 40.8308C52.7558 40.8308 53.0627 40.524 53.0627 40.1453V25.2981H54.8648C55.4952 25.2981 56.0075 24.7853 56.0075 24.1555V21.3891C56.0075 20.7587 55.4946 20.2464 54.8648 20.2464H42.8043V17.8191H44.6064C45.2368 17.8191 45.7491 17.3063 45.7491 16.6765V13.9095C45.7491 13.2792 45.2362 12.7669 44.6064 12.7669H22.3941C21.7637 12.7669 21.2514 13.2797 21.2514 13.9095V16.6759C21.2514 17.3063 21.7643 17.8186 22.3941 17.8186H24.1962V20.2459H20.3818C20.0032 20.2459 19.6964 20.5527 19.6964 20.9314C19.6964 21.31 20.0032 21.6169 20.3818 21.6169H24.1962V23.9261H12.364V21.6169H17.384C17.7626 21.6169 18.0695 21.31 18.0695 20.9314C18.0695 20.5527 17.7626 20.2459 17.384 20.2459H12.1357C11.5053 20.2459 10.9931 20.7587 10.9931 21.3885V24.1555C10.9931 24.7858 11.5059 25.2981 12.1357 25.2981H13.9378V47.0944H13.0672C11.4289 47.0944 10.0959 48.4274 10.0959 50.0657V52.0847C10.0959 52.715 10.6087 53.2273 11.2385 53.2273H55.7615C56.3918 53.2273 56.9041 52.7145 56.9041 52.0847V50.0657C56.9046 48.4274 55.5716 47.0944 53.9333 47.0944ZM48.1249 38.053H42.8043V34.3395H48.1249V38.053ZM47.8965 43.1375H42.8043V39.424H48.1249V42.9086C48.1249 43.035 48.0224 43.1375 47.8965 43.1375ZM47.8965 29.2545C48.0224 29.2545 48.1249 29.357 48.1249 29.4828V32.9675H42.8043V29.254L47.8965 29.2545ZM54.6365 21.6174V23.9266H42.8043V21.6174H54.6365ZM22.6229 14.1384H44.3781V16.4476H22.6229V14.1384ZM41.4328 17.8186V47.0938H39.4637V39.5119C39.4637 38.6298 38.746 37.912 37.8639 37.912H29.1361C28.254 37.912 27.5363 38.6298 27.5363 39.5119V47.0938H25.5672V17.8186H41.4328ZM28.9078 47.0944V39.5119C28.9078 39.386 29.0103 39.2835 29.1361 39.2835H32.8142V47.0944H28.9078ZM34.1857 39.2835H37.8639C37.9897 39.2835 38.0922 39.386 38.0922 39.5119V47.0938H34.1852L34.1857 39.2835ZM18.8756 34.3395H24.1962V38.053H18.8756V34.3395ZM24.1962 32.968H18.8756V29.4833C18.8756 29.3575 18.9781 29.255 19.104 29.255H24.1962V32.968ZM18.8756 39.4245H24.1962V43.138H19.104C18.9781 43.138 18.8756 43.0355 18.8756 42.9096V39.4245ZM15.3088 25.2981H24.1962V27.8835H19.104C18.2219 27.8835 17.5041 28.6013 17.5041 29.4833V42.9091C17.5041 43.7912 18.2219 44.5089 19.104 44.5089H24.1962V47.0944H15.3088V25.2981ZM55.5331 51.8558H11.4674V50.0651C11.4674 49.1831 12.1851 48.4653 13.0672 48.4653H53.9333C54.8154 48.4653 55.5331 49.1831 55.5331 50.0651V51.8558Z"
                            fill="black"
                          />
                          <path
                            d="M29.6292 26.5261H31.4599V28.3568C31.4599 28.9872 31.9727 29.4995 32.6026 29.4995H34.3974C35.0278 29.4995 35.5401 28.9866 35.5401 28.3568V26.5261H37.3708C38.0012 26.5261 38.5135 26.0132 38.5135 25.3834V23.5886C38.5135 22.9582 38.0007 22.4459 37.3708 22.4459H35.5401V20.6152C35.5401 19.9848 35.0273 19.4725 34.3974 19.4725H32.6026C31.9722 19.4725 31.4599 19.9853 31.4599 20.6152V22.4459H29.6292C28.9988 22.4459 28.4865 22.9587 28.4865 23.5886V25.3834C28.4865 26.0132 28.9993 26.5261 29.6292 26.5261ZM29.858 23.8169H31.6888C32.3191 23.8169 32.8314 23.3041 32.8314 22.6742V20.8435H34.1696V22.6742C34.1696 23.3046 34.6824 23.8169 35.3123 23.8169H37.143V25.1551H35.3123C34.6819 25.1551 34.1696 25.6679 34.1696 26.2977V28.1285H32.8314V26.2977C32.8314 25.6674 32.3186 25.1551 31.6888 25.1551H29.858V23.8169Z"
                            fill="#AF3D3D"
                          />
                          <path
                            d="M28.679 36.3221H38.3216C38.9519 36.3221 39.4642 35.8093 39.4642 35.1795V32.2326C39.4642 31.6022 38.9514 31.0899 38.3216 31.0899H28.679C28.0486 31.0899 27.5363 31.6028 27.5363 32.2326V35.1795C27.5363 35.8093 28.0491 36.3221 28.679 36.3221ZM38.0927 34.9506H34.1858V32.4609H38.0927V34.9506ZM28.9078 32.4609H32.8148V34.9506H28.9078V32.4609Z"
                            fill="black"
                          />
                        </svg>
                        <div className="injuredshelterdetails">
                          <p className="injuredshelternames">
                            {shelter.name.substring(0, 15)}...
                          </p>
                          <p className="injuredshelterdistance">
                            {shelter.distance < 1000
                              ? `${(shelter.distance / 1000).toFixed(2)} meters`
                              : `${(shelter.distance / 1000).toFixed(
                                  2
                                )} kilometers`}
                          </p>{" "}
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="49"
                        viewBox="0 0 48 49"
                        fill="none"
                      >
                        <rect
                          y="0.500031"
                          width="48"
                          height="48"
                          rx="8"
                          fill="#1D8D3E"
                        />
                        <path
                          d="M21.2477 22.6651C21.0043 22.6651 20.771 22.7618 20.5989 22.9338C20.4269 23.1059 20.3302 23.3393 20.3302 23.5826V27.2524H22.1651V24.5H24.9174V26.7937L28.1285 23.5826L24.9174 20.3715V22.6651H21.2477ZM24.6486 14.7686L33.7314 23.8514C33.9034 24.0234 34 24.2568 34 24.5C34 24.7433 33.9034 24.9766 33.7314 25.1487L24.6486 34.2314C24.4766 34.4034 24.2433 34.5 24 34.5C23.7567 34.5 23.5234 34.4034 23.3514 34.2314L14.2686 25.1487C14.0966 24.9766 14 24.7433 14 24.5C14 24.2568 14.0966 24.0234 14.2686 23.8514L23.3514 14.7686C23.5234 14.5967 23.7567 14.5 24 14.5C24.2433 14.5 24.4766 14.5967 24.6486 14.7686Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>

              {showMore && (
                <button className="load-more-button" onClick={loadMoreShelters}>
                  <p>View More</p>
                </button>
              )}
            </div>
          </div>
        )}
        {isSafe && !isAlertVisible && (
          <div>
            <div className="map_injuredshelters visible">
              <h2 className="injuredsheltershead">Shelters Within 2.5 kms</h2>
              <hr className="injuredshelters_line" />

              <ul className="injuredshelters_list">
                {displayedShelters.map((shelter, index) => (
                  <li key={index}>
                    <div
                      className="injuredshelter"
                      onClick={() =>
                        calculateAndDisplayRouteToLocation(shelter.location)
                      }
                    >
                      <div className="injuredshelterstart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                        >
                          <rect
                            y="3.05176e-05"
                            width="67"
                            height="67"
                            rx="8"
                            fill="#EBEBEB"
                          />
                          <path
                            d="M53.9333 47.0944H53.0627V43.1333C53.0627 42.7547 52.7558 42.4478 52.3772 42.4478C51.9986 42.4478 51.6917 42.7547 51.6917 43.1333V47.0944H42.8043V44.5089H47.8965C48.7786 44.5089 49.4964 43.7912 49.4964 42.9091V29.4833C49.4964 28.6013 48.7786 27.8835 47.8965 27.8835H42.8043V25.2981H51.6917V40.1453C51.6917 40.524 51.9986 40.8308 52.3772 40.8308C52.7558 40.8308 53.0627 40.524 53.0627 40.1453V25.2981H54.8648C55.4952 25.2981 56.0075 24.7853 56.0075 24.1555V21.3891C56.0075 20.7587 55.4946 20.2464 54.8648 20.2464H42.8043V17.8191H44.6064C45.2368 17.8191 45.7491 17.3063 45.7491 16.6765V13.9095C45.7491 13.2792 45.2362 12.7669 44.6064 12.7669H22.3941C21.7637 12.7669 21.2514 13.2797 21.2514 13.9095V16.6759C21.2514 17.3063 21.7643 17.8186 22.3941 17.8186H24.1962V20.2459H20.3818C20.0032 20.2459 19.6964 20.5527 19.6964 20.9314C19.6964 21.31 20.0032 21.6169 20.3818 21.6169H24.1962V23.9261H12.364V21.6169H17.384C17.7626 21.6169 18.0695 21.31 18.0695 20.9314C18.0695 20.5527 17.7626 20.2459 17.384 20.2459H12.1357C11.5053 20.2459 10.9931 20.7587 10.9931 21.3885V24.1555C10.9931 24.7858 11.5059 25.2981 12.1357 25.2981H13.9378V47.0944H13.0672C11.4289 47.0944 10.0959 48.4274 10.0959 50.0657V52.0847C10.0959 52.715 10.6087 53.2273 11.2385 53.2273H55.7615C56.3918 53.2273 56.9041 52.7145 56.9041 52.0847V50.0657C56.9046 48.4274 55.5716 47.0944 53.9333 47.0944ZM48.1249 38.053H42.8043V34.3395H48.1249V38.053ZM47.8965 43.1375H42.8043V39.424H48.1249V42.9086C48.1249 43.035 48.0224 43.1375 47.8965 43.1375ZM47.8965 29.2545C48.0224 29.2545 48.1249 29.357 48.1249 29.4828V32.9675H42.8043V29.254L47.8965 29.2545ZM54.6365 21.6174V23.9266H42.8043V21.6174H54.6365ZM22.6229 14.1384H44.3781V16.4476H22.6229V14.1384ZM41.4328 17.8186V47.0938H39.4637V39.5119C39.4637 38.6298 38.746 37.912 37.8639 37.912H29.1361C28.254 37.912 27.5363 38.6298 27.5363 39.5119V47.0938H25.5672V17.8186H41.4328ZM28.9078 47.0944V39.5119C28.9078 39.386 29.0103 39.2835 29.1361 39.2835H32.8142V47.0944H28.9078ZM34.1857 39.2835H37.8639C37.9897 39.2835 38.0922 39.386 38.0922 39.5119V47.0938H34.1852L34.1857 39.2835ZM18.8756 34.3395H24.1962V38.053H18.8756V34.3395ZM24.1962 32.968H18.8756V29.4833C18.8756 29.3575 18.9781 29.255 19.104 29.255H24.1962V32.968ZM18.8756 39.4245H24.1962V43.138H19.104C18.9781 43.138 18.8756 43.0355 18.8756 42.9096V39.4245ZM15.3088 25.2981H24.1962V27.8835H19.104C18.2219 27.8835 17.5041 28.6013 17.5041 29.4833V42.9091C17.5041 43.7912 18.2219 44.5089 19.104 44.5089H24.1962V47.0944H15.3088V25.2981ZM55.5331 51.8558H11.4674V50.0651C11.4674 49.1831 12.1851 48.4653 13.0672 48.4653H53.9333C54.8154 48.4653 55.5331 49.1831 55.5331 50.0651V51.8558Z"
                            fill="black"
                          />
                          <path
                            d="M29.6292 26.5261H31.4599V28.3568C31.4599 28.9872 31.9727 29.4995 32.6026 29.4995H34.3974C35.0278 29.4995 35.5401 28.9866 35.5401 28.3568V26.5261H37.3708C38.0012 26.5261 38.5135 26.0132 38.5135 25.3834V23.5886C38.5135 22.9582 38.0007 22.4459 37.3708 22.4459H35.5401V20.6152C35.5401 19.9848 35.0273 19.4725 34.3974 19.4725H32.6026C31.9722 19.4725 31.4599 19.9853 31.4599 20.6152V22.4459H29.6292C28.9988 22.4459 28.4865 22.9587 28.4865 23.5886V25.3834C28.4865 26.0132 28.9993 26.5261 29.6292 26.5261ZM29.858 23.8169H31.6888C32.3191 23.8169 32.8314 23.3041 32.8314 22.6742V20.8435H34.1696V22.6742C34.1696 23.3046 34.6824 23.8169 35.3123 23.8169H37.143V25.1551H35.3123C34.6819 25.1551 34.1696 25.6679 34.1696 26.2977V28.1285H32.8314V26.2977C32.8314 25.6674 32.3186 25.1551 31.6888 25.1551H29.858V23.8169Z"
                            fill="#AF3D3D"
                          />
                          <path
                            d="M28.679 36.3221H38.3216C38.9519 36.3221 39.4642 35.8093 39.4642 35.1795V32.2326C39.4642 31.6022 38.9514 31.0899 38.3216 31.0899H28.679C28.0486 31.0899 27.5363 31.6028 27.5363 32.2326V35.1795C27.5363 35.8093 28.0491 36.3221 28.679 36.3221ZM38.0927 34.9506H34.1858V32.4609H38.0927V34.9506ZM28.9078 32.4609H32.8148V34.9506H28.9078V32.4609Z"
                            fill="black"
                          />
                        </svg>
                        <div className="injuredshelterdetails">
                          <p className="injuredshelternames">
                            {shelter.name.substring(0, 15)}...
                          </p>
                          <p className="injuredshelterdistance">
                            {shelter.distance < 1000
                              ? `${(shelter.distance / 1000).toFixed(2)} meters`
                              : `${(shelter.distance / 1000).toFixed(
                                  2
                                )} kilometers`}
                          </p>{" "}
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="49"
                        viewBox="0 0 48 49"
                        fill="none"
                      >
                        <rect
                          y="0.500031"
                          width="48"
                          height="48"
                          rx="8"
                          fill="#1D8D3E"
                        />
                        <path
                          d="M21.2477 22.6651C21.0043 22.6651 20.771 22.7618 20.5989 22.9338C20.4269 23.1059 20.3302 23.3393 20.3302 23.5826V27.2524H22.1651V24.5H24.9174V26.7937L28.1285 23.5826L24.9174 20.3715V22.6651H21.2477ZM24.6486 14.7686L33.7314 23.8514C33.9034 24.0234 34 24.2568 34 24.5C34 24.7433 33.9034 24.9766 33.7314 25.1487L24.6486 34.2314C24.4766 34.4034 24.2433 34.5 24 34.5C23.7567 34.5 23.5234 34.4034 23.3514 34.2314L14.2686 25.1487C14.0966 24.9766 14 24.7433 14 24.5C14 24.2568 14.0966 24.0234 14.2686 23.8514L23.3514 14.7686C23.5234 14.5967 23.7567 14.5 24 14.5C24.2433 14.5 24.4766 14.5967 24.6486 14.7686Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>

              {showMore && (
                <button className="load-more-button" onClick={loadMoreShelters}>
                  <p>View More</p>
                </button>
              )}
            </div>
            <div className="map_injuredhospitals visible">
              <h2 className="injuredhospitalshead">Hospitals Within 2.5 kms</h2>
              <hr className="injuredhospitals_line" />

              <ul className="injuredhospitals_list">
                {displayedHospitals.map((hospital, index) => (
                  <li key={index}>
                    <div
                      className="injuredhospital"
                      onClick={() => {
                        console.log("Hospital Location:", hospital.location);
                        calculateAndDisplayRouteToLocation(hospital.location);
                      }}
                    >
                      <div className="injuredhospitalstart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="67"
                          height="67"
                          viewBox="0 0 67 67"
                          fill="none"
                        >
                          <rect
                            y="3.05176e-05"
                            width="67"
                            height="67"
                            rx="8"
                            fill="#EBEBEB"
                          />
                          <path
                            d="M53.9333 47.0944H53.0627V43.1333C53.0627 42.7547 52.7558 42.4478 52.3772 42.4478C51.9986 42.4478 51.6917 42.7547 51.6917 43.1333V47.0944H42.8043V44.5089H47.8965C48.7786 44.5089 49.4964 43.7912 49.4964 42.9091V29.4833C49.4964 28.6013 48.7786 27.8835 47.8965 27.8835H42.8043V25.2981H51.6917V40.1453C51.6917 40.524 51.9986 40.8308 52.3772 40.8308C52.7558 40.8308 53.0627 40.524 53.0627 40.1453V25.2981H54.8648C55.4952 25.2981 56.0075 24.7853 56.0075 24.1555V21.3891C56.0075 20.7587 55.4946 20.2464 54.8648 20.2464H42.8043V17.8191H44.6064C45.2368 17.8191 45.7491 17.3063 45.7491 16.6765V13.9095C45.7491 13.2792 45.2362 12.7669 44.6064 12.7669H22.3941C21.7637 12.7669 21.2514 13.2797 21.2514 13.9095V16.6759C21.2514 17.3063 21.7643 17.8186 22.3941 17.8186H24.1962V20.2459H20.3818C20.0032 20.2459 19.6964 20.5527 19.6964 20.9314C19.6964 21.31 20.0032 21.6169 20.3818 21.6169H24.1962V23.9261H12.364V21.6169H17.384C17.7626 21.6169 18.0695 21.31 18.0695 20.9314C18.0695 20.5527 17.7626 20.2459 17.384 20.2459H12.1357C11.5053 20.2459 10.9931 20.7587 10.9931 21.3885V24.1555C10.9931 24.7858 11.5059 25.2981 12.1357 25.2981H13.9378V47.0944H13.0672C11.4289 47.0944 10.0959 48.4274 10.0959 50.0657V52.0847C10.0959 52.715 10.6087 53.2273 11.2385 53.2273H55.7615C56.3918 53.2273 56.9041 52.7145 56.9041 52.0847V50.0657C56.9046 48.4274 55.5716 47.0944 53.9333 47.0944ZM48.1249 38.053H42.8043V34.3395H48.1249V38.053ZM47.8965 43.1375H42.8043V39.424H48.1249V42.9086C48.1249 43.035 48.0224 43.1375 47.8965 43.1375ZM47.8965 29.2545C48.0224 29.2545 48.1249 29.357 48.1249 29.4828V32.9675H42.8043V29.254L47.8965 29.2545ZM54.6365 21.6174V23.9266H42.8043V21.6174H54.6365ZM22.6229 14.1384H44.3781V16.4476H22.6229V14.1384ZM41.4328 17.8186V47.0938H39.4637V39.5119C39.4637 38.6298 38.746 37.912 37.8639 37.912H29.1361C28.254 37.912 27.5363 38.6298 27.5363 39.5119V47.0938H25.5672V17.8186H41.4328ZM28.9078 47.0944V39.5119C28.9078 39.386 29.0103 39.2835 29.1361 39.2835H32.8142V47.0944H28.9078ZM34.1857 39.2835H37.8639C37.9897 39.2835 38.0922 39.386 38.0922 39.5119V47.0938H34.1852L34.1857 39.2835ZM18.8756 34.3395H24.1962V38.053H18.8756V34.3395ZM24.1962 32.968H18.8756V29.4833C18.8756 29.3575 18.9781 29.255 19.104 29.255H24.1962V32.968ZM18.8756 39.4245H24.1962V43.138H19.104C18.9781 43.138 18.8756 43.0355 18.8756 42.9096V39.4245ZM15.3088 25.2981H24.1962V27.8835H19.104C18.2219 27.8835 17.5041 28.6013 17.5041 29.4833V42.9091C17.5041 43.7912 18.2219 44.5089 19.104 44.5089H24.1962V47.0944H15.3088V25.2981ZM55.5331 51.8558H11.4674V50.0651C11.4674 49.1831 12.1851 48.4653 13.0672 48.4653H53.9333C54.8154 48.4653 55.5331 49.1831 55.5331 50.0651V51.8558Z"
                            fill="black"
                          />
                          <path
                            d="M29.6292 26.5261H31.4599V28.3568C31.4599 28.9872 31.9727 29.4995 32.6026 29.4995H34.3974C35.0278 29.4995 35.5401 28.9866 35.5401 28.3568V26.5261H37.3708C38.0012 26.5261 38.5135 26.0132 38.5135 25.3834V23.5886C38.5135 22.9582 38.0007 22.4459 37.3708 22.4459H35.5401V20.6152C35.5401 19.9848 35.0273 19.4725 34.3974 19.4725H32.6026C31.9722 19.4725 31.4599 19.9853 31.4599 20.6152V22.4459H29.6292C28.9988 22.4459 28.4865 22.9587 28.4865 23.5886V25.3834C28.4865 26.0132 28.9993 26.5261 29.6292 26.5261ZM29.858 23.8169H31.6888C32.3191 23.8169 32.8314 23.3041 32.8314 22.6742V20.8435H34.1696V22.6742C34.1696 23.3046 34.6824 23.8169 35.3123 23.8169H37.143V25.1551H35.3123C34.6819 25.1551 34.1696 25.6679 34.1696 26.2977V28.1285H32.8314V26.2977C32.8314 25.6674 32.3186 25.1551 31.6888 25.1551H29.858V23.8169Z"
                            fill="#AF3D3D"
                          />
                          <path
                            d="M28.679 36.3221H38.3216C38.9519 36.3221 39.4642 35.8093 39.4642 35.1795V32.2326C39.4642 31.6022 38.9514 31.0899 38.3216 31.0899H28.679C28.0486 31.0899 27.5363 31.6028 27.5363 32.2326V35.1795C27.5363 35.8093 28.0491 36.3221 28.679 36.3221ZM38.0927 34.9506H34.1858V32.4609H38.0927V34.9506ZM28.9078 32.4609H32.8148V34.9506H28.9078V32.4609Z"
                            fill="black"
                          />
                        </svg>
                        <div className="injuredhospitaldetails">
                          <p className="injuredhospitalnames">
                            {hospital.name.substring(0, 15)}...
                          </p>
                          <p className="injuredhospitaldistance">
                            {hospital.distance < 1000
                              ? `${(hospital.distance / 1000).toFixed(
                                  2
                                )} meters`
                              : `${(hospital.distance / 1000).toFixed(
                                  2
                                )} kilometers`}
                          </p>{" "}
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="49"
                        viewBox="0 0 48 49"
                        fill="none"
                      >
                        <rect
                          y="0.500031"
                          width="48"
                          height="48"
                          rx="8"
                          fill="#1D8D3E"
                        />
                        <path
                          d="M21.2477 22.6651C21.0043 22.6651 20.771 22.7618 20.5989 22.9338C20.4269 23.1059 20.3302 23.3393 20.3302 23.5826V27.2524H22.1651V24.5H24.9174V26.7937L28.1285 23.5826L24.9174 20.3715V22.6651H21.2477ZM24.6486 14.7686L33.7314 23.8514C33.9034 24.0234 34 24.2568 34 24.5C34 24.7433 33.9034 24.9766 33.7314 25.1487L24.6486 34.2314C24.4766 34.4034 24.2433 34.5 24 34.5C23.7567 34.5 23.5234 34.4034 23.3514 34.2314L14.2686 25.1487C14.0966 24.9766 14 24.7433 14 24.5C14 24.2568 14.0966 24.0234 14.2686 23.8514L23.3514 14.7686C23.5234 14.5967 23.7567 14.5 24 14.5C24.2433 14.5 24.4766 14.5967 24.6486 14.7686Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>

              {showMore && (
                <button
                  className="load-more-button"
                  onClick={loadMoreHospitals}
                >
                  <p>View More</p>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="precautions">
        <h1 className="precautionshead">Precautions</h1>
      </div>
    </div>
  );
}

export default Hospitals;
