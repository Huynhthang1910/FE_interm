import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import UpdateHeadquarter from "./UpdateHeadquarter/UpdateHeadquarter";
import DeleteButtonhead from "./DeleteButtonhead";
import Message from "./UpdateHeadquarter/Message/Message";
import "./Viewheadquarter.scss";

const Viewheadquarter = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = sessionStorage.getItem("token");
  const [headqs, setHeadqs] = useState([]);
  const [update, setUpdate] = useState("");
  const [newData, setNewData] = useState("");
  const [inforHeadquarter, setInforHeadquarter] = useState();
  const handleSetInforHeadquarter = (row) => {
    setInforHeadquarter(row);
  };
  const urlGetHeadquarterName = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/`
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        urlGetHeadquarterName,
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
  }, [token, update]);
  const resetHeadId = (heads) => {
    return heads.map((head, index) => {
      return {
        ...head,
        id: index + 1,
      };
    });
  };

  const handleSearch1 = (id) => {
    setHeadqs((prevUsers) => {
      const filteredUsers = prevUsers.filter(
        (item) => item.headquarterId !== id
      );
      return resetHeadId(filteredUsers);
    });
  };
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
    {
      field: "update",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <>
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                handleSetInforHeadquarter(params.row);
              }}
            >
              CHANGE
            </Button>
          </>
        </>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header title="HEADQUARTERS" />

        <div
          className="d-grid gap-2 d-md-flex justify-content-md-end"
          id="Addbuton"
        >
          <button
            className="btn btn-success me-md-2 me-lg-4"
            type="button"
            onClick={props.onClickAddd}
          >
            Add Headquarter
          </button>
        </div>

        <Box
          m="-32px 0 0 0"
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
          <DataGrid
            rows={headqs}
            columns={columns}
            autoHeight={true}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
      {inforHeadquarter && (
        <UpdateHeadquarter
          inforHeadquarter={inforHeadquarter}
          handleSetInforHeadquarter={handleSetInforHeadquarter}
          getNewData={getNewData}
        />
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

export default Viewheadquarter;
