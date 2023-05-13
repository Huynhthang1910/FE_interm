import React, { useState, useEffect } from "react";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import TextBox from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import axios from "axios";

const SchedulerComponent = () => {
    const token = sessionStorage.getItem("token");
    const StringIso = new Date();
    const currentDate = StringIso.toISOString();
    const groups = ['idEmployee'];
    const urlGetHeadquarterName = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/`;
    const urlGetEmployeeNames = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/`;
    const urlGetAllScheduleEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/`

    const [loading, setLoading] = useState(true);
    // lấy ra thông tin trụ sở
    const [headquarterNames, setHeadquarterNames] = useState([]);
    useEffect(() => {
        axios
            .get(urlGetHeadquarterName, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const headquarterNames = response.data.data.map((headquarter) => ({
                    id: headquarter.headquarterId,
                    text: headquarter.headquarterName,
                }));
                setHeadquarterNames(headquarterNames);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    // lấy ra tên các nhân viên
    const [EmployeeNames, setEmployeeNames] = useState([]);
    useEffect(() => {
        axios
            .get(urlGetEmployeeNames, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const EmployeeNames = response.data.data.map((employeeName) => ({
                    id: employeeName.employeeId,
                    text: employeeName.employeeName,
                }));
                setEmployeeNames(EmployeeNames);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    // lấy ra tất cả lịch là việc
    const [dataSchedulerEmployee, setDataSchedulerEmployee] = useState([])
    useEffect(() => {
        axios
            .get(urlGetAllScheduleEmployee, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                const SchedulerEmployees = response.data.data.map((SchedulerEmployee) => ({
                    id: SchedulerEmployee.workScheduleId,
                    idEmployee: SchedulerEmployee.employeeId,
                    text: SchedulerEmployee.workSchedulePlan,
                    startDate: SchedulerEmployee.workScheduleTimeIn,
                    endDate: SchedulerEmployee.workScheduleTimeOut,
                    departure: SchedulerEmployee.workScheduleDeparture,
                    destination: SchedulerEmployee.workScheduleDestination
                }));
                setDataSchedulerEmployee(SchedulerEmployees);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(dataSchedulerEmployee);
    const [showFilteredData, setShowFilteredData] = useState(false);

    const handleSearch = () => {
        console.log(searchText.toLowerCase());
        const filtered = dataSchedulerEmployee.filter((item) => {
            const sentence = item.text.toLowerCase();
            const phrase = searchText.toLowerCase()
            const index = sentence.indexOf(phrase)
            console.log(phrase);
            if (index !== -1) {
                console.log("tao thấy nó ròi nè ");
                const remainingSentence = sentence.slice(index);
                if (remainingSentence.includes(phrase)) {
                    return true;
                } else {
                    return false;
                }
            }
            else {
                return false;
            }
            // item.text.toLowerCase().includes(searchText.toLowerCase())
        }
        );
        console.log(filtered);
        setFilteredData(filtered);
        setShowFilteredData(true);
    };

    const renderCell = (dataSchedulerEmployee) => {
        console.log(dataSchedulerEmployee.appointmentData);
        if (showFilteredData) {
            return filteredData.includes(dataSchedulerEmployee.appointmentData);
        } else {
            return true;
        }
    };

    const dataSource = showFilteredData ? filteredData : dataSchedulerEmployee; // Sử dụng filteredData khi showFilteredData là true

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
        const { form } = e;
        form.option("items", formItems);
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div
                style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
            >
                <TextBox
                    value={searchText}
                    onValueChanged={(e) => setSearchText(e.value)}
                />
                <Button text="Filter" onClick={handleSearch} />
            </div>
            <Scheduler
                className="Scheduler"
                dataSource={dataSource} // Sử dụng dataSource mới
                // views={views}
                groups={groups}
                defaultCurrentView="Vertical Grouping"
                defaultCurrentDate={currentDate}
                height={550}
                startDayHour={9}
                endDayHour={18}
                renderCell={renderCell}
                editing={false}
                showAllDayPanel={false}
                onAppointmentFormOpening={onAppointmentFormOpening}
            >
                <Resource
                    dataSource={headquarterNames}
                    fieldExpr={'TruSo'}
                    label={"Trụ Sở "}
                />
                <Resource
                    dataSource={EmployeeNames}
                    fieldExpr='idEmployee'
                    allowMultiple={false}
                    label="Tên Nhân viên "
                />
                <View
                    name="Vertical Grouping"
                    type="workWeek"
                    // type='month'
                    groupOrientation="vertical"
                // cellDuration={12}
                // intervalCount={1}
                />
            </Scheduler>
        </div>
    );
};
export default SchedulerComponent;
