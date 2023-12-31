import React, { useMemo, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import PharmacistSignupCSS from "./PharmacistSignup.module.css";

//custom hooks
import { usePharmacistSignup } from "../../../hooks/usePharmacistSignup";

const PharmacistSignup = () => {
  const [userName, setUserName] = useState("");
  const [pName, setPName] = useState("");
  const [email, setEmail] = useState("");
  const [regNum, setRegNum] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [Location, setLocation] = useState(null);
  const { pharmacistsignup, isLoading, error } = usePharmacistSignup();

  const center = useMemo(() => ({ lat: 6.9271, lng: 79.8612 }), []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    setLocation({
      type: "Point",
      coordinates: [lat, lng],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pharmacistsignup(
      userName,
      regNum,
      pName,
      email,
      password,
      confirmPassword,
      Location
    );
  };

  return (
    <div className={`container ${PharmacistSignupCSS["main-form-container"]} `}>
      <div className={`shadow`}>
        <div className="text-center">
          <h1>Register Pharmacist</h1>
        </div>
        <div className={`${PharmacistSignupCSS["form-container"]} `}>
          <div className={` ${PharmacistSignupCSS["form-container-tags"]} `}>
            <form
              className={PharmacistSignupCSS["sign-up"]}
              onSubmit={handleSubmit}
            >
              <div
                className={`form-group ${PharmacistSignupCSS["form-element"]}`}
              >
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  placeholder="Username"
                  required
                />
              </div>

              <div
                className={`form-group ${PharmacistSignupCSS["form-element"]}`}
              >
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email"
                  required
                />
              </div>

              <div
                className={`form-group ${PharmacistSignupCSS["form-element"]}`}
              >
                <label>Pharmacy name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPName(e.target.value)}
                  value={pName}
                  placeholder="Pharmacy Name"
                  required
                />
              </div>

              <div
                className={`form-group ${PharmacistSignupCSS["form-element"]}`}
              >
                <label>Pharmacy register number</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setRegNum(e.target.value)}
                  value={regNum}
                  placeholder="Registration Number"
                  required
                />
              </div>

              <div
                className={`form-group ${PharmacistSignupCSS["form-element"]}`}
              >
                <label>Location:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Select Coordination"
                  readOnly
                  value={
                    selectedLocation
                      ? `Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}`
                      : ""
                  }
                  required
                />
              </div>

              <div
                className={`form-group ${PharmacistSignupCSS["form-element"]}`}
              >
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  required
                />
              </div>

              <div
                className={`form-group ${PharmacistSignupCSS["form-element"]}`}
              >
                <label>Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div
                className={`form-group text-center ${PharmacistSignupCSS["form-element"]}`}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-primary`}
                >
                  SignUp
                </button>
              </div>
              {error && (
                <div
                  className={`text-center ${PharmacistSignupCSS["error"]} ${PharmacistSignupCSS["form-element"]}`}
                >
                  {error}
                </div>
              )}
            </form>
          </div>

          <div className={`${PharmacistSignupCSS["map-container"]}`}>
            {typeof window !== "undefined" && window.google ? (
              <GoogleMap
                center={center}
                zoom={12}
                onClick={handleMapClick}
                mapContainerStyle={{
                  height: "75vh",
                  width: "100%",
                }}
              >
                {selectedLocation && (
                  <Marker
                    position={{
                      lat: selectedLocation.lat,
                      lng: selectedLocation.lng,
                    }}
                  />
                )}
              </GoogleMap>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacistSignup;
