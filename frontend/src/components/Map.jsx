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
		ctar: localStorage.getItem("Company_target"),
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
			const apiUrl = "http://localhost:5000";
			console.log("clicked");
			setLoading(true);
			const response = await fetch(`${apiUrl}/api/add_locations`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ locations: [...selectedLocations, details] }),
			});
			setLoading(false);

			if (response.ok) {
				const data = await response.json();
				console.log("Response:", data);
				addresultmarker(data);
				BlaaMap();
				setShowBestSolutionPopup(true);
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
		const finallocations = response["locations"];
		const rank = response["rank"];

		const newResultMarkers = finallocations.map((location, i) => {
			const marker = L.marker([location["lat"], location["lng"]]);

			const j = rank[i];
			const i_ = i + 1;
			const label = `Location ${i_} <br> Ranked: ${j}`;

			marker.bindTooltip(label, {
				permanent: true,
				direction: "right",
				offset: [3, -3],
				className: "my-labels",
			});

			return marker;
		});

		// Set result markers using setResultMarkers
		setResultMarkers(newResultMarkers);
		// setResultInfoVisible(true);
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
