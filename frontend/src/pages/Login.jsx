import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      console.log(data);

      // ruaj token
      localStorage.setItem("token", data.token);

      // ruaj user (shumë e rëndësishme për dashboard)
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);

      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
  <div className="login-container">
   <h1>
  Sports Facility
  <br />
  Management System
</h1>

    <form onSubmit={submitHandler}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Login
      </button>
    </form>

    <p>
      Welcome to the Sport Facility
      Management System
    </p>
  </div>
);
}

export default Login;