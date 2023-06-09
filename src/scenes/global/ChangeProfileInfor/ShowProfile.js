import React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import EditProfile from "./EditForm/EditProfile";
import EditProfileAvatar from "./EditForm/EditProfileAvatar";
import "./ShowProfile.css";
import { tokens } from "../../../theme";

const ShowProfile = ({ info, setFetchInfo, image, setImage }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenTaken = sessionStorage.getItem("token");
  const [fetchProfileApi, setProfileApi] = useState([]);
  const [hiddenEditForm, setHiddenEditForm] = useState(false);
  console.log("aaaa", info);
  const urlAllInforEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/information`;
  useEffect(() => {
    fetch(urlAllInforEmployee, {
      headers: {
        Authorization: `Bearer ${tokenTaken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileApi(data.data);
      });
  }, [info]);
  console.log(fetchProfileApi.employeeGender);
  // const changeGenderContent = () =>{
  //     Object.keys(fetchProfileApi).map(fetchApi =>{
  //         if(fetchApi)
  //         fetchProfileApi[fetchApi]
  //     })
  // }
  return (
    <Box
      m="20px"
      style={{
        backgroundColor: colors.primary[400],
      }}
    >
      <div className="profile__cover h-100" style={{ height: 700 }}>
        <div className="profile__block">
          <div className="profile__block_infor">
            <EditProfileAvatar image={image} setImage={setImage} />
            <div className="profile_desc_block">
              {Object.keys(info).map((fetchApi) => {
                let changeFetchApi = fetchApi;
                switch (changeFetchApi) {
                  case "employeeId":
                    changeFetchApi = "employee number";
                    break;
                  case "employeeName":
                    changeFetchApi = "name";
                    break;
                  case "accountEmail":
                    changeFetchApi = "gmail";
                    break;
                  case "employeePhone":
                    changeFetchApi = "phone";
                    break;
                  case "employeeAddress":
                    changeFetchApi = "adress";
                    break;
                  case "employeeGender":
                    info.employeeGender =
                      info[fetchApi] === "1" ? "male" : "female";
                    changeFetchApi = "gender";
                    break;
                  case "employeePosition":
                    changeFetchApi = "title";
                    break;
                  case "headquarterName":
                    changeFetchApi = "office name";
                    break;
                  case "headquarterAddress":
                    changeFetchApi = "office address";
                    break;
                  case "accountRole":
                  case "accountId":
                  case "headquarterId":
                  case "employeeAvatar":
                  case "employeeSalary":
                    changeFetchApi = "null__profileData";
                    break;
                  default:
                    console.log("ki su IT hoc tai VL");
                    break;
                }
                return (
                  <div
                    className={
                      changeFetchApi === "null__profileData"
                        ? "null__profileData"
                        : fetchApi + " " + "user_profile_title"
                    }
                    key={fetchApi}
                    style={{
                      backgroundColor: colors.primary[500],
                    }}
                  >
                    <div className="title">{changeFetchApi}</div>
                    <div className="infor">
                      {typeof info[fetchApi] !== "object" ? info[fetchApi] : 0}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="profile_edit_btn">
            <button
              bg="primary"
              onClick={() => {
                setHiddenEditForm(!hiddenEditForm);
              }}
              id="profile__edit-btn"
              style={{
                backgroundColor: colors.blueAccent[700],
              }}
            >
              EDIT PROFILE
            </button>
            {hiddenEditForm && (
              <EditProfile
                setFetchInfo={setFetchInfo}
                hiddenEditForm={setHiddenEditForm}
                info={info}
              />
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};
export default ShowProfile;
