import React, { useContext, useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    // MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_erakt.png'
import { AuthContext } from './Authentication/AuthProvider';

export default function App() {
    const { user, logout } = useContext(AuthContext);
    const [showNavText, setShowNavText] = useState(false);

    return (
        <MDBNavbar sticky expand='lg' light style={{ backgroundColor: '#e3f2fd', marginBottom: '10px' }}>
            <MDBContainer fluid>
                <MDBNavbarBrand className='align-items-center'>
                    <Link to='/'>
                        <MDBCardImage src={logo} alt='logo' style={{ width: '2rem', borderRadius: '50%', display: 'inline-block' }} />
                        eRakt
                    </Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarText'
                    aria-controls='navbarText'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavText(!showNavText)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNavText}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 align-items-center'>
                        <MDBNavbarItem style={{ padding: '10px' }}>
                            <Link to='/'>
                                <span className='navbar-text' style={{color: 'black', fontSize: '1.1rem'}}>Home</span>
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem style={{ padding: '10px' }}>
                            <Link to='/donate'>
                                <span className="navbar-text" style={{color: 'black', fontSize: '1.1rem'}}>Donate Blood</span>
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem style={{ padding: '10px' }}>
                            <Link to='subscribe'>
                                <span className="navbar-text" style={{color: 'black', fontSize: '1.1rem'}}>Subscribe</span>
                            </Link>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right fullWidth={false} className='d-flex align-items-center'>
                        {user ? (
                            <React.Fragment>
                                <MDBNavbarItem style={{ padding: '10px' }}>
                                    <Link to='/profile'>
                                        <span className='navbar-text' style={{color: 'black', fontSize: '1.1rem'}}><MDBIcon icon='user' fas /></span>
                                    </Link>
                                </MDBNavbarItem>
                                <MDBNavbarItem style={{ padding: '10px' }}>
                                    <MDBBtn onClick={() => logout()}>Logout</MDBBtn>
                                </MDBNavbarItem>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <MDBNavbarItem style={{ padding: '10px' }}>
                                    <Link to='/login'>
                                        <span className='navbar-text' style={{color: 'black', fontSize: '1.1rem'}}>Login</span>
                                    </Link>
                                </MDBNavbarItem>
                                <MDBNavbarItem style={{ padding: '10px' }}>
                                    <Link to='/register'>
                                        <span className='navbar-text' style={{color: 'black', fontSize: '1.1rem'}}>Register</span>
                                    </Link>
                                </MDBNavbarItem>
                            </React.Fragment>
                        )}
                    </MDBNavbarNav>
                    {/* <span className='navbar-text'> Navbar text with an inline element </span> */}
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}