import React, { useState } from "react";
import { Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { searchPatients } from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Patient Lists");
  const [searchResults, setSearchResults] = useState([]);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    const routes = {
      "Create Patient Profile": "/add-patient",
      "Patient Lists": "/",
    };
    navigate(routes[name]);
  };

  const handleSearch = async (e) => {
    const name = e.target.value;
    if (name.length > 2) { // Trigger search only if the query is longer than 2 characters
      try {
        const response = await searchPatients(name);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Failed to search patients", error);
      }
    } else {
      setSearchResults([]); // Clear results if search query is too short
    }
  };

  return (
    <Menu pointing secondary>
      <MenuItem
        name="Patient Lists"
        active={activeItem === "Patient Lists"}
        onClick={handleItemClick}
      />
      <MenuItem
        name="Create Patient Profile"
        active={activeItem === "Create Patient Profile"}
        onClick={handleItemClick}
      />
      <MenuMenu position="right">
        {/* <MenuItem>
          <Input
            icon="search"
            placeholder="Search Patient..."
            onChange={handleSearch}
          />
        </MenuItem> */}
      </MenuMenu>

    </Menu>
  );
};

export default Navbar;
