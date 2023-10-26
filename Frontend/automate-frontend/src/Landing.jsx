// import { Link } from 'react-router-dom';
import { RegisterForm } from "@/components/RegisterForm"


export default function Landing() {
    return (
        <>
            <div className="row" style={{ backgroundColor: '#B5EECB' }}>
                <div className="col-6" style={{
                    backgroundImage: 'url(/bg_landing_transparent.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    position: 'relative',
                }}>
                    <h1 className="display-2 fw-bold text-body-emphasis" style={{ fontSize: '55px', position: 'absolute', top: '12%', left: '38%', transform: 'translate(-50%, -50%)' }}>
                        AutoMate
                    </h1>
                    <p className="lead fw-bold text-body-emphasis" style={{ fontSize: '25px', fontStyle: 'italic', position: 'absolute', top: '20%', left: '45%', transform: 'translate(-50%, -50%)' }}>
                        Find a Mate for every Auto ride!
                    </p>

                </div>
                <div className="col-1" ></div>
                <div className="col-4 p-3 m-4" style={{ borderRadius: '10px', border: '1px solid #ccc', padding: '20px', backgroundColor: 'white' }}>
                    <h1 className="fw-bold text-body-emphasis text-center" style={{ fontSize: '25px' }}>
                        Create an account
                    </h1>
                    <RegisterForm />
                </div>
            </div >
        </>
    )
}