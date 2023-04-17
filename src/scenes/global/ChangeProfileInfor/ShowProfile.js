import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import EditProfile from './EditProfile';

const ShowProfile = () => {
    console.log('hello');
    const [editProfile, setEditProfile] = useState(false);
    const [fetchApis, setFetchApi] = useState([]);

    useEffect(() => {
        // ProfileData().then(data => {
        //     setFetchApi(data.data || data)
        // })
        fetch('https://jsonplaceholder.typicode.com/users/1', {
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Basic ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJlbXBsb3llZUlkXCI6XCJOVi0yZjljNTRkOS01NTYyLTQxOTctYmNiZS1hZGU1YmM2M2ExM2NcIixcImFjY291bnRSb2xlXCI6XCJNYW5hZ2VyXCJ9IiwiZXhwIjoxNjgxMTE4OTYwfQ.d34YkuW8ZSlXcmmJMjOYn9iO3hu8SRwflDzApbG_MGMeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJlbXBsb3llZUlkXCI6XCJOVi0yZjljNTRkOS01NTYyLTQxOTctYmNiZS1hZGU1YmM2M2ExM2NcIixcImFjY291bnRSb2xlXCI6XCJNYW5hZ2VyXCJ9IiwiZXhwIjoxNjgxMTE2NzM4fQ.N1XYSCfAuR - BLo - 9WGclW1dUcvo - cwTGWjfpWEKM0wc'}`
            // }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setFetchApi(data)
            })
    }, [editProfile])
    return (
        <Box m="20px">
            <div className="profile__cover">
                <div className="profile__block">
                    <EditProfile />
                    <div className="profile_desc_block">
                        {
                            Object.keys(fetchApis).map(fetchApi => {
                                let changeFetchApi = fetchApi
                                switch (changeFetchApi) {
                                    case "employeeId":
                                        changeFetchApi = ("ID number");
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
                                    <div className={(changeFetchApi === "null") ? "null" : fetchApi + " " + 'user_profile_title'} key={fetchApi}>
                                        <div className="title">{changeFetchApi}</div>
                                        <div className="infor">{(typeof fetchApis[fetchApi] !== "object") ? fetchApis[fetchApi] : 0}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='profile_edit_btn'>
                        <button onClick={() => { setEditProfile(!editProfile) }} id="profile__edit-btn">EDIT PROFILE</button>
                        {editProfile && <EditProfile editProfile={setEditProfile} />}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default ShowProfile;