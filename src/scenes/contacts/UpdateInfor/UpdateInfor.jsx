import "./UpdateInfor.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateInfor = ({ api }) => {
  const token = sessionStorage.getItem("token");
  const [showForm, setShowForm] = useState(false);
  const [headquarterId, setHeadquarterId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeeGender, setEmployeeGender] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [apiTruso, setApiTruso] = useState([]);
  const [id, setId] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://be-intern.onrender.com/api/v2/employee/${id}/update`,
        {
          headquarterId,
          employeeName,
          employeePhone,
          employeeAddress,
          employeeGender,
          employeePosition,
          employeeSalary,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(id);
      console.log(response);
      if (response.data.status === "OK") {
        alert("tao thanh cong");
      } else {
        alert("fail");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleHeadquarterId = (event) => {
    setHeadquarterId(event.target.value);
  };

  const handleEmployeeName = (event) => {
    setEmployeeName(event.target.value);
  };

  const handleEmployeePhone = (event) => {
    setEmployeePhone(event.target.value);
  };
  const handleEmployeeAddress = (event) => {
    setEmployeeAddress(event.target.value);
  };
  const handleEmployeeGender = (event) => {
    setEmployeeGender(event.target.value);
  };
  const handlePositionChange = (event) => {
    setEmployeePosition(event.target.value);
  };
  const handleEmployeeSalary = (event) => {
    setEmployeeSalary(event.target.value);
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      <button
        className="btn btn-info"
        onClick={() => {
          handleShowForm();
        }}
      >
        SỬA
      </button>
      {showForm && (
        <>
          <div
            className="changeInfor"
            onClick={() => {
              handleShowForm();
            }}
          ></div>
          <form className="changeInfor__form" onSubmit={handleSubmit}>
            <label className="changeInfor__form__title">EmployeeName</label>
            <input
              name="employeeName"
              className="box"
              type="text"
              value={employeeName}
              onChange={handleEmployeeName}
            />
            <label className="changeInfor__form__title">EmployeePhone</label>
            <input
              name="employeePhone"
              className="box"
              type="number"
              value={employeePhone}
              onChange={handleEmployeePhone}
            />
            <label className="changeInfor__form__title">EmployeeAddress</label>
            <input
              name="employeeAddress"
              className="box"
              type="text"
              value={employeeAddress}
              onChange={handleEmployeeAddress}
            />
            <div className="select">
              <div className="select__around">
                <label className="select__around__title">EmployeeGender</label>
                <select
                  name="employeeGender"
                  className="select__around__col"
                  value={employeeGender}
                  onChange={handleEmployeeGender}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
              </div>
              <div className="select__around">
                <label className="select__around__title">
                  EmployeePosition
                </label>
                <select
                  name="employeePositon"
                  className="select__around__col"
                  value={employeePosition}
                  onChange={handlePositionChange}
                >
                  <option value="">Chọn vị trí</option>
                  <option value="QL">Quản Lý</option>
                  <option value="GD">Giám Đốc</option>
                  <option value="NV">Nhân Viên</option>
                </select>
              </div>
            </div>
            <label className="changeInfor__form__title">EmployeeSalary</label>
            <input
              name="employeeSalary"
              className="box"
              type="text"
              value={employeeSalary}
              onChange={handleEmployeeSalary}
            />
            <div className="mb-3 col-6">
              <label htmlFor="select-role" className="form-label">
                Head Quarter
              </label>
              <select
                className="form-select"
                value={headquarterId}
                onChange={handleHeadquarterId}
                required
              >
                <option value="">Open this select ROLE</option>
                {headQuarters.map((item) => (
                  <option key={item.headquarterId} value={item.headquarterId}>
                    {item.headquarterName}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="changeInfor__form__btn"
                onClick={() => setId(api)}
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
