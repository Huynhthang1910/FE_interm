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
import { Link } from "react-router-dom";

import NavAccount from "./NavAccount";
import ChangePassword from "./ChangePassword/ChangePassword";
import { useEffect, useRef } from "react";
// import ShowProfile from "./ChangeProfileInfor/ShowProfile";

const Topbar = () => {
  const navRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [stateNav, setNav] = useState(false);
  const [statePassForm, setForm] = useState(false);
  const changeStateNav = () => {
    setNav(!stateNav);
  };

  useEffect(() => {
    // Add event listener to listen for clicks outside the component
    const handleOutsideClick = (event) => {
        if (
            navRef.current &&
            !navRef.current.contains(event.target)
        ) {
            setNav(false);
        }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    const handleScroll = () => {
        setNav(false);
    };
    document.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        window.removeEventListener("scroll", handleScroll);
        navRef.current.removeEventListener("scroll", handleScroll);
      };
}, [stateNav]);

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
        </IconButton>
      <NavAccount
        navRef={navRef}
        stateNav={stateNav}
        changeStatePassForm={changeStatePassForm}
      />
      <ChangePassword
        statePw={statePassForm}
        changeStatePassForm={changeStatePassForm}
        changeStateNav={changeStateNav}
      />
      </Box>
    </Box>
  );
};

export default Topbar;