import React from "react";
import "./navAccount..scss"
import { Link } from "react-router-dom";
import ShowProfile from "./ChangeProfileInfor/ShowProfile";
import { useEffect, useRef } from "react";

const handleLogOut = () => {
  sessionStorage.removeItem("token");
  window.location.reload();
};

const NavAccount = (props, changeStateNav1) => {
    const navChildRef = useRef(null);
    useEffect(() => {
        props.navRef.current = navChildRef.current;
      }, []);
        return (
          <div ref={navChildRef}>
            {props.stateNav && (
              <div className="account">
                <div
                  className="acccount__ChangePass div"
                  onClick={() => {
                    props.changeStatePassForm();
                  }}
                >
                  Change Pasword
                </div>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={"/profile"}
                  className="acccount__Profile div"
                  onClick={() => {
                  changeStateNav1(true);
                  <ShowProfile></ShowProfile>;}}
                >
                  User Profile
                </Link>
                <div className="account__logOut div">
                  <a
                    onClick={handleLogOut}
                    className="logOutBtn"
                    style={{ cursor: "pointer" }}
                  >
                    Log Out
                  </a>
                </div>
              </div>
            )}
          </div>
        );
}
export default NavAccount;
