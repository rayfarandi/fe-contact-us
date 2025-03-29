import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar";
import ContactForm from "./components/contactform";
import FormDetail from "./components/FormDetail";

function App() {
  const { token } = useSelector((state) => state.auth); // Ambil token dari state auth

  return (
    <Router>
      <div>
        {token && <Navbar />} {/* Navbar hanya akan tampil jika user sudah login */}
        <Routes>
          {/* Redirect dari Home ke /dashboard jika sudah login */}
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Home />} />

          {/* Protected Route: Jika sudah login, redirect ke dashboard */}
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />

          {/* Hanya dapat diakses jika sudah login */}
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/contact" element={token ? <ContactForm /> : <Navigate to="/login" />} />
          <Route path="/forms/:id" element={token ? <FormDetail /> : <Navigate to="/login" />} />

          {/* Redirect ke home jika tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
