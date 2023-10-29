import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit'

const Loader = () => {
    return (
        <MDBSpinner className='mx-2' color='warning' style={{ width: '5rem', height: '5rem' }}>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
    )
}

export default Loader