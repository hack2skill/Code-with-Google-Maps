import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import env from "react-dotenv";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect, useRef, useState, } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'


function Body() {
  const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 });
  const [zoom, setZoom] = useState(15)
  const [markerData, setMarkerData] = useState();
  const [loading, setLoading] = useState(false);
  const isPhone = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate(); 
  console.log()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(posi => {
      setCenter({
        lat: posi.coords.latitude,
        lng: posi.coords.longitude
      })
    })
  }, [])

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const data = await axios.get('http://localhost:8800/report');
      setMarkerData(data.data);
      // console.log(data);
      setLoading(false);
    } catch (error) {

    }
  }


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  const customMarkerIcon = {
    url: "https://hotpot.ai/images/site/ai/art_maker/teaser.jpg", // Image URL
    anchor: new window.google.maps.Point(16, 32), // Position the anchor to the center of the image
    scaledSize: new window.google.maps.Size(32, 32), // Adjust the size as needed
  };



  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        {!loading ? <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          {/* <Marker position={center} /> */}

          <Marker
            position={center}
            name={"log"}
            icon={{
              url: 'https://maps.google.com/mapfiles/kml/shapes/man.png', // Custom marker icon URL
              // scaledSize: map.
            }}
          /> 

          {markerData.map((marker, index) => {
            // console.log(typeof(marker.latitude.$numberDecimal.))
            return (
              <Marker
                position={{lat: Number(marker.latitude.$numberDecimal), lng: Number(marker.longitude.$numberDecimal)}}
                // name={"log"}
                key={index}
                icon={{
                  url: marker.icon, // Image URL
                  anchor: new window.google.maps.Point(16, 32), // Position the anchor to the center of the image
                  scaledSize: new window.google.maps.Size(32, 32), // Adjust the size as needed
                }} />
            );
          })}


          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap> : <div>loading</div>}
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        // minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          {/* <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup> */}
      {!isPhone &&
        <ButtonGroup>
          <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
            Calculate Route
          </Button>
          <IconButton
            aria-label='center back'
            icon={<FaTimes />}
            onClick={clearRoute}
          />
        </ButtonGroup>
      }
        </HStack>
        {isPhone &&
        <VStack spacing={2} m={2}>
        <ButtonGroup>
          <Button colorScheme='pink' w={'80%'} type='submit' onClick={calculateRoute}>
            Calculate Route
          </Button>
          <IconButton
            aria-label='center back'
            icon={<FaTimes />}
            onClick={clearRoute}
          />
        </ButtonGroup>
        </VStack>
      }
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
      <Flex
      direction="column"
      h="100vh" w="100vw" m={4} // Set the container height to 100% of the viewport height
      justifyContent="flex-end" // Align the content at the bottom
      alignItems="flex-end" // Align the content to the right
    >
      <Button colorScheme="red" type="submit" onClick={()=>{
        navigate('/report')
      }}>
      <Box as="img" width="20px" marginRight="6px" src="https://img.icons8.com/ios-filled/20/000000/error--v1.png" />
      Report
    </Button>
    </Flex>

    </Flex>
  )
}

export default Body
