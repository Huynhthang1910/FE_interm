import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import UpdateInfor from "./UpdateInfor/UpdateInfor";
import Message from "./UpdateInfor/Message/Message.jsx";
import "./Viewusers.scss";

const Viewuser = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");
  const [InforUser, setInforUser] = useState("");
  const [newData, setNewData] = useState("");
  const [update, setUpdate] = useState("");
  const urlAllInforEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/all-information`
  const handleSetInforUser = (row) => {
    setInforUser(row);
  };
  /*code của long*/
  const getNewData = (infor) => {
    setNewData(infor)
    // console.log("check data>>>",newData)
  }
  const unMess = (data) => {
    setNewData(data)
  }
  const updTable = (data) => {
    setUpdate(data)
  }
  /*-------------------------*/
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(urlAllInforEmployee, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token as a bearer token
        },
      });
      const datas = await response.json();
      //   const dataWithIds = datas.map((row, index) => ({ ...row, id: index + 1 }));
      const dataWithIds = datas.data.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
      setUsers(dataWithIds);
    };
    console.log(update)
    fetchData();
  }, [token, update]);
  const resetUserId = (heads) => {
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
      width: 100,
      renderCell: (params) => (
        <>
          <DeleteButton api={params.row.employeeId} resetView={handleSearch1} />
        </>
      ),
    },
    {
      field: "update",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
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
            className="btn btn-success ms-auto ms-sm-auto me-md-2 me-lg-2"
            type="button"
            onClick={props.onClickAddd}
          >
            Add User
          </button>
        </div>
        <>
          <Box
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
          getNewData={getNewData}
        ></UpdateInfor>
      )}
      {newData && (
        <Message
        data={newData}
        unMess={unMess}
        updTable={updTable}
        update={update}
        />
      )}
    </>
  );
};

export default Viewuser;
