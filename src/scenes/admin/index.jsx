import React, { useState, useEffect } from "react";
import axios from "axios";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import "devextreme/dist/css/dx.light.css";
const currentDate = new Date();
const groups = ["TruSo"];
function SchedulerAdmin() {
  const onAppointmentFormOpening = (e) => {
    e.form.itemOption("startDate", "readOnly", true);
    e.form.itemOption("endDate", "readOnly", true);
    e.form.itemOption("text", "readOnly", true);
  };
  const urlGetHeadquarterName = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/`
  const urlGetAllInforSchedule = `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/all-information/`
  // lấy ra thông tin trụ sở
  const [headquarterNames, setHeadquarterNames] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(urlGetHeadquarterName, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const headquarterNames = response.data.data.map((headquarter) => ({
          id: headquarter.headquarterName,
          text: headquarter.headquarterName,
        }));
        setHeadquarterNames(headquarterNames);
        console.log(headquarterNames);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [tasksAll, setTasksAll] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // const token = localStorage.getItem('token');
    axios
      .get(
        urlGetAllInforSchedule,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        const employeeNames = response.data.data.map((attendee) => ({
          id: attendee.employeeName,
          text: attendee.employeeName,
          color: attendee.workScheduleColor,
        }));
        setEmployeeNames(employeeNames);
        console.log(employeeNames);
        const tasksAll = response.data.data.map((task) => ({
          id: task.workScheduleId,
          text: task.workSchedulePlace,
          startDate: task.workScheduleTimeIn,
          endDate: task.workScheduleTimeOut,
          description: task.workSchedulePlan,
          TruSo: task.headquarterName,
          NhanVien: task.employeeName,
          allDay: false,
          recurrenceRule: null,
        }));

        setTasksAll(tasksAll);
        console.log(tasksAll);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="Scheduler-admin">
      <Scheduler
        timeZone="Asia/Ho_Chi_Minh"
        dataSource={tasksAll}
        groups={groups}
        defaultCurrentView="Vertical Grouping"
        defaultCurrentDate={currentDate}
        startDayHour={9}
        endDayHour={18}
        dateSerializationFormat="yyyy-MM-ddTHH:mm:ss.ssZ"
        crossScrollingEnabled={true}
        onAppointmentUpdated={false}
        adaptivityEnabled={true}
        onAppointmentFormOpening={onAppointmentFormOpening}
        editing={false}
      >
        <View
          name="Vertical Grouping"
          type="workWeek"
          groupOrientation="vertical"
          cellDuration={30}
          intervalCount={1}
        />
        <View
          name="Month"
          type="month"
          groupOrientation="vertical"
          cellDuration={30}
          intervalCount={1}
        />
        {/* <View
          name="Horizontal Grouping"
          type="workWeek"
          cellDuration={30}
          intervalCount={2}
        /> */}
        <Resource
          fieldExpr="TruSo"
          allowMultiple={false}
          dataSource={headquarterNames}
          label="Trụ sở"
        />
        <Resource
          fieldExpr="NhanVien"
          allowMultiple={false}
          dataSource={employeeNames}
          label="Nhân viên "
          useColorAsDefault={true}
        />
      </Scheduler>
    </div>
  );
}

export default SchedulerAdmin;
