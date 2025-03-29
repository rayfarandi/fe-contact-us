import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../redux/form";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error saat form dikirim

    try {
      await dispatch(submitForm({ name, email, subject, message })).unwrap(); // Gunakan unwrap() untuk menangani error
      alert("Message sent successfully!");
      navigate("/dashboard"); // Redirect ke halaman utama setelah sukses
    } catch (err) {
      if (err && err.message) {
        const errorMessage = err.error ? `${err.message}:${err.error}` : err.message;
        setError(errorMessage); // Menampilkan pesan error dari backend
      }else{
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Contact Us</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
        {/* Tampilkan pesan error */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
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
          placeholder="Subject Message"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
