import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/api/auth/login",
        {
          name,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <input
                type="text"
                placeholder="Enter your Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </li>
            <li>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </form>
        <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default LoginPage;
