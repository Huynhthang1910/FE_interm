import { Box, IconButton, useTheme } from "@mui/material";

import { useContext, useState } from "react";

import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import NavAccount from "./NavAccount";
import UpdateInfor from "../UpdateInfor/UpdateInfor";
import ChangePassword from "./ChangePassword/ChangePassword";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [stateNav, setNav] = useState(false);
  const [statePassForm, setForm] = useState(false);
  const changeStateNav = () => {
    setNav(!stateNav);
  };
  const changeStatePassForm = () => {
    setForm(!statePassForm);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => changeStateNav()}>
          <PersonOutlinedIcon />
          <NavAccount
            stateNav={stateNav}
            changeStatePassForm={changeStatePassForm}
          />
        </IconButton>
      </Box>
      <ChangePassword
            statePw={statePassForm}
            changeStatePassForm={changeStatePassForm}
            changeStateNav={changeStateNav}
          />
      <UpdateInfor/>
    </Box>
  );
};

export default Topbar;
