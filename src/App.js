import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Contacts from "./scenes/contacts";
// import SchedulerEmp from "./scenes/ScheduleEmp/ScheduleEmp";
// import SchedulerEmp from "./scenes/employeeScheduler/EmployeeScheduler";
import SchedulerEmp from "./scenes/employeeScheduler/demo";
// import CalendarAdmin from "./scenes/admin";
import CalendarAdmin from "./scenes/adminScheduler/AdminScheduler";
import Team from "./scenes/team/";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ShowProfile from "./scenes/global/ChangeProfileInfor/ShowProfile";
import Login from "./scenes/Login/Login";

export default function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // hoặc hiển thị một trang tải trước
  }

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => {
          setIsLoggedIn(true);
        }}
      />
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
              {/* thêm admin scheduler ver2 */}
              <Route path="/Calendar_admin" element={<CalendarAdmin />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/profile" element={<ShowProfile />} />
              <Route path="/SchedulerEmp" element={<SchedulerEmp />} />
              {/* <Route path="/Calendar_admin" element={<CalendarAdmin />} /> */}
              <Route path="/team" element={<Team />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
