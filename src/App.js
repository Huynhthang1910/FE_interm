import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Contacts from "./scenes/contacts";
import SchedulerEmp from "./scenes/ScheduleEmp/ScheduleEmp";
import CalendarAdmin from "./scenes/admin";
import Team from "./scenes/team/";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./scenes/Login/Login";
import { AuthProvider } from "./Hook/AuthContext";

export default function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayShow, setDisplayShow] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setDisplayShow(false);
    }
    setIsLoading(false);
    setDisplayShow(true);
  }, []);

  if (isLoading) {
    return null; // hoặc hiển thị một trang tải trước
  }

  if (!isLoggedIn) {
    return (
      displayShow && (
        <Login
          onLogin={() => {
            setIsLoggedIn(true);
          }}
        />
      )
    );
  }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<SchedulerEmp />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/profile" element={<ShowProfile />} />
              <Route path="/SchedulerEmp" element={<SchedulerEmp />} />
              <Route path="/Calendar_admin" element={<CalendarAdmin />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
