import React, { useState } from "react";
import { Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Patient Lists");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    const routes = {
      "Create Patient Profile": "/add-patient",
      "Patient Lists": "/",
    };
    navigate(routes[name]);
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
      <MenuMenu position="right"></MenuMenu>
    </Menu>
  );
};

export default Navbar;
