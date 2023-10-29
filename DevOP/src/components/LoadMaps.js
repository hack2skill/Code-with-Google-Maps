import React, { useEffect, useMemo, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Loader from './Loader';
import PlacesAutocomplete from './Places';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const libraries = ["places"];
const LoadMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (loadError) return (
    <h3>
      Error loading maps
    </h3>
  );
  if (!isLoaded) return <Loader />;
  return (
    <MyMap />
  )
}

function MyMap() {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const navigate = useNavigate();
  const center = useMemo(() => {
    if (selected) {
      return selected;
    }
    return { lat: 28.5058342, lng: 77.1471691 };
  }, [selected]);
  useEffect(() => {
    if (selected) {
      // console.log(selected);
      toggleShow();
    }
  }, [selected])


  const handleConfirmation = () => {
    // console.log('location confirmed', selected.lat, selected.lng);
    navigate(`/nearbyHospitals/${selected.lat}/${selected.lng}`)
  }

  return (
    <React.Fragment>
      <PlacesAutocomplete setSelected={setSelected} />
      <GoogleMap
        mapContainerStyle={{
          width: "100vw",
          height: "80vh",
        }}
        zoom={10}
        center={center}
        onClick={(event) => {
          setSelected({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          });
        }
        }
      >
        {selected && (
          <React.Fragment>
            <MDBModal show={show}>
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Confirm Location</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <p>Are you sure you want to confirm this location?</p>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn onClick={handleConfirmation} color='primary'>Confirm</MDBBtn>
                    <MDBBtn onClick={toggleShow} color='secondary'>Cancel</MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
            <Marker
              position={selected}
              onClick={() => setSelected(null)}
            />
          </React.Fragment>
        )}
      </GoogleMap>
    </React.Fragment>
  )
}

export default LoadMaps