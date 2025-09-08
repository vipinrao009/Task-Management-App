import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/baseUrl";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axiosInstance.post('/user/signup',{name,email,password})
        navigate('/')
        toast.success('Registered successfully...')
    } catch (error) {
        toast.error('Failed to register')
    }

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="border p-2 w-full mb-3" required />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full mb-3" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full mb-3" required />
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">Register</button>
         <div className="flex pt-2 gap-2">
          <h5>Already have account ?</h5>
          <span onClick={()=>navigate('/')} className=" cursor-pointer font-semibold text-blue-500 hover:text-blue-600">Login</span>
        </div>
      </form>
    </div>
  );
}
