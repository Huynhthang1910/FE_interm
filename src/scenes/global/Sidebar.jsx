import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ ad, userid, info, setFetchInfo, image, setImage }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(
    window.innerWidth < 768 ? true : false
  );
  const [selected, setSelected] = useState("Schedule Employee");
  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem("token");
  const urlGetAllInfo = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/information`;
  const urlGetavt = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/avatar/${info.employeeId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlGetAllInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const datas = await response.json();
        setFetchInfo(datas.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    const handleResize = () => {
      window.innerWidth < 768 ? setIsCollapsed(true) : <></>;
    };
    window.addEventListener("resize", handleResize); // Thêm trình nghe sự kiện
    return () => {
      window.removeEventListener("resize", handleResize); // Gỡ bỏ trình nghe sự kiện khi component bị hủy
    };
  }, [token]);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (info) {
        try {
          const response = await fetch(urlGetavt, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          const data = await response.arrayBuffer();
          const imgSrc =
            data.byteLength === 0
              ? "../../../../assets/avatar_placeholder.png"
              : URL.createObjectURL(new Blob([data], { type: "image/jpeg" }));
          console.log(imgSrc);
          console.log("Success FETCH: ", imgSrc);
          setImage(imgSrc);
        } catch (error) {
          console.error("Error FETCH: ", error);
        }
      }
    };
    fetchAvatar();
    return () => {
      URL.revokeObjectURL(image);
    };
  }, [token, info]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            id="icon-hamberger"
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {info.accountRole}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <div
                  style={{
                    width: "150px",
                    background: "#fff",
                    borderRadius: "5%",
                  }}
                >
                  <img
                    alt="profile-user"
                    width="100%"
                    src={image}
                    style={{
                      cursor: "pointer",
                      borderRadius: "15%",
                      aspectRatio: "1",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  style={{ wordWrap: "break-word" }}
                >
                  {info.employeeName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user.employeePosition}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography> */}

            {/* <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography> */}
            {info.accountRole === "Manager" ? (
              <>
                <Item
                  title="Headquarters"
                  to="/team"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Employees"
                  to="/contacts"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Schedule Manager"
                  to="/Calendar_admin"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              <></>
            )}

            <Item
              title="Schedule Employee"
              to="/SchedulerEmp"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
