import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Map.css";
import Loader from "./Loader";
function Map() {
	const [map, setMap] = useState(null);
	const [resultInfoVisible, setResultInfoVisible] = useState(false);
	const [selectedLocations, setSelectedLocations] = useState([]);
	const [markers, setMarkers] = useState([]);
	const [resultMarkers, setResultMarkers] = useState([]);
	const [loading, setLoading] = useState(false);

	const [details, setDetails] = useState({
		cname: localStorage.getItem("company_name"),
		ctype: localStorage.getItem("Company_Type"),
		cloc: localStorage.getItem("Company_location"),
		csize: localStorage.getItem("Company_size"),
	});
	const [showBestSolutionPopup, setShowBestSolutionPopup] = useState(false);

	useEffect(() => {
		const newMap = L.map("map").setView([15, 77], 6);
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(newMap);
		setMap(newMap);
	}, []);

	useEffect(() => {
		if (map) {
			map.on("click", onMapClick);
		}
	}, [map]);

	const onMapClick = (e) => {
		const clickedLat = e.latlng.lat;
		const clickedLng = e.latlng.lng;

		const stepIcon = L.icon({
			iconUrl: "https://cdn-icons-png.flaticon.com/512/3082/3082383.png",
			iconSize: [30, 30],
		});

		const marker = L.marker([clickedLat, clickedLng], { icon: stepIcon });
		marker.addTo(map);

		setMarkers((prevMarkers) => [...prevMarkers, marker]);

		const locationDetails = { lat: clickedLat, lng: clickedLng };
		setSelectedLocations((prevLocations) => [
			...prevLocations,
			locationDetails,
		]);
	};

	const deleteLocation = (index) => {
		const newMarkers = [...markers];
		const marker = newMarkers[index];
		map.removeLayer(marker);
		newMarkers.splice(index, 1);
		setMarkers(newMarkers);

		const newLocations = [...selectedLocations];
		newLocations.splice(index, 1);
		setSelectedLocations(newLocations);
	};

	const onSubmitButtonClick = async () => {
		try {
			const apiUrl = "http://haleel.pythonanywhere.com/test";
			setLoading(true);

			const cords = selectedLocations
				.map((location) => `${location.lat},${location.lng}`)
				.join(",");
			const formdata = new FormData();
			formdata.append("cords", cords);
			formdata.append("type", details.ctype);
			formdata.append("size", details.csize);

			const requestOptions = {
				method: "POST",
				body: formdata,
				redirect: "follow",
				
			};

			const response = await fetch(apiUrl, requestOptions);

			setLoading(false);

			if (response.ok) {
				const data = await response.json(); // Parse the response as JSON

					console.log("Response:", data);
					addresultmarker(data);
					BlaaMap();
			} else {
				console.error("Failed to submit locations:", response.statusText);
			}
		} catch (error) {
			console.error("Error sending data to Flask:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (map && resultMarkers.length > 0) {
			// Clear previous result markers and set the new ones
			resultMarkers.forEach((marker) => marker.addTo(map));

			return () => {
				// Clean up by removing result markers when component unmounts
				resultMarkers.forEach((marker) => map.removeLayer(marker));
			};
		}
	}, [map, resultMarkers]);

const addresultmarker = (response) => {
	const observations1 = response["observation1"];
	const observations2 = response["observation2"];
	const competitors = response.competitors;
	const rank = response["rank"];

	if (
		!observations1 ||
		!observations2 ||
		!rank ||
		observations1.length !== observations2.length ||
		observations1.length !== rank.length
	) {
		console.error("Invalid response data.");
		return;
	}

	//competitor
	const competitorMarkersGroup = L.layerGroup();

	for (const competitorName in competitors) {
			const competitor = competitors[competitorName][0]; // Access the first element of the array
			const lat = competitor.lat;
			const lng = competitor.lng;

			const competitorMarker = L.circle([lat, lng], {
				color: "red",
				fillColor: "#f03",
				fillOpacity: 0.5,
				radius: 20,
			});

			// Set the competitor's name as the tooltip content
			competitorMarker.bindTooltip(competitorName, {
				permanent: false,
				direction: "top",
				offset: [0, -10], // Adjust the offset as needed
			});

			competitorMarkersGroup.addLayer(competitorMarker);
	}

	// Add the competitor markers layer group to the map
	competitorMarkersGroup.addTo(map);

	const newResultMarkers = observations1.map((observation, i) => {
		const marker = L.marker([
			selectedLocations[i].lat,
			selectedLocations[i].lng,
		]);

		const j = rank[i];
		const i_ = i + 1;

		let tooltipContent = `Location ${i_} <br> Ranked: ${j}`;

		if (observations1[i] !== "") {
			tooltipContent += `<br>${observations1[i]}`;
		}

		if (observations2[i] !== "") {
			tooltipContent += `<br>${observations2[i]}`;
		}

		marker.bindTooltip(tooltipContent, {
			permanent: true,
			direction: "right",
			offset: [3, -3],
			className: "my-labels",
		});

		return marker;
	});

	setResultMarkers(newResultMarkers);
};




	const BlaaMap = () => {
		markers.forEach((marker) => map.removeLayer(marker));
		setMarkers([]);
		setSelectedLocations([]);
	};

	const resetMap = () => {
		markers.forEach((marker) => map.removeLayer(marker));
		setMarkers([]);
		setResultMarkers([]);
		setSelectedLocations([]);
	};

	const handleBestSolutionClick = () => {
		setShowBestSolutionPopup(false);
		window.location.reload();
	};

	return (
		<div className="flex">
			<div id="map" className="w-screen"></div>
			<div className="container">
				<div className="w-72 h-screen p-4 bg-gray">
					<div className="mb-4">
						<button
							className="button"
							onClick={onSubmitButtonClick}
							disabled={selectedLocations.length === 0}
						>
							Submit
						</button>
						<button className="button " onClick={resetMap}>
							Reset
						</button>
					</div>
					<div id="locationsList" className="mx-4">
						<h2 className="text-xl font-semibold mb-2">Selected Locations</h2>
						{selectedLocations.map((location, index) => (
							<div key={index} className="border-b pb-2 mb-2">
								<p className="text-sm">
									<span className="font-semibold">Location {index + 1}:</span>
									<br />
									Latitude: {location.lat}
									<br />
									Longitude: {location.lng}
								</p>
								<button
									className="button mt-2"
									onClick={() => deleteLocation(index)}
								>
									Delete
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
			{resultInfoVisible && (
				<div id="locationsList" className="mx-4">
					<h3>Result</h3>
					<p>
						As shown on the map, the locations are sorted based on different
						factors. The location with Rank <b>1</b> is the best location among
						the choices you have shown, then Rank <b>2</b> and so on...
					</p>
				</div>
			)}
			{loading && <Loader />}
		</div>
	);
}

export default Map;
