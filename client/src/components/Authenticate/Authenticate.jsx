import { useState } from "react";

import Login from "./Login";
import Register from "./Register";

function Authenticate({ handleLogin, handleRegister }) {
  const [isLoginView, setIsLoginView] = useState(true); // true for Login view, false for Register view

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div>
      {isLoginView ? (
        <>
          <Login toggleView={toggleView} handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <Register toggleView={toggleView} handleRegister={handleRegister}/>
        </>
      )}
    </div>
  );
}

export default Authenticate;
