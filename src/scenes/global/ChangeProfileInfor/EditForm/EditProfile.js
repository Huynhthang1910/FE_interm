import React from "react";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import "./EditProfile.css";

const EditProfile = ({ setFetchInfo, hiddenEditForm }) => {
  const formCredentialsRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenTaken = sessionStorage.getItem("token");
  const [credentials, setCredentials] = useState([])
  const handleCredentialsSubmit = (event) => {
    event.preventDefault();
    fetch('https://be-intern.onrender.com/api/v2/employee/self-update',
      {
        method: 'PUT',
        body: JSON.stringify({
          employeeName: credentials.name,
          employeeGender: credentials.gender,
          employeeAddress: credentials.address,
          employeePhone: credentials.phone
        }),
        headers: {
          Authorization: `Bearer ${tokenTaken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => {
        if (response.status === "BAD_REQUEST") {
          console.error('PUT request failed with status:', response.status);
        } else {
          console.log('PUT request succeeded');
          setFetchInfo(pre => !pre) //callback
          hiddenEditForm(false)
        }
      })
      .catch(error => {
        console.error(error);
      });
    console.log(credentials);
  }

  const handleInputCredentials = (event) => {
    setCredentials(
      {
        ...credentials,
        [event.target.name]: event.target.value
      }
    )
    console.log(credentials);
  }
  const handleResetCredentials = () => {
    formCredentialsRef.current.reset();
    setCredentials([])
  }
  return (
    <Box >
      <div className='edit__form_cover'></div>
      <div className='edit__form'
        style={{
          backgroundColor: colors.primary[400],
        }}
      >
        <form id="register" method="post" ref={formCredentialsRef} onSubmit={handleCredentialsSubmit} >
          <h2 id="register__title">Profile update</h2>
          <div className="register__box">
            <label htmlFor="user">User<i className="fas fa-asterisk"></i></label>
            <input id="user" name="name" type="text" maxLength="50" required onChange={handleInputCredentials} placeholder="Username" />
          </div>
          <div className="register__box">
            <label htmlFor="user">Address<i className="fas fa-asterisk"></i></label>
            <input id="address" name="address" type="text" maxLength="200" required onChange={handleInputCredentials} placeholder="Adress" />
          </div>
          <div className="register__box">
            <label htmlFor="password">Phone<i className="fas fa-asterisk"></i></label>
            <input id="phone" name="phone" type="text" maxLength="11" required onChange={handleInputCredentials} placeholder="Phone" />
          </div>
          <div className="register__box conteiner__check">
            <label htmlFor="genders">Gender</label>
            <ul className="conteiner__check">
              <li>
                <input id="female" name="gender" type="radio" defaultValue="0" onChange={handleInputCredentials} />
                <label htmlFor="female">Female</label>
              </li>
              <li>
                <input id="male" name="gender" type="radio" defaultValue="1" onChange={handleInputCredentials} />
                <label htmlFor="male">Male</label>
              </li>
              <li>
                <input id="other" name="gender" type="radio" defaultValue="2" onChange={handleInputCredentials} />
                <label htmlFor="other">Other</label>
              </li>
            </ul>
          </div>
          <div className="register__box">
            <input type="submit" defaultValue="Update profile" id="register__btn" />
            <input type="reset" defaultValue="Reset profile" id="reset__btn" onClick={handleResetCredentials} />
            <input defaultValue="Cancel profile" id="cancel__btn" onClick={() => { hiddenEditForm(false) }} />
          </div>

        </form>
        <div id="overlay" className="hidden">
          <div id="avatar"></div>
        </div>
      </div>
    </Box>
  );
};

export default EditProfile;
