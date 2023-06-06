import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Contacts from "./scenes/contacts";
// import SchedulerEmp from "./scenes/ScheduleEmp/ScheduleEmp";
// import SchedulerEmp from "./scenes/employeeScheduler/EmployeeScheduler";
import SchedulerEmp from "./scenes/employeeScheduler/EmployeeScheduler";
// import CalendarAdmin from "./scenes/admin";
import CalendarAdmin from "./scenes/adminScheduler/AdminScheduler";
import Team from "./scenes/team/";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ShowProfile from "./scenes/global/ChangeProfileInfor/ShowProfile";
import Login from "./scenes/Login/Login";
import TokenChecker from "./scenes/Login/TokenChecker";
import Mana from "./scenes/mana";

export default function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setFetchInfo] = useState(false);
  const [image, setImage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setIsLoading(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      isLoading && (
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
          <TokenChecker />
          <Sidebar
            isSidebar={isSidebar}
            info={info}
            setFetchInfo={setFetchInfo}
            image={image}
            setImage={setImage}
          />
          {console.log(info)}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<SchedulerEmp />} />
              {/* thêm admin scheduler ver2 */}
              <Route path="/Calendar_admin" element={<Mana />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route
                path="/profile"
                element={
                  <ShowProfile
                    info={info}
                    setFetchInfo={setFetchInfo}
                    image={image}
                    setImage={setImage}
                  />
                }
              />
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
