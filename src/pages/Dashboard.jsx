import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllForms,
  fetchUserForms,
  updateFormStatus,
  deleteForm,
} from "../redux/form";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forms } = useSelector((state) => state.form);
  const { user } = useSelector((state) => state.auth); // Ambil user dari state auth

  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchAllForms());
    } else {
      dispatch(fetchUserForms());
    }
  }, [dispatch, user]);

  const openModal = (form) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedForm(null);
    setShowModal(false);
  };

  const handleStatusUpdate = async (status) => {
    if (selectedForm) {
      await dispatch(updateFormStatus({ id: selectedForm.id, status }));
      dispatch(fetchAllForms()); // Refresh forms setelah update status
      closeModal();
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "resolved":
        return "text-green-500";
      case "in-progress":
        return "text-yellow-500";
      case "pending":
        return "text-red-500";
      default:
        return "";
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      await dispatch(deleteForm(id));
      dispatch(fetchAllForms()); // Refresh daftar form setelah delete
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <Link
        to="/contact"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Submit New Form
      </Link>
      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Message</th>
            <th className="py-2 px-4 border">Status</th>
            {user?.role === "admin" && (
              <th className="py-2 px-4 border">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(forms) && forms.length > 0 ? (
            forms.map((form) => (
              <tr key={form.id} className="border">
                <td className="py-2 px-4 border">{form.name}</td>
                <td className="py-2 px-4 border">{form.email}</td>
                <td className="py-2 px-4 border">{form.message}</td>
                <td
                  className={`py-2 px-4 border ${getStatusClass(form.status)}`}
                >
                  {form.status}
                </td>
                {user?.role === "admin" && (
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => navigate(`/forms/${form.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => openModal(form)}
                    >
                      Update Status
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(form.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={user?.role === "admin" ? 4 : 3}
                className="py-2 px-4 border text-center"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4">Update Status</h3>
            <p>Message: {selectedForm.message}</p>
            <p>Current Status: {selectedForm.status}</p>
            <div className="mt-4">
              <button
                onClick={() => handleStatusUpdate("resolved")}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Resolved
              </button>
              <button
                onClick={() => handleStatusUpdate("in-progress")}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                In-Progress
              </button>
              <button
                onClick={() => handleStatusUpdate("pending")}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Pending
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
