import React, { useState, useEffect } from "react";
import axios from "axios";
import Scheduler  from "devextreme-react/scheduler";
import MessegeEmp from "./MessegeEmp"

function ScheduleEmp() {
    // giới hạn tạo lịch ở quá khứ
    const views = ["day",'workWeek', "week",  "month"];
    const StringIso = new Date();
    const now = StringIso.toISOString();
    const [message,setMassage] = useState();
    const [messageTitle, setMassageTitle] = useState();
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
        setMassage("fail")
        setMassageTitle("Không thể thêm sự kiện trong quá khứ.");
        }
    },
    onAppointmentUpdating: (e) => {
        if (e.newData.startDate < now) {
        // Ngăn chặn việc chỉnh sửa sự kiện trong quá khứ
        e.cancel = true;
        setMassage("fail")
        setMassageTitle("Không thể chỉnh sửa sự kiện trong quá khứ.");
        }

    },

};
const [tasks, setTasks] = useState([]);
useEffect(() => {
        const token = sessionStorage.getItem("token");
        // const token = localStorage.getItem('token');
        axios
            .get(`${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/self-schedule`, {
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

    const handleTaskAdded = (event) => {
        const token = sessionStorage.getItem("token");
        // const token = localStorage.getItem('token');
        if (event.appointmentData.startDate < now){
            setMassage("fail")
            setMassageTitle("không thể thêm lịch ở quá khứ");           
        }else{
            const newTask = {
                workScheduleColor: "green",
                workSchedulePlan: event.appointmentData.description,
                workSchedulePlace: event.appointmentData.text,
                workScheduleTimeIn: event.appointmentData.startDate,
                workScheduleTimeOut: event.appointmentData.endDate
            };
            setMassage("wait")
            setMassageTitle("Please wait a few seconds...")
            axios
                .post(
                    `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/store`,
                    newTask,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    // console.log(response);
                    if (response.data.status!=="OK") {
                        setMassage("fail")
                        setMassageTitle("Update fail! Please check again!"); 
                    }
                    else{
                        setMassage("success")
                        setMassageTitle("Success! Continue your work...")
                        setTimeout(window.location.reload(), 2000)
                        //

                        // console.log(newTask); // kiểm tra thuộc tính "id" của task mới
                        // event.preventDefault();
                        // setTasks(prevState => [...prevState, newTask]);
                        // alert("thêm thành công")
                        // setTasks([...tasks, newTask]);
                        // console.log(tasks);
                        // setTasks(prevTasks => prevTasks.map(task => task.id === newTask.id ? newTask : task));
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
        setMassage("wait")
        setMassageTitle("Please wait a few seconds...")
        axios
            .put(
                `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/${e.appointmentData.id}/update`,
                updatedTask,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                // console.log(response);
                if(response.data.status!=="OK"){
                    setMassage("fail")
                    setMassageTitle("Update fail! Please check again!");
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
                    setMassage("success")
                    setMassageTitle("Success! Continue your work...")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleTaskDeleted = (e) => {
        const token = sessionStorage.getItem("token");
        // const token = localStorage.getItem('token');
        // console.log(token);
        setMassage("wait")
        setMassageTitle("Please wait a few seconds...")
        axios
            .delete(
                `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/${e.appointmentData.id}/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                if(response.data.status!=="OK"){
                    setMassage("fail")
                    setMassageTitle("Update fail! Please check again!");
                }
                else{
                    const filteredTasks = tasks.filter(
                        (task) => task.id !== e.appointmentData.id
                    );
                    setTasks(filteredTasks);
                    setMassage("success")
                    setMassageTitle("Success! Continue your work...")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    console.log("tao đùa không vuiiii =>>>>>>>>>>>>>>>")
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
            <MessegeEmp
                message = {message}
                messageTitle = {messageTitle}
            />
        </div>
    );
}

export default ScheduleEmp;
