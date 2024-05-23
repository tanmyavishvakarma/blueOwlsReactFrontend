import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { Patient } from "./Patient";
import { searchPatients } from "../api";
import { Search } from "semantic-ui-react";

export const PatientList = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await searchPatients(searchQuery);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Failed to search patients", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [searchQuery]);

  const handleSearchChange = (e, { value }) => {
    setSearchQuery(value);
  };

  return (
    <>
      <h3>Patient List</h3>
      <Search
        loading={loading}
        results={[]}
        showNoResults={false}
        placeholder="Search..."
        onSearchChange={handleSearchChange}
        value={searchQuery}
      />
      {!loading && searchResults.length === 0 && (
        <h4>No patients found. Navigate to Create Patient Profile To Add New Patient</h4>
      )}
      {!loading && searchResults.length > 0 && (
        <ul className="list">
          {searchResults.map((data) => (
            <Patient key={data.id} data={data} />
          ))}
        </ul>
      )}
    </>
  );
};
