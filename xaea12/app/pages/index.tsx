'use client' 
import { useLoadScript } from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDi9JdwPoacIpGgQKvZCZMyNsKQbuaZu94",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <div>heilo</div>;
}
