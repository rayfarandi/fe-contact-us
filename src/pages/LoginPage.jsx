import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import Login from "../components/login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (result) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("login failid", error);
      setError(error.message);
    }
  };
  return (
    <div className="flex h-screen flex-wrap  items-center justify-center lg:justify-between">
      <div className="w-1/2 mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          alt="Login Illustration"
          className="w-full"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div>
          {error &&<div
            id="toast-top-right"
            class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm top-5 right-5 dark:text-red-500 dark:divide-gray-700 dark:bg-gray-800"
            role="alert"
          >
            <div class="text-sm font-normal">{error}</div>
          </div>}
          

          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
