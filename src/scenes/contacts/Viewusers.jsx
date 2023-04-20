import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import UpdateInfor from "./UpdateInfor/UpdateInfor";
import "./Viewusers.scss";

const Viewuser = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");
  const [InforUser, setInforUser] = useState("");

  const handleSetInforUser = (row) => {
    setInforUser(row);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://be-intern.onrender.com/api/v2/employee/all-information",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token as a bearer token
          },
        }
      );
      const datas = await response.json();
      //   const dataWithIds = datas.map((row, index) => ({ ...row, id: index + 1 }));
      const dataWithIds = datas.data.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setUsers(dataWithIds);
    };
    fetchData();
  }, [token]);
  const resetUserId = (heads) => {
    // console.log("show nè>>>>",users);
    return heads.map((head, index) => {
      return {
        ...head,
        id: index + 1,
      };
    });
  };

  const handleSearch1 = (id) => {
    setUsers((prevUsers) => {
      const filteredUsers = prevUsers.filter((item) => item.employeeId !== id);
      return resetUserId(filteredUsers);
    });
  };

  const show = () => {
    window.location.reload();
    // let id = newInfor.employeeId;
    // console.log("infor mới nè>>>>",newInfor)
    // setUsers((prevUsers) => {
    //   const resetUsers = prevUsers.filter((item) => item.employeeId !== id);
    //   return ({...resetUsers,[Object.keys(users).pop()+1]:newInfor});
    // });
    // resetUserId(users);
  };

  const columns = [
    { field: "id", headerName: "No", flex: 0.5 },
    {
      field: "employeeId",
      headerName: "Employee Id",
      cellClassName: "name-column--cell",
    },
    {
      field: "employeeName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "employeePhone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "accountEmail",
      headerName: "Email",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "employeeAddress",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "employeePosition",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <DeleteButton api={params.row.employeeId} resetView={handleSearch1} />
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              handleSetInforUser(params.row);
            }}
          >
            CHANGE
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header title="EMPLOYEES" />
        <div
          className="d-grid gap-2 d-md-flex justify-content-md-end"
          id="Addbuton"
        >
          <button
            className="btn btn-success me-md-2 me-lg-4"
            type="button"
            onClick={props.onClickAddd}
          >
            Add User
          </button>
        </div>
        <>
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            {/* {console.log(users)} */}
            <DataGrid
              rows={users}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </>
      </Box>
      {InforUser && (
        <UpdateInfor
          InforUser={InforUser}
          handleSetInforUser={handleSetInforUser}
          show={show}
        ></UpdateInfor>
      )}
    </>
  );
};

export default Viewuser;
