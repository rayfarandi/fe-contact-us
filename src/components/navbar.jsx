import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-2xl font-bold tracking-wider">Contact Us App</h1>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            className="text-lg bg-violet-300 hover:bg-violet-600 px-4 py-2 rounded-md font-bold transition duration-300"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <div className="hidden md:block text-right">
                <div className="font-semibold">Name: {user.name}</div>
                <div className="text-sm text-gray-200">Role: {user.role}</div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
