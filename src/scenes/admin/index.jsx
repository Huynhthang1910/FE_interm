import React, { useState, useEffect } from 'react';
import axios from "axios";

import Scheduler, { Resource, View, Scrolling } from 'devextreme-react/scheduler';

import {
  resources,
  data,
  generateAppointments,
  priorityData
} from '../../data/data';



const currentDate = new Date();

const groups = ['TruSo'];



// const appointments = generateAppointments(startDay, endDay, startDayHour, endDayHour);

function SchedulerAdmin() {
  // lấy ra thông tin trụ sở
  const [headquarterNames, setHeadquarterNames] = useState([])
  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    axios
        .get("https://be-intern.onrender.com/api/v2/headquarter/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response)=>{
          const headquarterNames = response.data.data.map((headquarter)=>({
            id: headquarter.headquarterName,
            text: headquarter.headquarterName
          }));
          setHeadquarterNames(headquarterNames);
          console.log(headquarterNames);
        })
        .catch((error) => {
          console.log(error);
      });
  },[])




  const [tasksAll,setTasksAll] = useState([])
  const [employeeNames, setEmployeeNames] = useState([])
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // const token = localStorage.getItem('token');
    axios
        .get("https://be-intern.onrender.com/api/v2/workschedule/all-information/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response.data.data);
            const employeeNames = response.data.data.map((attendee) =>({
              id: attendee.attendees,
              text : attendee.attendees
            }))
            setEmployeeNames(employeeNames)
            const tasksAll = response.data.data.map((task) => ({
                id: task.workScheduleId,
                text: task.workSchedulePlace,
                startDate: task.workScheduleTimeIn,
                endDate: task.workScheduleTimeOut,
                description: task.workSchedulePlan,
                TruSo: task.headquarterName,
                attendees: task.employeeName,
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
    <div className='Scheduler'>
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
        showAllDayPanel={true}>
        <View
          name="Vertical Grouping"
          type="workWeek"
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
      </Scheduler>
    </div>
  );
}

export default SchedulerAdmin;
