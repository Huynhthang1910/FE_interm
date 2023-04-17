import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";

import DeleteButtonhead from "./DeleteButtonhead";
import CreateHeadquater from "../AddHeaquater/CreateHeadquater";

const Team = () => {
  const [showComponent, setShowComponent] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = sessionStorage.getItem("token");
  const [headqs, setHeadqs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://be-intern.onrender.com/api/v2/headquarter/",
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
      setHeadqs(dataWithIds);
    };
    fetchData();
  }, [token]);
  const resetHeadId = (heads) => {
    return heads.map((head, index) => {
      return {
        ...head,
        id: index + 1,
      };
    });
  };

  const onClickAdd = () => {
    // Gọi MyComponent khi nút được nhấn
    setShowComponent(!showComponent);
  };

  const handleSearch1 = (id) => {
    setHeadqs((prevUsers) => {
      const filteredUsers = prevUsers.filter(
        (item) => item.headquarterId !== id
      );
      return resetHeadId(filteredUsers);
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "headquarterId",
      headerName: "Headquarter Id",
      flex: 1,
      cellClassName: "name-column--cell",
      width: 400,
    },
    {
      field: "headquarterName",
      headerName: "Headquarter Name",
      headerAlign: "left",
      align: "left",
      width: 400,
    },
    {
      field: "headquarterAddress",
      headerName: "Headquarter Address",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <DeleteButtonhead
            api={params.row.headquarterId}
            resetView={handleSearch1}
          />
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-success me-md-2 me-lg-4"
          type="button"
          onClick={onClickAdd}
        >
          Add Headquarter
        </button>
      </div>
      {showComponent && <CreateHeadquater onClickAdd={onClickAdd} />}

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
        }}
      >
        <DataGrid checkboxSelection rows={headqs} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
