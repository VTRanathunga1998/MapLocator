import { useState } from "react";
import LoginCSS from "./Login.module.css";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userName, password, role);
  };

  return (
    <div className={`${LoginCSS["main-form-container"]}`}>
      <div className={`shadow ${LoginCSS["form-container"]}`}>
        <form className={`${LoginCSS["signin"]}`} onSubmit={handleSubmit}>
          <div className="text-center">
            <h1>Login</h1>
          </div>
          <div className={`form-group ${LoginCSS["form-div"]}`}>
            <label>Email address</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              placeholder="Username"
            />
          </div>
          <div className={`form-group ${LoginCSS["form-div"]}`}>
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </div>
          <div className={`form-group ${LoginCSS["form-div"]}`}>
            <label>Role</label>
            <select
              className={`form-select`}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <div className={`form-group ${LoginCSS["form-div"]}`}>
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
          {error && (
            <div
              className={`text-center ${LoginCSS["error"]} ${LoginCSS["form-element"]}`}
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
