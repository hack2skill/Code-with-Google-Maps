import Map from '@/components/render_map'
import Sidebar from '@/components/sidebar'
import { useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';

const libraries = ["places"];


export default function Home() {

  const [lat, setLat] = useState(27.672932021393862);
  const [long, setLng] = useState(85.31184012689732);

  const [circleColor, setCircleColor] = useState('green');

  const [route, setRoute] = useState(null);
  const [wayPointList, setWayPointList] = useState([]);
  const [map, setMap] = useState(null);
  const [isWayPointInfoBoxOpen, setIsWayPointInfoBoxOpen] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className='relative w-full h-full'>
      <div className="absolute z-20 max-w-sm">
        <Sidebar
          setLat={setLat}
          setLng={setLng}
          setCircleColor={setCircleColor}
          setRoute={setRoute}
          route={route}
          map={map}
          setWayPointList={setWayPointList}
          isWayPointInfoBoxOpen={isWayPointInfoBoxOpen}
          setIsWayPointInfoBoxOpen={setIsWayPointInfoBoxOpen}
        />
      </div>
      <div className='w-full h-full'>
        <Map
          lat={lat}
          long={long}
          circleColor={circleColor}
          route={route}
          wayPointList={wayPointList}
          setMap={setMap}
          isWayPointInfoBoxOpen={isWayPointInfoBoxOpen}
          setIsWayPointInfoBoxOpen={setIsWayPointInfoBoxOpen}
        />
      </div>
    </div>
  )
}
