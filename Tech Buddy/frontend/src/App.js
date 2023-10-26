import { Route, Routes ,Navigate } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import "./Main.css"
import { useEffect, useState } from 'react';
import axios from "axios";
import Report from './components/Report';


function App() {
  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `http://localhost:8800/auth/google/success`;
			const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
			setUser(data.user);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);
  return (
    <div className="App">
      <Routes>
      <Route
					exact
					path="/"
					element={user ? <Body user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
        <Route
					exact
					path="/report"
					element={user ? <Report/>:<Login/>}
				/>
      </Routes>
    </div>
  )
}

export default App
