import React from 'react'
import { MDBBtn, MDBInput, MDBListGroup } from 'mdb-react-ui-kit';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const PlacesAutocomplete = ({ setSelected }) => {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete(
        // {
        // requestOptions: {
        //     location: { lat: () => 43.6532, lng: () => -79.3832 },
        //     radius: 100 * 1000,
        // },
        // }
    );
    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setSelected({ lat, lng });
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <React.Fragment>
            <MDBInput label='Enter your location' id='search-address' type='text' value={value} onChange={e => setValue(e.target.value)} disabled={!ready} className='place-search' />
            <MDBListGroup style={{ minWidthL: '22rem' }} light>
                {status === 'OK' && data.map(({ place_id, description }) => (
                    <MDBBtn onClick={() => handleSelect(description)} key={place_id} color={'tertiary'} className='search-res'>
                        {description}
                    </MDBBtn>
                ))}
            </MDBListGroup>
        </React.Fragment>
    )
}

export default PlacesAutocomplete