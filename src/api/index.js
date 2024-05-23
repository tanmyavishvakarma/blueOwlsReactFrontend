import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getPatients = () => axios.get(`${API_URL}/patients/`);
export const createPatient = (patient) => axios.post(`${API_URL}/patients/`, patient);
export const searchPatients = (name) => axios.get(`${API_URL}/patients/search`, { params: { name } });
export const getPatient = (id) => axios.get(`${API_URL}/patients/${id}`);
export const createAppointment = (appointment) => axios.post(`${API_URL}/appointments/`, appointment);
export const getAppointmentsForPatient = (patientId) => axios.get(`${API_URL}/appointments/patient/${patientId}`);
