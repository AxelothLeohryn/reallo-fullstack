import { useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
// axios.defaults.baseURL = "http://localhost:5000";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import Authenticate from "./components/Authenticate";
// import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("/user/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      setIsLoggedIn(true);
      console.log("Login successful!", response.data);
      toast.success(response.data.msg);
      navigate(`/`);
    } catch (error) {
      // Error Popups FRONT here ...
      console.error(
        "Registration error:",
        error.response ? error.response.data : error
      );
      toast.error(error.response.data.msg);
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      const response = await axios.post("/user/signup", {
        username,
        email,
        password,
      });
      console.log("Registration successful", response.data);
      toast.success("Registration successful. Please log in now.");
      // Additional logic after successful registration, like redirecting to login
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error
      );
      toast.error(error.response.data.msg || error.response.data);
      // Display or log more detailed error information
    }
  };

  const handleLogout = async () => {
    try {
      // Retrieves the token from localStorage.
      const token = localStorage.getItem("token");
      // Sends a POST request to the /logout endpoint with the JWT token in the Authorization header.
      await axios.post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // On successful logout, it removes the token from localStorage and updates the state to reflect that the user is logged out.
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      toast.success("Logged out");
    } catch (error) {
      // Error Popups FRONT here ...
      console.error("Logout error:", error);
      // toast.error(error.response.data.msg || error.response);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header handleLogout={handleLogout} />
          <Main />
          {/* <Footer /> */}
        </>
      ) : (
        <Authenticate
          handleLogin={handleLogin}
          handleRegister={handleRegister}
        />
      )}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
