import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const usePharmacistSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const pharmacistsignup = async (
    username,
    registrationNumber,
    pharmacyName,
    email,
    password,
    confirmPassword,
    location
  ) => {
    setIsLoading(true);
    setError(null);

    if (password === confirmPassword) {
      const response = await fetch("/api/auth/signup/pharmacist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          registrationNumber,
          pharmacyName,
          email,
          password,
          location,
          userRole: "pharmacist",
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        //save the user to the local storage
        localStorage.setItem("user", JSON.stringify(json));

        //update the auth context
        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
      }
    } else {
      setError("Password mismatch");
    }
  };

  return { pharmacistsignup, isLoading, error };
};
