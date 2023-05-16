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
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        sessionStorage.clear();
        window.location.href = "/";
      }
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
          if (decodedToken.exp == currentTime) {
            sessionStorage.clear();
            window.location.href = "/"; // Nếu mà không nhập token mới sau 2p
          }
          if (decodedToken.exp < currentTime) {
            sessionStorage.clear();
            window.location.href = "/"; // Nếu hết hạn mà
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

  // useEffect(() => {
  //   let timeoutId;
  //   if (showAlert) {
  //     timeoutId = setTimeout(() => {
  //       sessionStorage.clear();
  //       window.location.href = "/";
  //     }, 120000);
  //   }
  //   return () => clearTimeout(timeoutId);
  // }, [showAlert]);

  return (
    <>
      {showAlert && (
        <div className="alert alert-warning fixed-top" role="alert">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-sm-8 text-center">
                Your session is about to expire in 2 minutes. Please enter your
                password to continue using.
              </div>
              <div className="col-12 col-sm-4 text-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleTokenExpired}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenChecker;
