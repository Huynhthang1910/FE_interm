import "./UpdateInfor.scss";
import { useState, useEffect } from "react";

const UpdateInfor = (props) => {
//   console.log("đây là 1>>>>",props.InforUser)
  const token = sessionStorage.getItem("token");
  const [InforUser, setInforUser] = useState(props.InforUser);
  const [apiTruso, setApiTruso] = useState([]);
  //Xử lý API lấy tên trụ sở
  useEffect(() => {
    fetch("https://be-intern.onrender.com/api/v2/headquarter/", {
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
    if (String(InforUser.employeePhone).length !== 10 ){
        alert("Number phone have 10 characters! please check it again!"); 
        checkVariables = false;
    }
    if (String(InforUser.employeePosition) === "null" || String(InforUser.employeeGender) === "null" || String(InforUser.headquarterId) === "null") {
        alert("Position, Gender or Headquarters is null! please check it again!"); 
        checkVariables = false;
    }
    if (checkVariables) {
        let url = `https://be-intern.onrender.com/api/v2/employee/${InforUser.employeeId}/update`;
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
                    alert('Success! Please click "OK" to reload data!');
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
                <form className="changeInfor__form">
                <div className="col1">
                <label className="changeInfor__form__title">EmployeeName</label>
                <input
                    name="employeeName"
                    className="box"
                    type="text"
                    value={InforUser.employeeName}
                    onChange={(event) => {
                    handelChangeinforJson(event);
                    }}
                />
                <label className="changeInfor__form__title">EmployeePhone</label>
                <input
                    name="employeePhone"
                    className="box"
                    type="number"
                    value={InforUser.employeePhone}
                    onChange={(event) => {
                    handelChangeinforJson(event);
                    }}
                />
                <label className="changeInfor__form__title">
                    EmployeeAddress
                </label>
                <input
                    name="employeeAddress"
                    className="box"
                    type="text"
                    value={InforUser.employeeAddress}
                    onChange={(event) => {
                    handelChangeinforJson(event);
                    }}
                />
                </div>
                <div className="col1">
                <div className="select">
                    <div className="select__around">
                    <label htmlFor="select-role" className="select__around__title">
                        EmployeeGender
                    </label>
                    <select
                        name="employeeGender"
                        className="select__around__col"
                        value={InforUser.employeeGender}
                        onChange={(event) => {
                        handelChangeinforJson(event);
                        }}
                    >
                        <option value="">Select Gender</option>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                    </select>
                    </div>
                    <div className="select__around">
                    <label htmlFor="select-role" className="select__around__title">
                        EmployeePosition
                    </label>
                    <select
                        name="employeePosition"
                        className="select__around__col"
                        value={InforUser.employeePosition}
                        onChange={(event) => {
                        handelChangeinforJson(event);
                        }}
                    >
                        <option value="">Select Position</option>
                        <option value="personnel">Personnel</option>
                        <option value="Head Department">Head Department</option>
                        <option value="Manager">Manager</option>
                        <option value="CEO">CEO</option>
                    </select>
                    </div>
                    <div className="select__around">
                <label htmlFor="select-role" className="select__around__title">
                    Headquarters
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
                <label className="changeInfor__form__title">EmployeeSalary</label>
                <input
                    name="employeeSalary"
                    className="box"
                    type="text"
                    pattern="[0][0-9]{10}"
                    value={InforUser.employeeSalary}
                    onChange={(event) => {
                    handelChangeinforJson(event);
                    }}
                />
                <button
                    type="button"
                    className="changeInfor__form__btn"
                    onClick={() => sendNewUserInfor()}
                >
                    Update Infor
                </button>
                </div>
            </form>
        </>
    )
}

export default UpdateInfor;