import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import Login from "../components/login"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
        const result = await dispatch(loginUser({ email, password })).unwrap();
    if (result){
        navigate("/dashboard");
    } 
  }catch (error){
    console.error("login failid",error)
  }
  }
  return (
    <Login
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleLogin}
    />
  );
};

export default LoginPage;
