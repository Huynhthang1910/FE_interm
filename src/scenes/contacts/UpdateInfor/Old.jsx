import "./UpdateInfor.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const UpdateInfor = (props) => {
  const token = sessionStorage.getItem("token");
  const [InforUser, setInforUser] = useState(props.InforUser);
  const [showForm, setShowForm] = useState(false);
  const sendNewUserInfor = () => {
    // console.log(InforUser);
    let url = `https://be-intern-g6fh.onrender.com/api/v2/employee/${InforUser.employeeId}/update`;
    let sendInfor = {
      headquarterId: InforUser.headquarterId,
      employeeName: InforUser.employeeName[0],
      employeePhone: String(InforUser.employeePhone),
      employeeAddress: InforUser.employeeAddress,
      employeeGender: InforUser.employeeGender[0],
      employeePosition: InforUser.employeePosition,
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
      .then((data) => alert(data.message))
      .catch((error) => {
        console.log(error);
      });
  };
  const handelChangeinforJson = (event) => {
    const target = event.target;
    const nameKey = target.name;
    const value = event.target.value;
    console.log(nameKey);
    console.log(event.target.value);
    // [nameKey]([value])
    // console.log(Name)
    setInforUser({ ...InforUser, [nameKey]: [value] });
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          handleShowForm();
        }}
      >
        CHANGE
      </Button>
      {showForm && (
        <>
          <div
            className="changeInfor"
            onClick={() => {
              handleShowForm();
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
                  <label className="select__around__title">
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
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                </div>
                <div className="select__around">
                  <label className="select__around__title">
                    EmployeePosition
                  </label>
                  <select
                    name="employeePositon"
                    className="select__around__col"
                    value={InforUser.employeePositon}
                    onChange={(event) => {
                      handelChangeinforJson(event);
                    }}
                  >
                    <option value="QL">Quản Lý</option>
                    <option value="employee">Nhân Viên</option>
                  </select>
                </div>
              </div>
              <label className="changeInfor__form__title">EmployeeSalary</label>
              <input
                name="employeeSalary"
                className="box"
                type="number"
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
      )}
    </>
  );
};
export default UpdateInfor;
