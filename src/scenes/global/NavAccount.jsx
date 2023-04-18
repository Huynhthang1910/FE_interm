import React from "react";
import "./navAccount..scss";

const handleLogOut = () => {
  sessionStorage.removeItem("token");
  window.location.reload();
};

const NavAccount = (props) => {
  if (props.stateNav) {
    return (
      <div className="account">
        <div
          className="acccount__ChangePass div"
          onClick={() => {
            props.changeStatePassForm();
          }}
        >
          Change Pasword
        </div>
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
    );
  }
};
export default NavAccount;
