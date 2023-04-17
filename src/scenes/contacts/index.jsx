import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import CreateAccount from "../AddUser/CreateAccount";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");
  const [showComponent, setShowComponent] = useState(false);

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
  const resetUserId = (users) => {
    return users.map((user, index) => {
      return {
        ...user,
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
  const onClickAdd = () => {
    // Gọi MyComponent khi nút được nhấn
    setShowComponent(!showComponent);
  };

  const columns = [
    { field: "id", headerName: "No", flex: 0.5 },
    { field: "employeeId", headerName: "Employee Id" },
    {
      field: "employeeName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "employeePhone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "accountEmail",
      headerName: "Email",
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
      field: "headquarterName",
      headerName: "Location",
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
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-success me-md-2 me-lg-4"
          type="button"
          onClick={onClickAdd}
        >
          Add User
        </button>
      </div>
      {showComponent && <CreateAccount onClickAdd={onClickAdd} />}

      <Box
        className={showComponent ? "ds_none" : null}
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
        {console.log(users)}
        {console.log(mockDataContacts)}

        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
