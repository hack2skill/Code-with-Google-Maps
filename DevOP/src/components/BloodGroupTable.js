import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function BloodGroupTable({A, B, AB, O, Aneg, Bneg, ABneg, Oneg}) {
    return (
        <MDBTable>
            <MDBTableHead>
                <tr style={{color: 'darkcyan'}}>
                    <th scope='col'>Blood Group</th>
                    <th scope='col'>Quantity Available</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <th scope='row'>A</th>
                    <td>{A}</td>
                </tr>
                <tr>
                    <th scope='row'>B</th>
                    <td>{B}</td>
                </tr>
                <tr>
                    <th scope='row'>AB</th>
                    <td>{AB}</td>
                </tr>
                <tr>
                    <th scope='row'>O</th>
                    <td>{O}</td>
                </tr>
                <tr>
                    <th scope='row'>A-</th>
                    <td>{Aneg}</td>
                </tr>
                <tr>
                    <th scope='row'>B-</th>
                    <td>{Bneg}</td>
                </tr>
                <tr>
                    <th scope='row'>AB-</th>
                    <td>{ABneg}</td>
                </tr>
                <tr>
                    <th scope='row'>O-</th>
                    <td>{Oneg}</td>
                </tr>

            </MDBTableBody>
        </MDBTable>
    );
}