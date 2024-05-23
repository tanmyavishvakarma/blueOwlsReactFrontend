import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { PatientList } from "./components/PatientList";
import { AddPatient } from "./components/AddPatient";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [callFetch, setCallFetch] = useState(true);

  return (
    <Router>
      <Header />
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/add-patient"
            element={<AddPatient setCallFetch={setCallFetch} />}
          />
          <Route
            path="/"
            element={<PatientList callFetch={callFetch} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
