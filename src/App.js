import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";

import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import ScheduleEmp from "./scenes/ScheduleEmp/ScheduleEmp";
import Geography from "./scenes/geography";
import CalendarAdmin from "./scenes/admin";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./scenes/Login/Login";

export default function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isID, setIsID] = useState(null);

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(role, employeeId) => {
          const isRole = role !== "Manager";
          setIsLoggedIn(true);
          setIsAdmin(!isRole); // cập nhật giá trị isAdmin
          setIsID(employeeId); // cập nhật giá trị isID
        }}
      />
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} ad={isAdmin} userid={isID} />
          {console.log(isAdmin, isID)}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<ScheduleEmp />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/ScheduleEmp" element={<ScheduleEmp />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/Calendar_admin" element={<CalendarAdmin />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
