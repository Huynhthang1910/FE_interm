import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from '../../../../theme';

import './EditProfile.css'

const EditProfile = ({ editProfile, updateFetchApis }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const tokenTaken = sessionStorage.getItem("token");
    const [credentials, setCredentials] = useState(
        {
            name: '',
            email: '',
            address: '',
            phone: '',
            gender: ''
        }
    )
    // console.log(editProfile);
    const credentialsSubmit = (event) => {
        editProfile(false)
        updateFetchApis(false)
        event.preventDefault();
        fetch('https://be-intern.onrender.com/api/v2/employee/self-update',
            {
                method: 'PUT',
                body: JSON.stringify({
                    employeeName: credentials.name,
                    accountEmail: credentials.email,
                    employeeAddress: credentials.address,
                    employeeGender: credentials.gender,
                    // employeeAvatar: '1',
                    employeePhone: credentials.phone
                }),
                headers: {
                    Authorization: `Bearer ${tokenTaken}`, // Add the token as a bearer token
                    "Content-Type": "application/json",
                },
            }
        )
            .then(response => {
                if (response.status === "BAD_REQUEST") {
                    console.log('PUT request succeeded');
                } else {
                    console.error('PUT request failed with status:', response.status);
                }
            })
            .catch(error => {
                console.error(error);
            });
        console.log(credentials)
    }


    const profileEditFunc = (event) => {
        setCredentials(
            {
                ...credentials,
                [event.target.name]: event.target.value
            }
        )
    }
    return (
        <Box m="20px">
            <div className='edit__form_cover'></div>
            <div className='edit__form'
                style={{
                    backgroundColor: colors.primary[400],
                }}
            >
                <form id="register" method="post" onSubmit={credentialsSubmit} >
                    <h2 id="register__title">Profile update</h2>
                    <div className="register__box">
                        <label htmlFor="user">User<i className="fas fa-asterisk"></i></label>
                        <input id="user" name="name" type="text" maxLength="64" required onChange={profileEditFunc} placeholder="Username" />
                    </div>
                    <div className="register__box">
                        <label htmlFor="user">Address<i className="fas fa-asterisk"></i></label>
                        <input id="address" name="address" type="text" maxLength="200" required onChange={profileEditFunc} placeholder="Adress" />
                    </div>
                    <div className="register__box">
                        <label htmlFor="mail">E-mail<i className="fas fa-asterisk"></i></label>
                        <input id="mail" name="email" type="email" size="64" maxLength="64" required onChange={profileEditFunc} placeholder="Example@gmail.com" pattern=".+@gmail.com" title="Example@gmail.com" />
                    </div>
                    <div className="register__box">
                        <label htmlFor="password">Phone<i className="fas fa-asterisk"></i></label>
                        <input id="phone" name="phone" type="text" maxLength="11" required onChange={profileEditFunc} placeholder="Phone" />
                    </div>

                    <div className="register__box conteiner__check">
                        <label htmlFor="genders">Gender</label>
                        <ul className="conteiner__check">
                            <li>
                                <input id="female" name="gender" type="radio" value="0" onChange={profileEditFunc} />
                                <label htmlFor="female">Female</label>
                            </li>
                            <li>
                                <input id="male" name="gender" type="radio" value="1" onChange={profileEditFunc} />
                                <label htmlFor="male">Male</label>
                            </li>
                            <li>
                                <input id="other" name="gender" type="radio" value="2" onChange={profileEditFunc} />
                                <label htmlFor="other">Other</label>
                            </li>
                        </ul>
                    </div>
                    <div className="register__box">
                        <label htmlFor="age">Age</label>
                        <input id="age" name="" type="date" minLength="2" />
                    </div>
                    <input type="submit" value="Update profile" id="register__btn" onClick={credentialsSubmit} />

                </form>
                <div id="overlay" className="hidden">
                    <div id="avatar"></div>
                </div>
            </div>
        </Box>
    );
};

export default EditProfile;