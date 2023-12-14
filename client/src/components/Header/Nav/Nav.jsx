import React from "react";

const Nav = ({ handleLogout }) => {
  return (
    <nav>
      Nav
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Nav;
