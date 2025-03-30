import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import Register from "../components/register";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerUser({ email, password, name })).unwrap();
      if (result) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed", error);
      setError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen flex-wrap items-center justify-center lg:justify-between">
      {/* Left Section (Image) */}
      <div className="w-1/2 mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          alt="Register Illustration"
          className="w-full"
        />
      </div>

      {/* Right Section (Form) */}
      <div className="w-1/2 h-screen flex justify-center items-center bg-gray-100">
        <div>
          {error && (
            <div
              id="toast-top-right"
              className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow-sm top-5 right-5 dark:text-red-500 dark:divide-gray-700 dark:bg-gray-800"
              role="alert"
            >
              <div className="text-sm font-normal">{error}</div>
            </div>
          )}

          <Register
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleRegister}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
