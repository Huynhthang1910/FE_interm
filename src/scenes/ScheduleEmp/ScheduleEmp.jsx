import React, { useState, useEffect } from "react";
import axios from "axios";
import Scheduler  from "devextreme-react/scheduler";

function ScheduleEmp() {
    // chỉnh sửa label trong popup

    const [tasks, setTasks] = useState([]);
    // giới hạn tạo lịch ở quá khứ
    const views = ["day",'workWeek', "week",  "month"];
    const StringIso = new Date();
    const now = StringIso.toISOString();
    const schedulerOptions = {
        // ...
        editing: {
            allowAdding: true, // Không cho phép thêm mới sự kiện
            allowUpdating: true, // Không cho phép chỉnh sửa sự kiện
        },
    onAppointmentAdding: (e) => {
        if (e.appointmentData.startDate < now) {
        // Ngăn chặn việc thêm sự kiện trong quá khứ
        e.cancel = true;
        alert('Không thể thêm sự kiện trong quá khứ.');
        }
    },
    onAppointmentUpdating: (e) => {
        if (e.newData.startDate < now) {
        // Ngăn chặn việc chỉnh sửa sự kiện trong quá khứ
        e.cancel = true;
        alert('Không thể chỉnh sửa sự kiện trong quá khứ.');
        }

    },

};

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
                if(response.data.status!=="OK"){
                    alert("không tải được lịch biểu")
                }
                else{
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
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleTaskAdded = (e) => {
        const token = sessionStorage.getItem("token");
        // const token = localStorage.getItem('token');
        if (e.appointmentData.startDate < now){
            alert(`không thể thêm lịch ở quá khứ`)
        }else{
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
                    if (response.data.status!=="OK") {
                        alert("Lịch biểu bạn vừa thêm không thành công ")
                    }
                    else{
                        alert("thêm thành công ")
                    }
                })

                .catch((error) => {
                    console.log(error);
                });
        }
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
                if(response.data.status!=="OK"){
                    alert("lịch biểu cập nhật không thành công")
                }
                else{
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
                }
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
                defaultCurrentView="workWeek"
                startDayHour={9}
                endDayHour={18}
                recurrenceEditMode="none"
                views={views}
                showAllDayPanel={true}
                allowAllDayEditing={false}
                height={620}
                adaptivityEnabled={true}
                dateSerializationFormat="yyyy-MM-ddTHH:mm:ss.ssZ"
                onAppointmentAdded={handleTaskAdded}
                onAppointmentUpdated={handleTaskUpdated}
                onAppointmentDeleted={handleTaskDeleted}
                {...schedulerOptions}
            >
            </Scheduler>
        </div>
    );
}

export default ScheduleEmp;
