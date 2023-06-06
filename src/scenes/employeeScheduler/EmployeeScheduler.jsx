import { useState, useEffect } from "react";
import { Toast, ToastContainer, Button } from "react-bootstrap";
import { Scheduler, Resource, View } from "devextreme-react/scheduler";
import axios from "axios";
import MessegeEmp from "./MessegeEmp"
import './style.css'

function SchedulerEmployee() {
    const StringIso = new Date();
    StringIso.setMinutes(StringIso.getMinutes() + 30);
    const now = StringIso.toISOString();
    // lay token
    const token = sessionStorage.getItem("token");
    // lay du lieu va vap nhat du lieu lich bieu
    const [schedulerDataSource, setSchedulerDataSource] = useState([]);
    const [message,setMassage] = useState();
    const [messageTitle, setMassageTitle] = useState();

    useEffect(() => {
        setMassage("wait")
        setMassageTitle("Please wait a few seconds...")
        axios
            .get(
                `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/self-schedule`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.status !== "OK") {
                    setMassage("fail")
                    setMassageTitle("không tải được lịch biểu!");
                } else {
                    const schedulerDataSources = response.data.data.map(
                        (schedulerDataSource) => ({
                            id: schedulerDataSource.workScheduleId,
                            text: schedulerDataSource.workSchedulePlan,
                            startDate: schedulerDataSource.workScheduleTimeIn,
                            endDate: schedulerDataSource.workScheduleTimeOut,
                            destination: schedulerDataSource.workScheduleDestination,
                        })
                        );
                        setSchedulerDataSource(schedulerDataSources);
                        console.log(1);
                        setMassage("success")
                        setMassageTitle("Hoàn tất tải lịch biểu...")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const lenScheduler = schedulerDataSource.length
    // console.log(schedulerDataSource[lenScheduler-].text);
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
                const headquarterNames = response.data.data.map(
                    (headquarter, index) => ({
                        id: index,
                        text: headquarter.headquarterName,
                    })
                );
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
            colSpan: 2,
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
        {
            name: "departure",
            label: {
                text: "Nơi đi ",
                visible: true,
            },
            editorType: "dxSelectBox",
            dataField: "departure",

            editorOptions: {
                dataSource: headquarterNames,
                displayExpr: "text",
                valueExpr: "text",
                isRequired: true,
            },
        },
        {
            name: "destination",
            label: {
                text: "Nơi đến ",
            },
            editorType: "dxSelectBox",
            dataField: "destination",
            editorOptions: {
                dataSource: headquarterNames,
                displayExpr: "text",
                valueExpr: "text",
                isRequired: true,
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
        const destinationField = form.getEditor("destination");
        const departureField = form.getEditor("departure");
        const dataText = form.getEditor("text");
        const desValue = form.itemOption("destination");
        const depValue = form.itemOption("departure");
        console.log(desValue);
        dataText.option("onValueChanged", function (args) {
            const isDiCongTac = args.value === "đi Công Tác";
            desValue.label.visible = isDiCongTac;
            console.log(desValue.label.visible);
            depValue.label.visible = isDiCongTac;
            destinationField.option("visible", isDiCongTac);
            departureField.option("visible", isDiCongTac);
        });
        if (!appointmentData.text) {
            destinationField.option("visible", false);
            departureField.option("visible", false);
        }
    };

    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [showToast, setShowToast] = useState(false);
    const hideToastMessage = () => {
        setShowToast(false);
    };
    const handleTaskAdded = (e) => {
        // const token = localStorage.getItem('token');
        if (!(e.appointmentData.text)) {
            setMassage("fail")
            setMassageTitle("Vui lòng cung cấp đày đủ thông tin lịch biểu");
        } else {
            const newTask = {
                workScheduleColor: "green",
                workSchedulePlan: e.appointmentData.text,
                workSchedulePlace: e.appointmentData.departure,
                workScheduleDeparture: e.appointmentData.departure,
                workScheduleDestination: e.appointmentData.destination,
                workScheduleTimeIn: e.appointmentData.startDate,
                workScheduleTimeOut: e.appointmentData.endDate,
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
                    console.log(response);
                    if (response.data.status !== "OK") {
                        setMassage("fail")
                        setMassageTitle("Update fail! Please check again!");
                    } else {
                        setMassage("success")
                        setMassageTitle("Success! Continue your work...")
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);

                        if (
                            !schedulerDataSource.some(
                                (a) => a.workScheduleId === response.data.data.workScheduleId
                            )
                        ) {
                            // Thêm lịch mới vào danh sách các lịch biểu hiện tại
                            const schedulerDataSources = response.data.data.map(
                                (schedulerDataSource) => ({
                                    id: schedulerDataSource.workScheduleId,
                                    text: schedulerDataSource.workSchedulePlan,
                                    startDate: schedulerDataSource.workScheduleTimeIn,
                                    endDate: schedulerDataSource.workScheduleTimeOut,
                                    destination: schedulerDataSource.workScheduleDestination,
                                    departure: schedulerDataSource.workScheduleDeparture,
                                })
                            );
                            console.log(schedulerDataSources);
                            setSchedulerDataSource((schedulerDataSource) => [
                                ...schedulerDataSource,
                                schedulerDataSources,
                            ]);
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
            workScheduleColor: "green",
            workScheduleDestination: e.appointmentData.destination,
            workScheduleDeparture: e.appointmentData.departure,
            workSchedulePlan: e.appointmentData.text,
            workScheduleTimeIn: e.appointmentData.startDate,
            workScheduleTimeOut: e.appointmentData.endDate,
            workSchedulePlace: e.appointmentData.destination,
        };
        if(updatedTask.workScheduleTimeIn < now){
            console.log(1);
        }
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
                console.log(e.appointmentData);
                if (response.data.status !== "OK") {
                    setMassage("fail")
                    setMassageTitle("Update fail! Please check again!");
                } else {
                    const updatedTasks = schedulerDataSource.map((task) => {
                        if (task.workScheduleId === e.appointmentData.id) {
                            return {
                                ...task,
                                text: e.appointmentData.text,
                                destination: e.appointmentData.destination,
                                departure: e.appointmentData.departure,
                                startDate: e.appointmentData.startDate,
                                endDate: e.appointmentData.endDate,
                            };
                        }
                        return task;
                    });
                    setSchedulerDataSource(updatedTasks);
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
        console.log(token);
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
                if (response.data.status !== "OK") {
                    e.cancel = true;
                    setMassage("fail")
                    setMassageTitle("Update fail! Please check again!");
                } else {
                    const filteredTasks = schedulerDataSource.filter(
                        (task) => task.id !== e.appointmentData.id
                    );
                    setSchedulerDataSource(filteredTasks);
                    e.cancel = true;
                    setMassage("success")
                    setMassageTitle("Success! Continue your work...")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const schedulerOptions = {
        editing: {
            allowAdding: true, //  cho phép thêm mới sự kiện
            allowUpdating: true, // cho phép chỉnh sửa sự kiện
        },
        onAppointmentAdding: (e) => {
            if (e.appointmentData.startDate < now) {
                // Ngăn chặn việc thêm sự kiện trong quá khứ
                e.cancel = true;
                setMassage("fail")
                setMassageTitle("bạn không thể thêm sự kiện trong quá khứ!");
            }
            if (!(e.appointmentData.text)) {
                // Ngăn chặn việc thêm sự kiện trong quá khứ
                e.cancel = true;
                setToastType("danger");
                setToastMessage("bạn hãy điền đầy đủ thông tin");
                setShowToast(true);
            }
        },
        onAppointmentUpdating: (e) => {
            if (e.oldData.startDate < now) {
                // Ngăn chặn việc chỉnh sửa sự kiện trong quá khứ
                e.cancel = true;
                setMassage("fail")
                setMassageTitle("bạn không thể cập nhật sự kiện trong quá khứ!");
            }
            if (e.newData.startDate < now){
                e.cancel = true;
                setMassage("fail")
                setMassageTitle("bạn không thể cập nhật sự kiện trong quá khứ!");
            }
        },
        onAppointmentDeleting: (e) => {
            if (e.appointmentData.startDate < now) {
                // Ngăn chặn việc chỉnh sửa sự kiện trong quá khứ
                e.cancel = true;
                setMassage("fail")
                setMassageTitle("bạn không thể xoá lịch biểu trong quá khứ!");
            }
        },
        onAppointmentDragging : (e)=>{
            var cellData = e.component.getCellData(e.eventData.cellIndex, e.eventData.rowIndex);
            console.log(cellData);
        }
    };
    return (
        <div className="main">
            <div className="Scheduler">
                <Scheduler
                    timeZone="Asia/Ho_Chi_Minh"
                    views={["day", "workWeek", "month"]}
                    defaultCurrentView="workWeek"
                    dataSource={schedulerDataSource}
                    startDayHour={9}
                    endDayHour={18}
                    height = {600}
                    dateSerializationFormat="yyyy-MM-ddTHH:mm:ss.ssZ"
                    onAppointmentFormOpening={onAppointmentFormOpening}
                    onAppointmentAdded={handleTaskAdded}
                    onAppointmentUpdated={handleTaskUpdated}
                    onAppointmentDeleted={handleTaskDeleted}
                    {...schedulerOptions}
                >
                </Scheduler>
            </div>
            <ToastContainer
                position="end-50"
                style={{ bottom: "40px", right: "25px" }}
            >
                <Toast
                    onClose={hideToastMessage}
                    show={showToast}
                    delay={3000}
                    autohide
                    bg={toastType}
                >
                    <Toast.Body
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: "20px",
                        }}
                    >
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            {(message &&
            <MessegeEmp
                message = {message}
                messageTitle = {messageTitle}
            />)}
        </div>
    );
}

export default SchedulerEmployee;
