import React, { useState, useEffect } from "react";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import TextBox from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import axios from "axios";
const currentDate = new Date(2023, 3, 25);
const views = ["week", "month"];
const groups = ['TruSo'];
// const data = [
//     {
//         text: "Task 1",
//         startDate: new Date(2023, 3, 25, 9, 30),
//         endDate: new Date(2023, 3, 25, 11, 30),
//         roomId: 1,
//     },
//     {
//         text: "Task 2",
//         startDate: new Date(2023, 3, 25, 12, 0),
//         endDate: new Date(2023, 3, 25, 14, 0),
//         roomId: 2,
//     },
// ];


const urlGetHeadquarterName = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/`;
const urlGetEmployeeNames = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/all-information`;
const urlGetAllScheduleEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/workschedule/`
const SchedulerComponent = () => {
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
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(headquarterNames);
    // lấy ra tên các nhân viên
    const [EmployeeNames, setEmployeeNames] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
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
            });
    }, []);
    console.log(EmployeeNames);
    // lấy ra tất cả lịch là việc
    const [dataSchedulerEmployee, setDataSchedulerEmployee] = useState([])
    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        axios
            .get(urlGetAllScheduleEmployee, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const SchedulerEmployees = response.data.data.map((SchedulerEmployee) => ({
                    id: SchedulerEmployee.workScheduleId,
                    idEmployee : SchedulerEmployee.employeeId,
                    text: SchedulerEmployee.workSchedulePlace,
                    startDate: SchedulerEmployee.workScheduleTimeIn,
                    endDate: SchedulerEmployee.workScheduleTimeOut,
                    description: SchedulerEmployee.workSchedulePlan,
                    TruSo: SchedulerEmployee.headquarterName,
                    NhanVien: SchedulerEmployee.employeeName,
                    allDay: false,
                    recurrenceRule: null,
                }));
                setDataSchedulerEmployee(SchedulerEmployees);
            })
            .catch((error) => {
                console.log(error);
            });
    },[])
    console.log(dataSchedulerEmployee);

    const resources = [
        {
            fieldExpr: "idEmployee",
            dataSource: EmployeeNames,
            label: "Nhân Viên",
        },{
            fieldExpr: "TruSo",
            dataSource: headquarterNames,
            label:"tru so"
        }
    ];
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(dataSchedulerEmployee);
    const [showFilteredData, setShowFilteredData] = useState(false);

    const handleSearch = () => {
        const filtered = dataSchedulerEmployee.filter((item) =>
            item.text.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
        setShowFilteredData(true);
    };

    const renderCell = (dataSchedulerEmployee) => {
        if (showFilteredData) {
            return filteredData.includes(dataSchedulerEmployee.appointmentData);
        } else {
            return true;
        }
    };

    const dataSource = showFilteredData ? filteredData : dataSchedulerEmployee; // Sử dụng filteredData khi showFilteredData là true

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
                dataSource={dataSource} // Sử dụng dataSource mới
                // views={views}
                // groups={groups}
                defaultCurrentView="Vertical Grouping"
                defaultCurrentDate={currentDate}
                height={600}
                startDayHour={9}
                endDayHour={18}
                renderCell={renderCell}
                editing={false}
                showAllDayPanel={false}

            >
                <Resource
                    dataSource={resources[0].dataSource}
                    fieldExpr={resources[0].fieldExpr}
                    label={resources[0].label}
                />
                <Resource
                    dataSource={resources[1].dataSource}
                    fieldExpr={resources[1].fieldExpr}
                    label={resources[1].label}
                />
                <View
                    name="Vertical Grouping"
                    type="workWeek"
                    groupOrientation="vertical"
                    cellDuration={12}
                    intervalCount={1}
                    />
            </Scheduler>
        </div>
    );
};

export default SchedulerComponent;
