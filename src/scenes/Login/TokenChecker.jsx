import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const TokenChecker = () => {
  const [tokenExp, setTokenExp] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [newToken, setNewToken] = useState(null);
  const [employeeId, setEmployeeID] = useState(null);

  const TOKEN_KEY = "token";

  const checkTokenExp = () => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      const decodedToken = jwt_decode(token);
      const sub = JSON.parse(decodedToken.sub);
      setTokenExp(decodedToken.exp);
      setEmployeeID(sub.employeeId);
    }
  };

  const handleTokenExpired = async () => {
    const password = prompt("Please enter your password to continue using");
    if (password) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}refresh`,
          {
            employeeId,
            password,
          }
        );
        console.log(data);
        if (data.message === "Login Success") {
          sessionStorage.setItem(TOKEN_KEY, data.data);
          setNewToken(data.data);
          setShowAlert(false);
        } else {
          alert("Incorrect password. Please try again.");
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    checkTokenExp();
  }, []);

  useEffect(() => {
    if (tokenExp) {
      const timer = setTimeout(() => {
        const token = sessionStorage.getItem(TOKEN_KEY);
        if (token) {
          const decodedToken = jwt_decode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp - currentTime < 120) {
            setShowAlert(true);
          }
        }
      }, (tokenExp - Date.now() / 1000 - 120) * 1000);
      return () => clearTimeout(timer);
    }
  }, [tokenExp]);

  useEffect(() => {
    if (newToken) {
      const decodedToken = jwt_decode(newToken);
      setTokenExp(decodedToken.exp);
    }
  }, [newToken]);

  return (
    <>
      {showAlert && (
        <div
          className="alert alert-warning fixed-top d-flex justify-content-center align-items-center"
          role="alert"
        >
          <div className="text-center">
            Your session is about to expire in 2 minutes. Please enter your
            password to continue using.
            <button
              className="btn btn-outline-secondary mt-2"
              onClick={handleTokenExpired}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenChecker;
