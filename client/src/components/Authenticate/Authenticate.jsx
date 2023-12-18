import { useState } from "react";

import Login from "./Login";
import Register from "./Register";

function Authenticate({ handleLogin, handleRegister }) {
  const [loginView, setLoginView] = useState(true); // true for Login view, false for Register view

  const toggleView = () => setLoginView(!loginView);

  return (
    <div>
      {loginView ? (
        <>
          <Login toggleView={toggleView} handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <Register toggleView={toggleView} handleRegister={handleRegister} switchToLogin={()=>toggleView()}/>
        </>
      )}
    </div>
  );
}

export default Authenticate;
