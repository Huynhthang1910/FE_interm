import { useState, useEffect } from 'react';
import { Scheduler, Resource, View } from 'devextreme-react/scheduler';
import { Popup } from 'devextreme-react/popup';
import { Form } from 'devextreme-react/form';
import axios from 'axios';

function SchedulerEmployee() {
    const StringIso = new Date();
    StringIso.setMinutes(StringIso.getMinutes() + 30);
    const now = StringIso.toISOString();
    // lay token
    const token = sessionStorage.getItem("token");
    // lay du lieu va vap nhat du lieu lich bieu
    const [schedulerDataSource, setSchedulerDataSource] = useState([]);
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
                    const schedulerDataSources = response.data.data.map((schedulerDataSource) => ({
                        id: schedulerDataSource.workScheduleId,
                        text: schedulerDataSource.workSchedulePlan,
                        startDate: schedulerDataSource.workScheduleTimeIn,
                        endDate: schedulerDataSource.workScheduleTimeOut,
                        destination: schedulerDataSource.workScheduleDestination,
                    }));
                    setSchedulerDataSource(schedulerDataSources);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(schedulerDataSource);
    // lây thông tin các trụ sở để đi công tác
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
    // console.log(headquarterNames);
    // tạo forrm custom lấy thông tin lịch biểu
    const workingStatus = [
        { id: 1, text: "đi Công Tác" },
        { id: 2, text: "đi Tiếp Khách" },
        { id: 3, text: "Nghỉ Phép" },
        { id: 4, text: "Làm Việc Tại Nhà" },
    ];
    const formItems = [
        {
            label: {
                text: "Hiện Trạng Làm Việc",
            },
            editorType: "dxSelectBox",
            dataField: "text",
            editorOptions: {
                dataSource: workingStatus,
                // value: "đi Công Tác",
                displayExpr: "text",
                valueExpr: "text",

            },
            colSpan: 2
        },
        {
            name: "departure",
            label:
            {
                text: "Nơi đi ",
                // visible: false,
            },
            editorType: "dxSelectBox",
            dataField: "departure",

            editorOptions: {
                dataSource: headquarterNames,
                displayExpr: "text",
                valueExpr: "text",
            },
        },
        {
            name: "destination",
            label:
            {
                text: "Nơi đến ",

            },
            // visible: false,
            editorType: "dxSelectBox",
            dataField: "destination",
            editorOptions: {
                dataSource: headquarterNames,
                displayExpr: "text",
                valueExpr: "text",
            },
        },
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
        const { form, appointmentData } = e;
        // ngăn việc thêm lịch biểu trong quá khứ
        if (e.appointmentData.startDate < now) {
            form.option("readOnly", true);
        }
        form.option("items", formItems);
        form.getEditor("text").option("onValueChanged", function (args) {

            const destinationField = form.getEditor("destination");
            const departureField = form.getEditor("departure");
            if (args.value !== "đi Công Tác") {
                form.itemOption("departure", {
                    visible: false,
                });
                form.itemOption("departure", "label", {
                    visible: false,
                });
                // destinationField.option("visible", true);
                // departureField.option("visible", true);

            } else {
                form.itemOption("departure", {
                    visible: true,
                });
                form.itemOption("departure", "label", {
                    visible: true,
                });

                // destinationField.option("visible", false);
                // departureField.option("visible", false);


            }
        });
    }

    const handleTaskAdded = (event) => {
        console.log(event.appointmentData.startDate, now);
        // const token = localStorage.getItem('token');
        if (now >= event.appointmentData.startDate) {
            event.cancel = true;
            alert('Không thể thêm sự kiện trong quá khứ.');
        } else {
            const newTask = {
                workScheduleColor: "green",
                workSchedulePlan: event.appointmentData.text,
                workSchedulePlace: event.appointmentData.departure,
                workScheduleDeparture: event.appointmentData.departure,
                workScheduleDestination: event.appointmentData.destination,
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
                        console.log(response);
                        if (!schedulerDataSource.some(a => a.workScheduleId === response.data.data.workScheduleId)) {
                            // Thêm lịch mới vào danh sách các lịch biểu hiện tại
                            const schedulerDataSources = response.data.data.map((schedulerDataSource) => ({
                                id: schedulerDataSource.workScheduleId,
                                text: schedulerDataSource.workSchedulePlan,
                                startDate: schedulerDataSource.workScheduleTimeIn,
                                endDate: schedulerDataSource.workScheduleTimeOut,
                                destination: schedulerDataSource.workScheduleDestination,
                                departure: schedulerDataSource.workScheduleDeparture
                            }));
                            setSchedulerDataSource(schedulerDataSource => [...schedulerDataSource, schedulerDataSources]);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleTaskUpdated = (e) => {
        const updatedTask = {
            workScheduleColor: 'green',
            workScheduleDestination: e.appointmentData.destination,
            workScheduleDeparture: e.appointmentData.departure,
            workSchedulePlan: e.appointmentData.text,
            workScheduleTimeIn: e.appointmentData.startDate,
            workScheduleTimeOut: e.appointmentData.endDate,
            workSchedulePlace: e.appointmentData.destination
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
                console.log(e.appointmentData);
                if (response.data.status !== "OK") {
                    alert("lịch biểu cập nhật không thành công")
                }
                else {
                    const updatedTasks = schedulerDataSource.map((task) => {
                        if (task.workScheduleId === e.appointmentData.id) {
                            return {
                                ...task,
                                text: e.appointmentData.text,
                                destination: e.appointmentData.destination,
                                departure: e.appointmentData.departure,
                                startDate: e.appointmentData.startDate,
                                endDate: e.appointmentData.endDate
                            };
                        }
                        return task;
                    });
                    setSchedulerDataSource(updatedTasks);
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
                    const filteredTasks = schedulerDataSource.filter(
                        (task) => task.id !== e.appointmentData.id
                    );
                    setSchedulerDataSource(filteredTasks);
                    alert("xoá lịch biểu thành công ")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
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
        }
    }
    return (
        <div className="Scheduler">
            <Scheduler
                timeZone="Asia/Ho_Chi_Minh"
                views={["day", 'workWeek', "month"]}
                defaultCurrentView='workWeek'
                dataSource={schedulerDataSource}
                startDayHour={9}
                endDayHour={18}
                dateSerializationFormat="yyyy-MM-ddTHH:mm:ss.ssZ"
                {...schedulerOptions}
                onAppointmentFormOpening={onAppointmentFormOpening}
                onAppointmentAdded={handleTaskAdded}
                onAppointmentUpdated={handleTaskUpdated}
                onAppointmentDeleted={handleTaskDeleted}
            >
            </Scheduler>
        </div>
    )
};

export default SchedulerEmployee;