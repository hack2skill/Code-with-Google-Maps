// import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NearbyHospitals from './pages/NearbyHospitals';
import DonateBlood from './pages/DonateBlood';
// import ProtectedRoute from './components/Authentication/ProtectedRoute';
import Navbar from './components/Navbar';
import Subscribe from './pages/Subscribe';

function App() {
  return (
    <div className="App">
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<DonateBlood/>} />
        <Route path="/subscribe" element={<Subscribe/>} />
        <Route path="/nearbyHospitals" element={() => <Navigate to={"/"}/>} />
        <Route path="/nearbyHospitals/:lat/:lng" element={<NearbyHospitals />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
        {/* <Route path="users/*" element={<Users />} /> */}
      </Routes>
    </div>
  );
}

export default App;
