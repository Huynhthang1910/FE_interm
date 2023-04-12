import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";

const EditProfile = ({ editProfile }) => {
    const [credentials, setCredentials] = useState(
        {
            name: '',
            email: '',
            address: '',
            phone: '',
            // pwd: '',
            // re_pwd: '',
            gender: ''
        }
    )

    const credentialsSubmit = (event) => {
        editProfile(false)

        event.preventDefault();
        fetch('https://be-intern.onrender.com/api/v1/employee/NV-77503d22-ceb3-4a86-a73b-ae43e3ff618c/update-self',
            {
                method: 'PUT',
                body: JSON.stringify({
                    employeeName: credentials.name,
                    accountEmail: credentials.email,
                    employeeAddress: credentials.address,
                    employeeGender: credentials.gender,
                    employeeAvatar: '1',
                    employeePhone: credentials.phone
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(data => {
                console.log(data);
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
        <Box m="20px" className={'edit__form'}>
            {/* <form id="register" method="post" enctype="multipart/form-data"> */}
            <form id="register" method="post" onSubmit={credentialsSubmit} >
                <h2 id="register__title">Profile update</h2>
                <div className="register__box">
                    <label htmlFor="user">User<i className="fas fa-asterisk"></i></label>
                    <input id="user" name="name" type="text" maxLength="64" required onChange={profileEditFunc} placeholder="Username" />
                </div>
                <div className="register__box">
                    <label htmlFor="user">Address<i className="fas fa-asterisk"></i></label>
                    <input id="address" name="address" type="text" maxLength="64" required onChange={profileEditFunc} placeholder="Adress" />
                </div>
                <div className="register__box">
                    <label htmlFor="mail">E-mail<i className="fas fa-asterisk"></i></label>
                    <input id="mail" name="email" type="email" size="64" maxLength="64" required onChange={profileEditFunc} placeholder="Example@gmail.com" pattern=".+@gmail.com" title="Example@gmail.com" />
                </div>
                <div className="register__box">
                    <label htmlFor="password">Phone<i className="fas fa-asterisk"></i></label>
                    <input id="phone" name="phone" type="text" maxLength="11" required onChange={profileEditFunc} placeholder="Phone" />
                </div>
                <div className="register__box">
                    <label htmlFor="password">Password<i className="fas fa-asterisk"></i></label>
                    {/* <input id="password" name="pwd" type="password" minLength="6" required onChange={profileEditFunc} placeholder="Password" /> */}
                    <input id="password" name="pwd" type="password" minLength="6" onChange={profileEditFunc} placeholder="Password" />
                </div>
                <div className="register__box">
                    <label htmlFor="password">Confirm Password<i className="fas fa-asterisk"></i></label>
                    {/* <input id="re__password" name="re_pwd" type="password" minLength="6" required onChange={profileEditFunc} placeholder="Confirmed" /> */}
                    <input id="re__password" name="re_pwd" type="password" minLength="6" onChange={profileEditFunc} placeholder="Confirmed" />
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
        </Box>
    );
};

export default EditProfile;