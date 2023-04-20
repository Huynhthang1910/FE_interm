import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const DECODE_URL = "https://be-intern.onrender.com/decode";
const SESSION_TOKEN_KEY = "token";

export const useTokenExpirationCheck = () => {
  const { setAuthenticated } = useContext(AuthContext);
  console.log(AuthContext);

  const checkTokenExpiration = async (token) => {
    try {
      const response = await axios.post(
        DECODE_URL,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      const {
        data: { message },
      } = response;
      if (message === "Expired Token") {
        alert("Expired Token, Please sign in again !!!");
        sessionStorage.removeItem(SESSION_TOKEN_KEY);
        window.location.reload();
      } else {
        console.log("qqgcn");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (token) {
      setAuthenticated(true);
      checkTokenExpiration(token);
    }
  }, []);

  return null;
};
