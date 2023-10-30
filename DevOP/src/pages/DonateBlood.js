import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'

const BloodBankCard = ({ imgSrc, imgAlt, title, description, footer }) => {
    return (
        <MDBContainer className='d-flex justify-content-center' style={{margin: '10px auto'}}>
            <MDBCard>
                <MDBRow className='g-0 align-items-center flex-row'>
                    <MDBCol md='8'>
                        <MDBCardImage src={imgSrc} alt={imgAlt} fluid />
                    </MDBCol>
                    <MDBCol md='4'>
                        <MDBCardBody>
                            <MDBCardTitle>
                                {title}
                            </MDBCardTitle>
                            <MDBCardText>
                                {description}
                            </MDBCardText>
                            <MDBCardText>
                                <small className='text-muted'>{footer}</small>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    )
}
const DonateBlood = () => {
    const hospitals = [
        {
            imgSrc: 'https://lh5.googleusercontent.com/p/AF1QipPAiXP8K-C2YXA4dbCp-HrtAJYDJrzNp93TTTdX=w408-h544-k-no',
            imgAlt: 'TMH Blood Bank',
            title: 'TMH Blood Bank',
            description: 'R53J+PHG, Beldih Golf Course, Dhatkidih, Jamshedpur, Jharkhand 831001, India',
            footer: 'Open 24 hours',
            place_id: 'igBfPJ81KzPqx3ys7'
        },
        {
            imgSrc: 'https://lh5.googleusercontent.com/p/AF1QipPqJFwSyrCcdmyj4p0kYGmuTDtXpaaBeCRbbWaw=w582-h240-k-no',
            imgAlt: 'Meditrina Hospital',
            title: 'Meditrina Hospital',
            description: 'C2, 11, Dindli Basti, Adityapur, Jamshedpur, Jharkhand 831013',
            footer: 'Open 24 hours',
            place_id: 'yjXBcUR1qKKd2M3P8',
        }
    ]
    return (
        <div>
            <h1>Donate Blood</h1>
            <MDBContainer>
                <Alert status='warning'>
                    <AlertIcon />
                    <AlertTitle>No donation camps found!</AlertTitle>
                    {/* <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
                </Alert>
            </MDBContainer>
            <MDBContainer className='d-flex flex-column justify-content-center m-10'>
                {hospitals.map((hospital) => (
                    <BloodBankCard
                        imgSrc={hospital.imgSrc}
                        imgAlt={hospital.imgAlt}
                        title={hospital.title}
                        description={hospital.description}
                        footer={hospital.footer}
                        key={hospital.place_id}
                    />
                ))}
            </MDBContainer>
        </div>
    )
}

export default DonateBlood