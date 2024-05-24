import React, { useEffect, useState } from "react";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.min.css";
import { createAppointment, getAppointmentsForPatient } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PatientProfileModal = ({ data, closeModal }) => {
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [currentDate, setNewDate] = useState(new Date());
  const [updatedAppointments, setAppointments] = useState();

  const handleCreateAppointment = async (event) => {
    event.preventDefault();
    const appointment = {
      patient_id: data.id,
      appointment_time: currentDate.toISOString(),
    };
    try {
      await createAppointment(appointment);
      const res = await getAppointmentsForPatient(data.id);
      setAppointments(res.data);
      setIsCreatingAppointment(false);
      toast.success("Appointment Scheduled");
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Error creating appointment");
    }
  };

  useEffect(() => {
    async function getAppointments() {
      const res = await getAppointmentsForPatient(data.id);
      setAppointments(res.data);
    }
    getAppointments();
  }, [data.id]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <div
        style={{
          minHeight: "100%",
          minWidth: "100%",
          position: "relative",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          onClick={closeModal}
          className="close-btn"
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          x
        </button>
        {isCreatingAppointment ? (
          <form onSubmit={handleCreateAppointment}>
            <h3>Create Appointment</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  minWidth: "100%",
                }}
              >
                <label>
                  <h5> Select Appointment Date:</h5>
                </label>
                <DatePicker
                  format="yyyy-MM-dd HH:mm:ss"
                  oneTap
                  value={currentDate}
                  onChange={(e) => setNewDate(e)}
                />
                <button
                  type="submit"
                  className="appointment-btn"
                  style={{ marginRight: "10px" }}
                >
                  Submit
                </button>
              </div>

              <button
                onClick={() => setIsCreatingAppointment(false)}
                className="profile-btn"
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  background: "orange",
                }}
              >
                Go Back
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h3>{data.name} Profile</h3>
            <div>
              <b>Name:</b> {data.name}
            </div>
            <div>
              <b>Phone:</b> {data.mobile_no}
            </div>
            <div>
              <b>Email:</b> {data.email}
            </div>
            <div>
              <b>Scheduled Appointments:</b>
              {updatedAppointments?.length > 0 ? (
                updatedAppointments?.map((item) => {
                  const appointmentTimeUTC = new Date(
                    item.appointment_time + "Z"
                  );
                  const options = {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  };
                  const formattedTimeIST = appointmentTimeUTC.toLocaleString(
                    "en-IN",
                    options
                  );

                  return (
                    <ul key={item.id}>
                      <li>
                        <b>Date/Time</b>: {formattedTimeIST}
                        <br></br>
                        <b>Stripe Payment Link</b>:{" "}
                        <a
                          href={item.payment_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.payment_link}
                        </a>
                      </li>
                    </ul>
                  );
                })
              ) : (
                <b> No Appointments Scheduled</b>
              )}
            </div>
            <button
              onClick={() => setIsCreatingAppointment(true)}
              className="appointment-btn"
              style={{ marginTop: "20px" }}
            >
              Create New Appointment
            </button>
          </div>
        )}
      </div>
    </>
  );
};
