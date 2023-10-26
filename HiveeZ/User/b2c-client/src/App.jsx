import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hospitals from "./pages/hospitals/Hospitals";
import Auth from "./pages/auth/Auth";
import "./App.css";
import { useEffect } from "react";
import { checkAllPermissions } from "./util/NotificationManager";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./context/user.context";

function App() {
  useEffect(() => {
    checkAllPermissions();
  }, [checkAllPermissions]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Hospitals />} />
          <Route
            path="/auth"
            exact
            element={
              <ProtectedRoute>
                <Auth />
              </ProtectedRoute>
            }
          >
          <Route
            path="verify"
            element={
              <ProtectedRoute>
                <VerifyOtp />
              </ProtectedRoute>
            }
          />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
