import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
 const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const { data } = await API.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    console.log(data);

    localStorage.setItem(
      "token",
      data.token
    );

    navigate("/dashboard");
  } catch (error) {
  console.log(error.response?.data);

  alert(
    JSON.stringify(error.response?.data)
  );
}
};

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={submitHandler}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;