import React, { useState, useEffect } from "react";
import axios from "axios";
import Scheduler from "devextreme-react/scheduler";

function ScheduleEmp() {
    const token = sessionStorage.getItem("token");
    const views = ["day", 'workWeek', "month"];
    const StringIso = new Date();
    const now = StringIso.toISOString();
    const schedulerOptions = {
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
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/self-schedule`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.data.status !== "OK") {
                    alert("không tải được lịch biểu")
                }
                else {
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
        // const token = localStorage.getItem('token');
        if (event.appointmentData.startDate < now) {
            alert(`không thể thêm lịch ở quá khứ`)
        } else {
            const newTask = {
                workScheduleColor: "green",
                workSchedulePlan: event.appointmentData.description,
                workSchedulePlace: event.appointmentData.text,
                workScheduleTimeIn: event.appointmentData.startDate,
                workScheduleTimeOut: event.appointmentData.endDate
            };
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
                    console.log(response);
                    if (response.data.status !== "OK") {
                        alert("Lịch biểu bạn vừa thêm không thành công ")
                    }
                    else {
                        alert("thêm thành công");
                        window.location.reload();
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
            workSchedulePlan: e.appointmentData.description,
            workScheduleTimeIn: e.appointmentData.startDate,
            workScheduleTimeOut: e.appointmentData.endDate,
        };

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
                console.log(response);
                if (response.data.status !== "OK") {
                    alert("lịch biểu cập nhật không thành công")
                }
                else {
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
                    alert("lịch biểu cập nhật thành công")
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
                `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/${e.appointmentData.id}/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.status !== "OK") {
                    alert("Xoá lịch biểu không thành công ")
                }
                else {
                    const filteredTasks = tasks.filter(
                        (task) => task.id !== e.appointmentData.id
                    );
                    setTasks(filteredTasks);
                    alert("xoá lịch biểu thành công ")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // tao form input moi

    const workingStatus = [
        { id: 1, text: "đi Công Tác" },
        { id: 2, text: "đi Tiếp Khách" },
        { id: 3, text: "Nghỉ Phép" },
        { id: 4, text: "Làm Việc Tại Nhà" },
    ];
    const urlGetHeadquarterName = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/`;
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
                const headquarterNames = response.data.data.map((headquarter, index) => ({
                    id: index,
                    text: headquarter.headquarterName,
                }));
                setHeadquarterNames(headquarterNames);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    // const destinationDataSource = [
    //     { id: 1, text: "Hà Nội" },
    //     { id: 2, text: "Đà Nẵng" },
    //     { id: 3, text: "Hồ Chí Minh" },
    // ];
    const formItems = [
        {
            label: {
                text: "Hiện Trạng Làm Việc",
            },
            editorType: "dxSelectBox",
            dataField: "workingStatus",
            editorOptions: {
                dataSource: workingStatus,
                displayExpr: "text",
                valueExpr: "id",
            },
        },
        {
            label:
            {
                text: "Nơi đến ",
            },
            editorType: "dxSelectBox",
            dataField: "destination",
            editorOptions: {
                dataSource: headquarterNames,
                displayExpr: "text",
                valueExpr: "id",
                visible: false,
            },
        },
        // {
        //     label: {
        //         text: "Mô Tả",
        //         visible: true
        //     },
        //     name: "director",
        //     editorType: "dxTextBox",
        // },
        {
            dataField: "startDate",
            editorType: "dxDateBox",
            editorOptions: {
                width: "100%",
                type: "datetime",
            },
        },
        {
            name: "endDate",
            dataField: "endDate",
            editorType: "dxDateBox",
            editorOptions: {
                width: "100%",
                type: "datetime",
            },
        },
    ];

    const onAppointmentFormOpening = (e) => {
        const { form } = e;
        form.option("items", formItems);
        form.getEditor("workingStatus").option("onValueChanged", function (args) {
            const destinationField = form.getEditor("destination");
            if (destinationField) {
                if (args.value === 1) {
                    destinationField.option("visible", true);

                } else {
                    destinationField.option("visible", false);

                }
            }
        });
    }


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
                onAppointmentFormOpening={onAppointmentFormOpening}
            >
            </Scheduler>
        </div>
    );
}

export default ScheduleEmp;
