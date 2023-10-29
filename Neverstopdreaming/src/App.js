import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationMenu from './screens/LocationMenu';
import ViewLocation from './screens/ViewLocation';
import { Login } from './screens/Login';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path='/location-menu' element={<LocationMenu/>}/>
      <Route path='/view-location' element={<ViewLocation/>}/>
    </Routes>
   </Router>

   
  );
}

export default App;
