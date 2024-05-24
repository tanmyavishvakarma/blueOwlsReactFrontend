import React, { useState } from "react";
import Modal from "react-modal";
import { PatientProfileModal } from "./PatientProfileModal";

const customStyles = {
  content: {
    padding: "0",
    height: "60%",
    width: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const Patient = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <li style={{ minWidth: "430px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100%",
          minWidth: "100%",
          position: "relative",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <div>
            <b>Name</b>: {data.name}
          </div>
          <div>
            <b>Phone</b>: {data.mobile_no}
          </div>
          <div>
            <b>Email</b>: {data.email}
          </div>
        </div>
        <button onClick={openModal} className="profile-btn">
          Open Patient Profile
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Patient Profile"
        ariaHideApp={false}
        style={customStyles}
      >
        <PatientProfileModal data={data} closeModal={closeModal} />
      </Modal>
    </li>
  );
};
