import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
const SignupPage = () => {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          password,
        }
      );
      navigate("/login");
    } catch (error) {
      console.log("Signup error:", error);
      setError("Signup failed. Please try again.");
    }
  };
  return (
    <>
      <div>
        <h1>SignUp Page</h1>
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
                type="text"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li>
              <button placeholder="Sumbit" type="sumbit">
                Sumbit
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
