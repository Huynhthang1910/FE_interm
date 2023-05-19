import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./index.scss";
import WeekPicker from "./weekpicker";
import Lichbieu from "./lichbieu";
const Mana = () => {
  const [sche, setSche] = useState([]);
  const [scheone, setScheone] = useState([]);
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");
  const [weeekkk, setWeeekkk] = useState([]);

  // const urlAllInforEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/all-information`;
  const urlAllInforEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/self-schedule`;
  const alluser = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/all-information`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlAllInforEmployee, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const datas = await response.json();
        setSche(datas.data);
        console.log(1);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await fetch(alluser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const datas = await response.json();
        setUsers(datas.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Ngày trong tuần hiện tại (0-6)
    const firstDayOfWeek = new Date(currentDate); // Sao chép đối tượng ngày hiện tại
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay + 1); // Đặt ngày thành thứ 2 đầu tiên trong tuần
    const currentWeekdays = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + index);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    });
    setWeeekkk(currentWeekdays);
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(alluser, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const datas = await response.json();
  //       setUsers(datas.data);
  //       console.log(1);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [token]);

  {
    console.log(sche, users);
  }
  return (
    <>
      <WeekPicker weeekkk={weeekkk} setWeeekkk={setWeeekkk} />
      <Table responsive>
        <thead className="Hihi">
          <tr>
            <th>#</th>
            {Array.from({ length: 7 }).map((_, index) => (
              <th key={index}>{weeekkk[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody className="Hihi">
          {users.map((user, rowIndex) => (
            <tr key={rowIndex}>
              <td>{user.employeeName}</td>
              {user.employeePhone &&
                Array.from({ length: 7 }).map((_, columnIndex) => (
                  <td key={columnIndex}>
                    {/* {console.log(
                      sche.filter(
                        (item) =>
                          item.employeeId === user.employeeId &&
                          item.workScheduleTimeIn.split("T")[0] ===
                            weeekkk[columnIndex]
                      )
                    )} */}
                    {
                      <Lichbieu
                        user={user.employeeId}
                        sche={sche}
                        weeekkk={weeekkk}
                        columnIndex={columnIndex}
                      />
                    }
                    {/* 
                    {user.employeeId}
                    <br></br>
                    {weeekkk[columnIndex]} */}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Mana;
