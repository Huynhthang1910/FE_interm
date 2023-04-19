import "./UpdateInfor.scss"
import { useState } from "react";
import Button from "react-bootstrap/Button";

const UpdateInfor = (props) => {
    const token = sessionStorage.getItem("token");
    const [InforUser, setInforUser] = useState(props.InforUser);
    const [showForm, setShowForm] = useState(false)
    // const [Id,headquarterId] = useState(InforUser.headquarterId);
    // const [Name,employeeName] = useState(InforUser.employeeName);
    // const [Phone,employeePhone] = useState(InforUser.employeePhone);
    // const [Address,employeeAddress] = useState(InforUser.employeeAddress);
    // const [Gender,employeeGender] = useState(InforUser.employeeGender);
    // const [Position,employeePosition] = useState(InforUser.employeePosition);
    // const [Salary,employeeSalary] = useState(InforUser.employeeSalary);
    const sendNewUserInfor = () => {
        console.log(InforUser);
        let url = `https://be-intern.onrender.com/api/v2/employee/${InforUser.employeeId}/update`;
        let sendInfor = {
            "headquarterId": InforUser.headquarterId,
            "employeeName": InforUser.employeeName,
            "employeePhone": InforUser.employeePhone,
            "employeeAddress": InforUser.employeeAddress,
            "employeeGender": InforUser.employeeGender,
            "employeePosition": InforUser.employeePosition,
            "employeeSalary": InforUser.employeeSalary
        }
        let option = {
            method: 'PUT',
            body: JSON.stringify(sendInfor),
            'headers': {
                Authorization: `Bearer ${token}`, // Add the token as a bearer token
                "Content-Type": "application/json"
              }
        }
        // let payload = InforUser;
        const callAPI = () => {
            fetch(url,option)
            .then(res => res.json)
            .then(data => console.log(data))
            .catch(error => {console.log(error)})
        }
        // console.log(sendInfor)
        callAPI()
        }
    const handelChangeinforJson = (event) => {
        const target = event.target;
        const nameKey = target.name;
        const value = event.target.value;
        console.log(nameKey)
        // console.log(event.target.value)
        // [nameKey]([value])
        // console.log(Name)
        setInforUser({...InforUser, [nameKey]:([value])})
    }
    const show = () => {
        console.log(InforUser)
        setShowForm(!showForm)
    }

        return(
            <>
                <button className="btn btn-info" onClick={() => {show()}}>SỬA</button>
                {showForm &&
                    <>
                        <div className="changeInfor" onClick={() => {show()}}></div>
                        <form className="changeInfor__form">
                            <label className="changeInfor__form__title">EmployeeName</label>
                            <input 
                                name="employeeName" 
                                className="box" 
                                type="text" 
                                value={InforUser.employeeName}
                                onChange={(event) => {handelChangeinforJson(event)}}/>
                            <label className="changeInfor__form__title">EmployeePhone</label>
                            <input 
                                name="employeePhone"
                                className="box" type="number" 
                                value={InforUser.employeePhone}
                                onChange={(event) => {handelChangeinforJson(event)}}/>
                            <label className="changeInfor__form__title">EmployeeAddress</label>
                            <input 
                                name="employeeAddress"
                                className="box" 
                                type="text" 
                                value={InforUser.employeeAddress}
                                onChange={(event) => {handelChangeinforJson(event)}}/>
                            <div className="select">
                                <div className="select__around">
                                <label className="select__around__title">EmployeeGender</label>
                                <select 
                                    name="employeeGender" 
                                    className="select__around__col" 
                                    value={InforUser.employeeGender}
                                    onChange={(event) => {handelChangeinforJson(event)}}>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                                </div>
                                <div className="select__around">
                                <label className="select__around__title">EmployeePosition</label>
                                <select 
                                    name="employeePositon"
                                    className="select__around__col" 
                                    value={InforUser.employeePositon}
                                    onChange={(event) => {handelChangeinforJson(event)}}>
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
                                value={InforUser.employeeSalary}
                                onChange={(event) => {handelChangeinforJson(event)}}/>
                            <button 
                                type="button" 
                                className="changeInfor__form__btn" 
                                onClick={() => sendNewUserInfor()}>Update Infor</button>
                        </form>
                    </>}
            </>
        )
    }
export default UpdateInfor;