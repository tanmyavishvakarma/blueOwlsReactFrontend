import React, { useState } from "react";
import { createPatient } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddPatient = ({ setCallFetch }) => {
  const [name, setName] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !mobile_no || !email) {
      toast.error("All fields are required");
      return;
    }
    try {
      await createPatient({ name, mobile_no, email });
      setCallFetch((prev) => !prev);
      setName("");
      setMobileNo("");
      setEmail("");
      toast.success("Patient added successfully");
    } catch (error) {
      if (error?.response?.status === 500) {
        toast.error("Patient already exists");
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <h3>Create Patient Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Patient Name..."
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="text">Phone Number</label>
          <input
            type="number"
            value={mobile_no}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="Enter Patient Mobile Number..."
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="text">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Patient Email..."
            required
          />
        </div>
        <button style={{marginTop:"30px"}} type="submit" className="btn">
          Add Patient
        </button>
      </form>
    </>
  );
};
