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
  const [tasksAll,setTasksAll] = useState([])
  const [headquarterName, setHeadquarterName] = useState([])

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // const token = localStorage.getItem('token');
    axios
        .get("https://be-intern.onrender.com/api/v2/workschedule/all-information", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response.data.data);
            // thêm headquarterName vào nheee
            const tasksAll = response.data.data.map((task) => ({
                id: task.workScheduleId,
                text: task.workSchedulePlace,
                startDate: task.workScheduleTime,
                endDate: task.workScheduleTime + 1,
                allDay: false,
                description: task.workSchedulePlan,
                recurrenceRule: null
            }));

            setTasksAll(tasksAll);
            console.log(tasksAll);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);
  return (
    <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={tasksAll}
        groups={groups}
        defaultCurrentView="Vertical Grouping"
        defaultCurrentDate={currentDate}
        startDayHour={9}
        endDayHour={18}
        dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
        crossScrollingEnabled={true}
        showAllDayPanel={true}>
        <View
          name="Vertical Grouping"
          type="workWeek"
          groupOrientation="vertical"
          cellDuration={60}
          intervalCount={2}
        />
        <View
          name="Horizontal Grouping"
          type="workWeek"
          cellDuration={30}
          intervalCount={2}
        />
        <Resource
          fieldExpr="TruSo"
          allowMultiple={false}
          dataSource={priorityData}
          label="Priority"
        />
      </Scheduler>
  );
}

export default SchedulerAdmin;
