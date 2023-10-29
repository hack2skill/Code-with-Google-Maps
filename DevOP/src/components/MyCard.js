import React from 'react';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBCardFooter,
    MDBBadge
} from 'mdb-react-ui-kit';

export default function MyCard({ ad, imgSrc, imgAlt, title, description, footer }) {
    return (
        <MDBCard style={{ maxWidth: '540px', margin: 10 }}>
            <MDBRow className='g-0 align-items-center'>
                {ad && (
                    <MDBBadge pill color='danger' light>
                        Ad
                    </MDBBadge>
                )}
                <MDBCol md='8'>
                    <MDBCardBody>
                        <MDBCardTitle>{title}</MDBCardTitle>
                        <MDBCardText>
                            {description}
                        </MDBCardText>
                        <MDBCardText>
                            <small className='text-muted'>{footer}</small>
                        </MDBCardText>
                        <MDBCardFooter>
                            <MDBBadge pill color='success' light>
                                All blood groups available
                            </MDBBadge>
                        </MDBCardFooter>
                    </MDBCardBody>
                </MDBCol>
                <MDBCol md='4'>
                    <MDBCardImage src={imgSrc} alt={imgAlt} fluid />
                </MDBCol>
            </MDBRow>
        </MDBCard>
    );
}