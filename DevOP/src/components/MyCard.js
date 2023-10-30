import React, { useContext, useEffect, useState } from 'react';
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
import BloodGroupTable from './BloodGroupTable';
import { AuthContext } from './Authentication/AuthProvider';
import { DataContext } from './Authentication/DataProvider';

export default function MyCard({ ad, imgSrc, imgAlt, title, description, footer, bloodGroup }) {
    // const { user } = useContext(AuthContext);
    const { myBloodGroup } = useContext(DataContext);
    const { A, B, AB, O, Aneg, Bneg, ABneg, Oneg } = bloodGroup;
    const [matched, setMatched] = useState(false);

    useEffect(() => {
        if (myBloodGroup && myBloodGroup === 'A+') {
            if (A > 0 || Aneg > 0) setMatched(true)
        }
        if (myBloodGroup && myBloodGroup === 'B+') {
            if (B > 0 || Bneg > 0) setMatched(true)
        }
        if (myBloodGroup && myBloodGroup === 'AB+') {
            if (AB > 0 || ABneg > 0) setMatched(true)
        }
        if (myBloodGroup && myBloodGroup === 'O+') {
            if (O > 0 || Oneg > 0) setMatched(true)
        }
        if (myBloodGroup && myBloodGroup === 'A-') {
            if (Aneg > 0) setMatched(true)
        }
        if (myBloodGroup && myBloodGroup === 'B-') {
            if (Bneg > 0) setMatched(true)
        }
        if (myBloodGroup && myBloodGroup === 'AB-') {
            if (ABneg > 0) setMatched(true)
        }
        if (myBloodGroup && myBloodGroup === 'O-') {
            if (Oneg > 0) setMatched(true)
        }
    }, [myBloodGroup, A, B, AB, O, Aneg, Bneg, ABneg, Oneg])

    return (
        <MDBCard style={{ maxWidth: '100vw', margin: 10 }}>
            <MDBRow className='g-0 align-items-center flex-row'>
                <MDBCol md='8'>
                    <MDBRow className='g-0 align-items-center flex-column'>
                        <MDBCol md='8'>
                            <MDBCardImage src={imgSrc} alt={imgAlt} fluid />
                        </MDBCol>
                        <MDBCol md='8'>
                            <MDBCardBody>
                                <MDBCardTitle>
                                    {title}
                                    {ad && (
                                        <h6 style={{ display: 'inline-block' }}>
                                            <MDBBadge pill color='danger' light>{' '} Ad </MDBBadge>
                                        </h6>
                                    )}
                                </MDBCardTitle>
                                <MDBCardText>
                                    {description}
                                </MDBCardText>
                                <MDBCardText>
                                    <small className='text-muted'>{footer}</small>
                                </MDBCardText>
                                <MDBCardFooter>
                                    {bloodGroup ? matched ? (
                                        <MDBBadge pill color='success' light>
                                            {' '} Matched Blood Available
                                        </MDBBadge>
                                    ) : (
                                        <MDBBadge pill color='danger' light>
                                            {' '} Matched Blood Not Available
                                        </MDBBadge>
                                    ) : (
                                        <MDBBadge pill color='success' light>
                                            All blood groups available
                                        </MDBBadge>
                                    )}
                                </MDBCardFooter>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md='4'>
                    <BloodGroupTable
                        A={A}
                        B={B}
                        AB={AB}
                        O={O}
                        Aneg={Aneg}
                        Bneg={Bneg}
                        ABneg={ABneg}
                        Oneg={Oneg}
                    />
                </MDBCol>

            </MDBRow>
        </MDBCard>
    );
}