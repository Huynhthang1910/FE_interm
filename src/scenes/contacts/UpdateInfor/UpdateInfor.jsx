import "./UpdateInfor.scss";
import { useState, useEffect } from "react";

const UpdateInfor = (props) => {
//   console.log("đây là 1>>>>",props.InforUser)
  const token = sessionStorage.getItem("token");
  const [InforUser, setInforUser] = useState(props.InforUser);
  const [apiTruso, setApiTruso] = useState([]);
  const urlGetHeadquarterName = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/`
  //Xử lý API lấy tên trụ sở
  useEffect(() => {
    fetch(urlGetHeadquarterName, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token as a bearer token
      },
    })
      .then((response) => response.json())
      .then((data) => setApiTruso(data.data))
      .catch((error) => console.error(error));
  }, [token]); // Include the token as a dependency to re-fetch data when the token changes
  const headQuarters = apiTruso;
  const sendNewUserInfor = () => {
    // console.log(InforUser);
    let checkVariables = true;
    // if (String(InforUser.employeePhone).length !== 10 ){
    //     alert("Number phone have 10 characters! please check it again!");
    //     checkVariables = false;
    // }
    // if (String(InforUser.employeePosition) === "null" || String(InforUser.employeeGender) === "null" || String(InforUser.headquarterId) === "null") {
    //     alert("Position, Gender or Headquarters is null! please check it again!");
    //     checkVariables = false;
    // }
    if (checkVariables) {
        let url = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/${InforUser.employeeId}/update`;
        let sendInfor = {
        headquarterId: String(InforUser.headquarterId),
        employeeName: String(InforUser.employeeName),
        employeePhone: String(InforUser.employeePhone),
        employeeAddress: String(InforUser.employeeAddress),
        employeeGender: String(InforUser.employeeGender),
        employeePosition: String(InforUser.employeePosition),
        employeeSalary: String(InforUser.employeeSalary),
        };
        console.log("sendInfor", sendInfor);
        let option = {
        method: "PUT",
        body: JSON.stringify(sendInfor),
        headers: {
            Authorization: `Bearer ${token}`, // Add the token as a bearer token
            "Content-Type": "application/json",
        },
        };
        fetch(url, option)
        .then((res) => res.json())
        .then((data) => {
                if (data.message ==="Cập Nhật Thành Công")  {
                    // alert('Success! Please click "OK" to reload data!');
                    // props.handleSetInforUser(false);
                    props.show();
                } else {
                    alert("Update failed!");
                    console.log(data)
                }
            })
        .catch((error) => {
            console.log(error);
        });
    }
  };
  const handelChangeinforJson = (event) => {
    const target = event.target;
    const nameKey = target.name;
    const value = target.value;
    console.log(nameKey);
    console.log(value);
    // [nameKey]([value])
    // console.log(Name)
    setInforUser({ ...InforUser, [nameKey]: [value] });
  };

    return(
        <>
            <div
            className="changeInfor"
            onClick={() => {
                props.handleSetInforUser(false);
            }}
          ></div>
                <form
                    className="changeInfor__form"
                    onSubmit={(e) => {e.preventDefault(); sendNewUserInfor();}}>
                <div className="col1">
                    <div className="col1_input">
                        <input
                            name="employeeName"
                            className="box"
                            type="text"
                            value={InforUser.employeeName}
                            placeholder="Johnny Deef..."
                            onChange={(event) => {
                            handelChangeinforJson(event);
                            }}
                        />
                        <label className="col1_input_title">Full Name</label>
                    </div>
                    <div className="col1_input">
                        <input
                            name="employeePhone"
                            className="box"
                            type="tell"
                            pattern="[0-9]{10}"
                            value={InforUser.employeePhone}
                            placeholder="Number phone has 10 number"
                            onChange={(event) => {
                            handelChangeinforJson(event);
                            }}
                            required
                        />  
                        <label className="col1_input_title">Phone Number</label>
                    </div>
                    <div className="col1_input">
                        <input
                            name="employeeAddress"
                            className="box"
                            type="text"
                            value={InforUser.employeeAddress}
                            placeholder="Tokyo..."
                            onChange={(event) => {
                            handelChangeinforJson(event);
                            }}
                        />
                        <label className="col1_input_title">Address</label>
                    </div>
                    <div className="col1_input">
                        <input
                            name="employeeSalary"
                            className="box"
                            type="number"
                            step="100"
                            min="1"
                            max="100000"
                            value={InforUser.employeeSalary}
                            onChange={(event) => {
                            handelChangeinforJson(event);
                            }}
                        />
                        <label className="col1_input_title">EmployeeSalary</label>
                    </div>
                </div>
                <div className="col1">
                <div className="select">
                    <div className="select__around">
                    <label htmlFor="select-role" className="select__around__title">
                        Select Gender
                    </label>
                    <select
                        name="employeeGender"
                        className="select__around__col"
                        value={InforUser.employeeGender}
                        onChange={(event) => {
                        handelChangeinforJson(event);
                        }}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                    </select>
                    </div>
                    <div className="select__around">
                    <label htmlFor="select-role" className="select__around__title">
                        Select Position
                    </label>
                    <select
                        name="employeePosition"
                        className="select__around__col"
                        value={InforUser.employeePosition}
                        onChange={(event) => {
                        handelChangeinforJson(event);
                        }}
                        required
                    >
                        <option value="">Select Position</option>
                        <option value="Giám đốc">CEO</option>
                        <option value="Trưởng phòng Marketing">Manager</option>
                        <option value="Director">Director</option>
                        <option value="Deputy">Deputy</option>
                        <option value="Department manager">Department manager</option>
                        <option value="Employee">Employee</option>
                    </select>
                    </div>
                    <div className="select__around">
                <label htmlFor="select-role" className="select__around__title">
                    Select Headquarters
                </label>
                <select
                    name="headquarterId"
                    className="select__around__col"
                    value={InforUser.headquarterId}
                    onChange={(event) => {
                        handelChangeinforJson(event);
                        }}
                    required
                    >
                    <option value="">Open this select ROLE</option>
                    {headQuarters.map((item) => (
                    <option key={item.headquarterId} value={item.headquarterId}>
                        {item.headquarterName}
                    </option>
                    ))}
                </select>
            </div>
                </div>
                <button
                    type="submit"
                    className="changeInfor__form__btn"
                >
                    Update Infor
                </button>
                </div>
            </form>
        </>
    )
}

export default UpdateInfor;