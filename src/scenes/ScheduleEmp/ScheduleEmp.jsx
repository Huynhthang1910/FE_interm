import React, { useState, useEffect } from "react";
import axios from "axios";
import Scheduler  from "devextreme-react/scheduler";

function ScheduleEmp() {
    const [tasks, setTasks] = useState([]);
    // giới hạn tạo lịch ở quá khứ
    const views = ["day",'workWeek', "week",  "month"];

    const viewOptions = views.map((view) => ({
      type: view,
      name: view.charAt(0).toUpperCase() + view.slice(1),
      min: new Date()
    }));
    //
    const [allDayPanelMode, setAllDayPanelMode] = useState('allDay');
    // const onChangeAllDayPanelMode = (e) => {
    //     setAllDayPanelMode(e.value);
    //   }
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        // const token = localStorage.getItem('token');
        console.log(token);
        axios
            .get("https://be-intern.onrender.com/api/v2/workschedule/self-schedule", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data.data);
                const tasks = response.data.data.map((task) => ({
                    id: task.workScheduleId,
                    text: task.workSchedulePlace,
                    startDate: task.workScheduleTimeIn,
                    endDate: task.workScheduleTimeOut,
                    allDay: false,
                    description: task.workSchedulePlan,
                    recurrenceRule: null
                }));
                setTasks(tasks);
                console.log(tasks);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleTaskAdded = (e) => {
        const token = sessionStorage.getItem("token");
        // const token = localStorage.getItem('token');
        console.log(e.appointmentData);

        const newTask = {
            workScheduleColor: "green",
            workSchedulePlan: e.appointmentData.description,
            workSchedulePlace: e.appointmentData.text,
            workScheduleTimeIn: e.appointmentData.startDate,
            workScheduleTimeOut: e.appointmentData.endDate
        };
        console.log(newTask);
        axios
            .post(
                "https://be-intern.onrender.com/api/v2/workschedule/store",
                newTask,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })

            .catch((error) => {
                console.log(error);
            });
    };

    const handleTaskUpdated = (e) => {
        const token = sessionStorage.getItem("token");
        // const token = localStorage.getItem('token');
        const updatedTask = {
            workScheduleColor: 'green',
            workSchedulePlace: e.appointmentData.text,
            workSchedulePlan : e.appointmentData.description,
            workScheduleTimeIn: e.appointmentData.startDate,
            workScheduleTimeOut: e.appointmentData.endDate,
        };

        axios
            .put(
                `https://be-intern.onrender.com/api/v2/workschedule/${e.appointmentData.id}/update`,
                updatedTask,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                const updatedTasks = tasks.map((task) => {
                    if (task.workScheduleId === e.appointmentData.id) {
                        return {
                            ...task,
                            text: response.data.title,
                            description: e.appointmentData.description,
                            startDate: e.appointmentData.startDate
                        };
                    }
                    return task;
                });
                setTasks(updatedTasks);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleTaskDeleted = (e) => {
        const token = sessionStorage.getItem("token");
        // const token = localStorage.getItem('token');
        console.log(token);
        axios
            .delete(
                `https://be-intern.onrender.com/api/v2/workschedule/${e.appointmentData.id}/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                const filteredTasks = tasks.filter(
                    (task) => task.id !== e.appointmentData.id
                );
                setTasks(filteredTasks);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="Scheduler">
            <Scheduler
                timeZone="Asia/Ho_Chi_Minh"
                dataSource={tasks}
                defaultCurrentView="week"
                startDayHour={9}
                endDayHour={18}
                recurrenceEditMode="none"
                views={viewOptions}

                // views={["day",'workWeek', "week",  "month"]}
                showAllDayPanel={false}
                allDayPanelMode={allDayPanelMode}
                allowAllDayEditing={false}
                height={850}
                adaptivityEnabled={true}
                dateSerializationFormat="yyyy-MM-ddTHH:mm:ss.ssZ"
                onAppointmentAdded={handleTaskAdded}
                onAppointmentUpdated={handleTaskUpdated}
                onAppointmentDeleted={handleTaskDeleted}
                allowEditing={true}
            >
            </Scheduler>
        </div>
    );
}

export default ScheduleEmp;
