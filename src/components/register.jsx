// src/components/Register.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name })).then((res) => {
      if (res.payload) navigate("/login"); // Redirect ke halaman login setelah sukses
    });
  };

  return (
    <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-lg font-bold mb-4">Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Register
      </button>
    </form>
  );
};

export default Register;
