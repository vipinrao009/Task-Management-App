import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/baseUrl";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/user/login", loginData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleInput}
          className="border p-2 w-full mb-3"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleInput}
          className="border p-2 w-full mb-3"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full cursor-pointer rounded"
        >
          Login
        </button>

        <div className="flex pt-2 gap-2">
          <h5>Don't have account </h5>
          <span onClick={()=>navigate('/register')} className=" cursor-pointer font-semibold text-blue-500 hover:text-blue-600">Sign Up</span>
        </div>
      </form>
    </div>
  );
}
