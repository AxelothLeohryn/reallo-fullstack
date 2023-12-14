import React from "react";
import Nav from "./Nav";

const Header = ({handleLogout}) => {
  return (
    <header>
      Header
      <Nav handleLogout={handleLogout}/>
    </header>
  );
};

export default Header;
