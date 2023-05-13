import { useState, useEffect } from "react";
import "./UpdateInfor.scss";



const UpdateInfor = (props) => {
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
  const handelChangeinforJson = (event) => {
    const target = event.target;
    const nameKey = target.name;
    const value = target.value;
    // console.log(nameKey);
    // console.log(value);
    setInforUser({ ...InforUser, [nameKey]: [value] });
  };
  const sendData = () => {
    props.getNewData(InforUser);
    props.handleSetInforUser(false);
  }

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
                    onSubmit={(e) => {e.preventDefault(); sendData()}}
                >
                    <div className="changeInfor__form_title">UPDATE INFOR USER</div>
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
                                placeholder="10 number"
                                onChange={(event) => {
                                handelChangeinforJson(event);
                                }}
                                required
                            />  
                            <label className="col1_input_title">Phone Number</label>
                        </div>
                        <div className="col1_input address">
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
                                min="0"
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
                            <label htmlFor="select-role" className="select__around__title">
                                Gender
                            </label>
                        </div>
                        <div className="select__around">
                            <select
                                name="employeePosition"
                                className="select__around__col"
                                value={InforUser.employeePosition}
                                onChange={(event) => {
                                handelChangeinforJson(event);
                                }}
                                required>
                                <option value="">Select Position</option>
                                <option value="Giám đốc">CEO</option>
                                <option value="Trưởng phòng Marketing">Manager</option>
                                <option value="Director">Director</option>
                                <option value="Deputy">Deputy</option>
                                <option value="Department manager">Department manager</option>
                                <option value="Employee">Employee</option>
                            </select>
                            <label htmlFor="select-role" className="select__around__title">
                                Position
                            </label>
                        </div>
                        <div className="select__around">
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
                            <label htmlFor="select-role" className="select__around__title">
                                Headquarters
                            </label>
                        </div>
                    </div>
                        <button
                            type="submit"
                            className="changeInfor__form__btn update"
                        >
                            Update Infor
                        </button>
                        <button
                            type="button" 
                            className="changeInfor__form__btn cancel"
                            onClick={() => {
                                props.handleSetInforUser(false);
                            }}>
                            Cancel
                        </button>
                    </div>
            </form>
        </>
    )
}

export default UpdateInfor;