// App.js
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/userSignUp/Signup";
import PharmacistSignup from "./pages/Signup/pharmacistSignUp/PharmacistSignup";
import LocateUs from "./pages/LocateUs/LocateUs";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <Routes>
            <Route
              index
              element={!user ? <Login /> : <Navigate to="/locate-us" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/locate-us" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/locate-us" />}
            />
            <Route
              path="/pharmacist-signup"
              element={
                !user ? <PharmacistSignup /> : <Navigate to="/locate-us" />
              }
            />
            <Route
              path="/locate-us"
              element={user ? <LocateUs /> : <Navigate to="/" />}
            />
          </Routes>
        </LoadScript>
      </BrowserRouter>
    </div>
  );
}

export default App;
