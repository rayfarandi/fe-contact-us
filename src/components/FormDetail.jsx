import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormById } from "../redux/form";
import { useParams } from "react-router-dom";

const FormDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { formDetail } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(getFormById(id));
  }, [dispatch, id]);

  if (!formDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Form Detail</h2>
      <p><strong>Name:</strong> {formDetail.name}</p>
      <p><strong>Email:</strong> {formDetail.email}</p>
      <p><strong>Message:</strong> {formDetail.message}</p>
      <p><strong>Status:</strong> {formDetail.status}</p>
    </div>
  );
};

export default FormDetail;
