import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    if (password === confirmPassword) {
      const response = await fetch("/api/auth/signup/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, userRole: "user" }),
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

  return { signup, isLoading, error };
};
