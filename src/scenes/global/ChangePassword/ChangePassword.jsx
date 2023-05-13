import React, { useState } from "react";
import "./ChangePassword.scss";
import UrbanLogo from "./UrbanLogo.png";

const ChangePassword = (props) => {
  const token = sessionStorage.getItem("token");
  // console.log(token)
  const [messageTitle, setMassageTitle] = useState("");
  const [newPass, setPass] = useState();
  const [reNewPass, setReNewPass] = useState();
  const newPassword = (event) => {
    setPass(event.target.value);
  };
  const reNewPassword = (event) => {
    setReNewPass(event.target.value);
  };
  let urlResetPassword = `${process.env.REACT_APP_API_ENDPOINT}api/v2/account/reset-password`;
  let payLoad = {
    accountPassword: newPass,
    retypeAccountPassword: reNewPass,
  };
  let option = {
    method: "PUT",
    body: JSON.stringify(payLoad),
    headers: {
      Authorization: `Bearer ${token}`, // Add the token as a bearer token
      "Content-Type": "application/json",
    },
  };
  // console.log(option.headers)
  // const callAPI = () => {
  // }
  // console.log(callAPI())
  const handleChangePass = () => {
    if (!newPass || !reNewPass) {
      setMassageTitle("Please enter enough information!");
      setTimeout(()=>{setMassageTitle(false)},3000)
    } else if (newPass !== reNewPass) {
      console.log(newPass, reNewPass);
      setMassageTitle("New password is not match!");
      setTimeout(()=>{setMassageTitle(false)},3000)
    } else {
      fetch(urlResetPassword, option)
        .then((res) => res.json())
        .then((data) => props.controlSetMess("success"))
        .catch((error) => {
          console.log(error);
        });
      props.controlSetMess("wait")
      props.changeStatePassForm();

      // alert("đổi thành công!");
    }
  };
  if (props.statePw) {
    return (
      <div>
        <div
          className="ChangePass_around"
          onClick={() => {
            props.changeStatePassForm();
          }}
        ></div>
        <form className="ChangePass__form">
          <div className="form_title">CHANGE PASSWORK</div>
          <div className="ChangePass__form_input">
            <input
              id="newPass"
              type="password"
              className="box"
              onChange={(event) => newPassword(event)}
            ></input>
            <label className="title">New password:</label>
          </div>
          <div className="ChangePass__form_input">
            <input
              id="reNewPass"
              type="password"
              className="box"
              onChange={(event) => reNewPassword(event)}
            ></input>
            <label className="title">New password again:</label>            
          </div>
          

          <button
            type="button"
            className="btn-changePass confirm"
            onClick={() => handleChangePass()}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn-changePass cancel"
            onClick={() => {
              props.changeStatePassForm();
            }}
          >
            Cancel
          </button>
        </form>
        {messageTitle && (
          <div className="message error">
          <div className="message_error">
              <div className="message_error_icon">i</div>
          </div>
          <span className="message_title">
              {messageTitle}
          </span>
      </div>  
        )}
      </div>
    );
  }
};

export default ChangePassword;
