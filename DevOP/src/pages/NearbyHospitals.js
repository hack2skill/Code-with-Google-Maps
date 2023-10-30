import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import axios from 'axios';
import { useLoadScript } from '@react-google-maps/api';
import Loader from '../components/Loader';
import MyCard from '../components/MyCard';
import { MDBContainer } from 'mdb-react-ui-kit';

const libraries = ["places"];
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const LoadMapsWithHospitals = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey,
        libraries,
    });
    if (loadError) return (
        <h1>
            Error loading maps
        </h1>
    );
    if (!isLoaded) return <Loader />;
    return (
        <NearbyHospitals />
    )
}
const NearbyHospitals = () => {
    const navigate = useNavigate();
    const { lat, lng } = useParams();
    // const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => lat, lng: () => lng },
            radius: 200 * 1000,
        },
    });

    useEffect(() => {
        console.log("lat", lat, "lng", lng)
        if (!lat || !lng) {
            navigate("/")
        }
        setValue("hospital");
        // searchPlaces();
    }, [lat, lng])
    useEffect(() => {
        if (status === 'OK' && data.length !== 0) {
            const proxyurl = "https://cors-anywhere-gopk.onrender.com/";
            data.forEach(({ place_id, description }) => {
                const url = `https://places.googleapis.com/v1/places/${place_id}?fields=id,displayName&key=${googleMapsApiKey}`
                fetch(proxyurl + url)
                    .then(response => response.json())
                    .then(contents => console.log("proxy response", contents))
                    .catch(() => console.log("Cannot access " + url + " response. Blocked by browser?"))

                console.log(place_id, description)
            })

        }
    }, [status])

    const hospitals = [
        {
            imgSrc: 'https://lh5.googleusercontent.com/p/AF1QipMNxY37px9XGJSZSQDdwapLxkApNJekMGjWGndt=w408-h306-k-no',
            imgAlt: 'Tata Main Hospital',
            title: 'Tata Main Hospital',
            description: 'C ROAD WEST NORTHERN TOWN, Bistupur, Jamshedpur, Jharkhand 831001',
            footer: 'Open 24 hours',
            place_id: 'DfeHzYh5npQoELKv8',
            bloodGroup: { A: 20, B: 25, AB: 35, O: 40, Aneg: 5, Bneg: 7, ABneg: 8, Oneg: 5 }
        },
        {
            imgSrc: 'https://lh5.googleusercontent.com/p/AF1QipP3iylO4OLep9nqq2yaM2iOm-zp31lMrDRonGnD=w427-h240-k-no',
            imgAlt: 'Magadh Samrat Hospital',
            title: 'Magadh Samrat Hospital',
            description: 'in front of Central Public School, Dindli Basti, Adityapur, Jamshedpur, Jharkhand 831013',
            footer: 'Open 24 hours',
            place_id: 'Q3soyFxWJ3nRByAb6',
            bloodGroup: { A: 0, B: 20, AB: 25, O: 40, Aneg: 0, Bneg: 6, ABneg: 3, Oneg: 2 }
        },
        {
            imgSrc: 'https://lh5.googleusercontent.com/p/AF1QipPn2CPFbgeZjdc_s7VHzzZdEtuzRkZUSxBatVi-=w426-h240-k-no',
            imgAlt: '111 SaveLife Hospital',
            title: '111 SaveLife Hospital',
            description: 'Near Adityapur Railway Station, Adityapur - 2, Jamshedpur, Jharkhand 831013',
            footer: 'Open 24 hours',
            place_id: 'A29iEcQSyyyFG4ut5',
            bloodGroup: { A: 30, B: 20, AB: 15, O: 40, Aneg: 5, Bneg: 6, ABneg: 3, Oneg: 2 }
        },
        {
            imgSrc: 'https://lh5.googleusercontent.com/p/AF1QipPqJFwSyrCcdmyj4p0kYGmuTDtXpaaBeCRbbWaw=w582-h240-k-no',
            imgAlt: 'Meditrina Hospital',
            title: 'Meditrina Hospital',
            description: 'C2, 11, Dindli Basti, Adityapur, Jamshedpur, Jharkhand 831013',
            footer: 'Open 24 hours',
            place_id: 'yjXBcUR1qKKd2M3P8',
            bloodGroup: { A: 25, B: 20, AB: 15, O: 40, Aneg: 5, Bneg: 6, ABneg: 3, Oneg: 2 }
        }
    ]



    const searchPlaces = async () => {
        const response = await axios.get(`https://places.googleapis.com/v1/places/nearbysearch/json?location=${lat},${lng}&radius=1500&type=hospital&key=${googleMapsApiKey}`)
        const data = await response.json();
        console.log(data);
        // https://places.googleapis.com/v1/places/PLACE_ID
    }


    return (
        <React.Fragment>
            <h1>Nearby Hospitals</h1>
            <MDBContainer className='d-flex flex-column align-items-center'>
                <MyCard
                    ad={true}
                    imgSrc={'https://lh5.googleusercontent.com/p/AF1QipPn2CPFbgeZjdc_s7VHzzZdEtuzRkZUSxBatVi-=w426-h240-k-no'}
                    imgAlt={'111 SaveLife Hospital'}
                    title={'111 SaveLife Hospital'}
                    description={'Near Adityapur Railway Station, Adityapur - 2, Jamshedpur, Jharkhand 831013'}
                    footer={'Open 24 hours'}
                    bloodGroup={{ A: 10, B: 20, AB: 15, O: 40, Aneg: 5, Bneg: 6, ABneg: 3, Oneg: 2 }}
                />
                {hospitals.map((hospital) => (
                    <MyCard
                        imgSrc={hospital.imgSrc}
                        imgAlt={hospital.imgAlt}
                        title={hospital.title}
                        description={hospital.description}
                        footer={hospital.footer}
                        key={hospital.place_id}
                        bloodGroup={hospital.bloodGroup}
                    />
                ))}
                {/* {status === 'OK' && data.map(({ place_id, description }) => (
                    <MyCard
                        imgSrc={'https://lh5.googleusercontent.com/p/AF1QipPn2CPFbgeZjdc_s7VHzzZdEtuzRkZUSxBatVi-=w426-h240-k-no'}
                        imgAlt={'111 SaveLife Hospital'}
                        title={'111 SaveLife Hospital'}
                        description={'Near Adityapur Railway Station, Adityapur - 2, Jamshedpur, Jharkhand 831013'}
                        key={place_id}
                    >

                        <h2 key={place_id} color={'tertiary'} className='search-res'>
                            {description}
                        </h2>
                        <p> {place_id} </p>
                    </MyCard>
                ))} */}
            </MDBContainer>
        </React.Fragment>
    )
}


export default LoadMapsWithHospitals