import React from "react";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from '../../../../theme';
import './EditProfile.css'

const EditProfile = ({ info, setFetchInfo, hiddenEditForm }) => {
    const urlupdateInfoEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/self-update`
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const tokenTaken = sessionStorage.getItem("token");
    const [credentials, setCredentials] = useState({ name: '', address: '', phone: '', gender: '' })
    // const [errorDatas, setErroDatas] = useState([]);
    const errorDatas = []
    const formCredentialsRef = useRef(null);
    const componentRef = useRef(null);
    const [show, setShow] = useState(true);
    const inputValue = Object.values(credentials);
    const inputKey = Object.keys(credentials);
    const [notify, setNotify] = useState('')
    const formDatas = credentials;
    const [isClicked, setIsClicked] = useState(false);

    //? stored value
    const handleInputCredentials = (event) => {
        const { name, value } = event.target;
        setCredentials((event) => ({ ...event, [name]: value.trim() }));
    }

    //? validate value
    const emptySubmit = () => {
        // setErroDatas([]);
        errorDatas.length = 0
        if (inputValue.every((value) => !value)) {
            // setErroDatas(datas => [...datas, "all input"])
            // setNotify("Please fill all input");
            errorDatas.push(' fill in all input')
            return false
        } else if (inputValue.some((value) => value === "")) {
            const emptyDatas = Object.keys(formDatas).filter(key => !formDatas[key]);
            // setErroDatas(datas => [...datas, ` ${emptyDatas.join(' and ')}`])
            // setNotify(`Please fill in  ${emptyDatas.join(' and ')} fields`);
            errorDatas.push(` fill in  ${emptyDatas.join(' and ')} fields`)
            return false
        }
        else {
            const regexName = /^[a-zA-Z\s]+$/
            const regexPhone = /^[0-9]+$/
            inputKey.forEach((inputKeys) => {
                if (inputKeys == 'name' && !regexName.test(formDatas[inputKeys])) {
                    // setErroDatas(pushName => [...pushName, 'name only receive letter'])
                    errorDatas.push('name only receive letter')
                    // return false
                }
                if (inputKeys == 'phone' && !regexPhone.test(formDatas[inputKeys])) {
                    // setErroDatas(pushPhone => [...pushPhone, 'phone only receive number'])
                    errorDatas.push('phone only receive number')
                    // return false
                }
            })
            if (errorDatas.length > 0) return false
        }
    }

    //? submit event
    const handleCredentialsSubmit = (event) => {
        event.preventDefault();
        setShow(!show) //? pop up
        const isSubmit = emptySubmit();
        if (isSubmit === false) {
            setNotify(`Fail please ${errorDatas.join(' and ')}`)
        } else {
            setNotify('Upload Success', errorDatas);
            fetch(urlupdateInfoEmployee,
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
                        setFetchInfo({
                            ...info,
                            employeeName: credentials.name,
                            employeePhone: credentials.phone,
                            employeeAddress: credentials.address,
                            employeeGender: credentials.gender,
                        });
                        hiddenEditForm(false)
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 2000);
    }

    //? pop up
    useEffect(() => {
        let timeoutId;

        const handleOutsideClick = (event) => {
            if (
                componentRef.current && //tru
                componentRef.current.contains(event.target) //tru
            ) {
                setShow(!show); //fal
                timeoutId = setTimeout(() => {
                    setShow(false);
                    console.log("timeout");
                }, 2000);
            }
        };
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleOutsideClick);

        };
    }, [show]);


    return (
        <Box >
            <div className='edit__form_cover'></div>
            <div className='edit__form'
                style={{
                    backgroundColor: colors.primary[400],
                }}
            >
                <form id="register" method="post" ref={formCredentialsRef} onSubmit={handleCredentialsSubmit} >
                    <h3 id="register__title">Profile update</h3>
                    <div className="register__box">
                        <label htmlFor="user">User Name</label>
                        <input id="user" name="name" type="text" maxLength="20" required onChange={handleInputCredentials} placeholder="Username" />
                    </div>
                    <div className="register__box">
                        <label htmlFor="user">Address</label>
                        <input id="address" name="address" type="text" maxLength="50" required onChange={handleInputCredentials} placeholder="Address" />
                    </div>
                    <div className="register__box">
                        <label htmlFor="password">Phone</label>
                        <input id="phone" name="phone" type="text" maxLength="10" required onChange={handleInputCredentials} placeholder="Phone" />
                    </div>
                    <div className="register__box container__check">
                        <label htmlFor="genders">Gender</label>
                        <ul className="gender_box">
                            <li>
                                <input id="female" name="gender" type="radio" defaultValue="0" onChange={handleInputCredentials} />
                                <label htmlFor="female">Female</label>
                            </li>
                            <li>
                                <input id="male" name="gender" type="radio" defaultValue="1" onChange={handleInputCredentials} />
                                <label htmlFor="male">Male</label>
                            </li>

                        </ul>
                    </div>
                    <div className="register__box button__box">
                        <input type="submit" defaultValue="Update profile" id="register__btn" disabled={false} className={(show == true) ? "editAllow" : "editNon"} />
                        {/* <input type="reset" defaultValue="Reset profile" id="reset__btn" onClick={handleResetCredentials} /> */}
                        <input type="button" defaultValue="✕" id="cancel__btn" onClick={() => { hiddenEditForm(false) }} />
                    </div>

                </form>
                <div id="editNotif" ref={componentRef} className={(show == true) ? "hidden" : ""} >
                    <div className="openEditForm">
                        <div className="errorEditForm">{notify}</div>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default EditProfile;
