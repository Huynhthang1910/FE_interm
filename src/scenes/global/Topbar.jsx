import { Box, IconButton, useTheme } from "@mui/material";

import { useContext, useState } from "react";

import { ColorModeContext, tokens } from "../../theme";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import NavAccount from "./NavAccount";
import ChangePassword from "./ChangePassword/ChangePassword";
// import ShowProfile from "./ChangeProfileInfor/ShowProfile";

const Topbar = () => {
  const navRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [stateNav, setNav] = useState(false);
  const [statePassForm, setForm] = useState(false);
  const [mess, setMess] = useState();
  const controlSetMess = (data) => {
    setMess(data)
    setTimeout(() => {
      sessionStorage.removeItem("token");
      window.location.reload();
    },3000)
  } 
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
        controlSetMess={controlSetMess}
      />
      {(mess === "wait") && (
        <div className="message loading">
          <div className="message_loading">
            <div className="message_loading_icon">i</div>
          </div>
          <span className="message_title">
            Please wait a few seconds...
          </span>
        </div>
      )}
      {(mess === "success") && (
        <div className="message success">
        <div className="message_success">
            <span class="checkmark">
                <div class="checkmark_circle"></div>
                <div class="checkmark_stem"></div>
                <div class="checkmark_kick"></div>
            </span>
        </div>
        <span className="message_title">
            Success! Auto reload in 3 seconds...
        </span>
    </div>
      )}
      </Box>
    </Box>
  );
};

export default Topbar;