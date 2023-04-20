import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import EditProfile from './EditForm/EditProfile';
import EditProfileAvatar from './EditForm/EditProfileAvatar';
import './ShowProfile.css'
import { tokens } from '../../../theme';
import Placeholder from 'react-bootstrap/Placeholder'

const ShowProfile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const tokenTaken = sessionStorage.getItem("token");
    const [fetchProfileApi, setProfileApi] = useState([]);
    const [hiddenEditForm, setHiddenEditForm] = useState(false);
    const [info, setFetchInfo] = useState(false)

    useEffect(() => {
        fetch('https://be-intern.onrender.com/api/v2/employee/information', {
            headers: {
                Authorization: `Bearer ${tokenTaken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setProfileApi(data.data)
                console.log(data.data);
            })
    }, [info])

    return (
        <Box m="20px"
            style={{
                backgroundColor: colors.primary[400],
            }}>
            <div className="profile__cover">
                <div className="profile__block">
                    <EditProfileAvatar />
                    <div className="profile_desc_block">
                        {
                            Object.keys(fetchProfileApi).map(fetchApi => {
                                let changeFetchApi = fetchApi
                                switch (changeFetchApi) {
                                    case "employeeId":
                                        changeFetchApi = ("employee number");
                                        break;
                                    case "employeeName":
                                        changeFetchApi = ("name");
                                        break;
                                    case "accountEmail":
                                        changeFetchApi = ("gmail");
                                        break;
                                    case "employeePhone":
                                        changeFetchApi = ("phone");
                                        break;
                                    case "employeeAddress":
                                        changeFetchApi = ("adress");
                                        break;
                                    case "employeeGender":
                                        changeFetchApi = ("gender");
                                        break;
                                    case "employeePosition":
                                        changeFetchApi = ("title");
                                        break;
                                    case "headquarterName":
                                        changeFetchApi = ("office name");
                                        break;
                                    case "headquarterAddress":
                                        changeFetchApi = ("office address");
                                        break;
                                    case "accountRole":
                                    case "accountId":
                                    case "headquarterId":
                                    case "employeeAvatar":
                                    case "employeeSalary":
                                    case "accountEmail":
                                        changeFetchApi = ("null");
                                        break;
                                    default:
                                        console.log("ki su IT hoc tai VL");
                                        break;
                                }
                                return (
                                    <div className={
                                        (changeFetchApi === "null")
                                            ? "null" : fetchApi + " " + 'user_profile_title'
                                    }
                                        key={fetchApi}
                                        style={{
                                            backgroundColor: colors.primary[500],
                                        }}
                                    >
                                        <div className="title">{changeFetchApi}</div>
                                        <div className="infor">{(typeof fetchProfileApi[fetchApi] !== "object") ? fetchProfileApi[fetchApi] : 0}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='profile_edit_btn'>
                        <button bg="primary"
                            onClick={() => { setHiddenEditForm(!hiddenEditForm) }}
                            id="profile__edit-btn"
                        // style={{
                        //     backgroundColor: colors.blueAccent[700],
                        // }}
                        >EDIT PROFILE</button>
                        {hiddenEditForm && <EditProfile setFetchInfo={setFetchInfo} hiddenEditForm={setHiddenEditForm} />}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default ShowProfile;