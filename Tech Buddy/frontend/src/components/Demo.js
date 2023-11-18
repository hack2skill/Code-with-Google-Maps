// import { useEffect, useRef, useState } from 'react';
// import { GoogleMap, Marker, OverlayView, useJsApiLoader } from '@react-google-maps/api';
// import Supercluster from 'supercluster';
// import useSWR from 'swr';
// import mapStyles from './mapStyles.json';

// // ...

// function Demo() {
//     // Existing code
//     const containerStyle = { width: '100%', height: '500px' };
//     const center = { lat: 48.766666, lng: 11.433333 };
//     const options = {
//         streetViewControl: false,
//         mapTypeControl: false,
//         fullscreenControl: false,
//         styles: mapStyles,
//         maxZoom: 20,
//         minZoom: 6
//     };


//     const { isLoaded: isMapLoaded } = useJsApiLoader({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY });
//     const [zoom, setZoom] = useState(options.minZoom);
//     const [bounds, setBounds] = useState([0, 0, 0, 0]);
//     const [clusters, setClusters] = useState([]);
//     const mapRef = useRef();
//     // const { data, error, isLoading: isDataLoading } = useSWR('vehicles', fetcher);

//     useEffect(() => {
//         if (data?.length && mapRef.current) {
//             sc.load(formatDataToGeoJsonPoints(data));
//             setClusters(sc.getClusters(bounds, zoom));
//         }
//     }, [data, bounds, zoom]);

//     if (error) {
//         return <div className="container pt-5"><h2 className="text-center">Error loading data</h2></div>;
//     }

//     if (isDataLoading) {
//         return <div className="container pt-5"><h2 className="text-center">Loading...</h2></div>;
//     }

//     if (!isMapLoaded) return null;

//     function handleClusterClick({ id, lat, lng }) {
//         const expansionZoom = Math.min(sc.getClusterExpansionZoom(id), 20);
//         mapRef.current?.setZoom(expansionZoom);
//         mapRef.current?.panTo({ lat, lng });
//     }

//     function handleBoundsChanged() {
//         if (mapRef.current) {
//             const bounds = mapRef.current.getBounds()?.toJSON();
//             setBounds([bounds?.west || 0, bounds?.south || 0, bounds?.east || 0, bounds?.north || 0]);
//         }
//     }

//     function handleZoomChanged() {
//         if (mapRef.current) {
//             setZoom(mapRef.current?.getZoom());
//         }
//     }

//     function handleMapLoad(map) {
//         mapRef.current = map;
//     }

//     return (
//         <div className="container pt-5">
//             <div className="col-12">
//                 <GoogleMap
//                     onLoad={handleMapLoad}
//                     onBoundsChanged={handleBoundsChanged}
//                     onZoomChanged={handleZoomChanged}
//                     mapContainerStyle={containerStyle}
//                     options={options}
//                     center={center}
//                     zoom={zoom}
//                 >
//                     {clusters?.map(({ id, geometry, properties }) => {
//                         const [lng, lat] = geometry.coordinates;
//                         const { cluster, point_count, brand, model, year, available } = properties;

//                         return cluster && (
//                             <Marker
//                                 key={`cluster-${id}`}
//                                 onClick={() => handleClusterClick({ lat, lng })}
//                                 position={{ lat, lng }}
//                                 icon="/images/cluster-pin.png"
//                                 label={getLabel(point_count)}
//                             />
//                         )
//                     })}
//                 </GoogleMap>
//             </div>
//         </div>
//     )
// }

// export default Demo;
