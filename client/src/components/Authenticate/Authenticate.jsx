import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Recover from "./Login/Recover/Recover";

function Authenticate({ handleLogin, handleRegister, handleRecover }) {
  // const [loginView, setLoginView] = useState(true); // true for Login view, false for Register view

  // const toggleView = () => setLoginView(!loginView);

  return (
    // <div>
    //   {loginView ? (
    //     <>
    //       <Login toggleView={toggleView} handleLogin={handleLogin} />
    //     </>
    //   ) : (
    //     <>
    //       <Register toggleView={toggleView} handleRegister={handleRegister} switchToLogin={()=>toggleView()}/>
    //     </>
    //   )}
    // </div>
    <Routes>
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/register"
        element={<Register handleRegister={handleRegister} switchToLogin={()=>toggleView()}/>}
      />
      <Route
        path="/recover"
        element={<Recover handleRecover={handleRecover} />}
      />

      <Route path="/*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}

export default Authenticate;
