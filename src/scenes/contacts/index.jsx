import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
<<<<<<< HEAD
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
=======
import { mockBarData, mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";


>>>>>>> origin/minhnha

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
<<<<<<< HEAD

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
=======
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://be-intern.onrender.com/api/v1/employee/all-information"
      );
      const datas = await response.json();
      const dataWithIds = datas.data.map((row, index) => ({ ...row, id: index + 1 }));
      setUsers(dataWithIds);
      
    };
    fetchData();
  }, []);
  


  const columns = [
    { field: "id", headerName: "No", flex: 0.5 },
    { field: "employeeId", headerName: "Employee Id" },
    {
      field: "employeeName",
>>>>>>> origin/minhnha
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
<<<<<<< HEAD
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
=======
      field: "employeePhone",
>>>>>>> origin/minhnha
      headerName: "Phone Number",
      flex: 1,
    },
    {
<<<<<<< HEAD
      field: "email",
=======
      field: "accountEmail",
>>>>>>> origin/minhnha
      headerName: "Email",
      flex: 1,
    },
    {
<<<<<<< HEAD
      field: "address",
=======
      field: "employeeAddress",
>>>>>>> origin/minhnha
      headerName: "Address",
      flex: 1,
    },
    {
<<<<<<< HEAD
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
=======
      field: "employeePosition",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "headquarterName",
      headerName: "Location",
>>>>>>> origin/minhnha
      flex: 1,
    },
  ];

  return (
<<<<<<< HEAD
=======
    
>>>>>>> origin/minhnha
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
<<<<<<< HEAD
        <DataGrid
          rows={mockDataContacts}
=======
        {console.log(users)}
        {console.log(mockDataContacts)}
        
        <DataGrid
        
          rows={users}
>>>>>>> origin/minhnha
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
<<<<<<< HEAD
=======


>>>>>>> origin/minhnha
