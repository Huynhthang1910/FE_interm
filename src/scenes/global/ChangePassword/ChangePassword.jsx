import React, { useState } from "react";
import './ChangePassword.scss';
import UrbanLogo from './UrbanLogo.png';

const ChangePassword = (props) => {
    const token = sessionStorage.getItem("token");
    // console.log(token)
    const [newPass,setPass] = useState();
    const [reNewPass,setReNewPass] = useState();
    const newPassword = (event) => {
        setPass(event.target.value);
    }
    const reNewPassword = (event) => {
        setReNewPass(event.target.value);
    }
    let url = 'https://be-intern.onrender.com/api/v2/account/reset-password';
    let  payLoad= {
        "accountPassword": newPass,
        "retypeAccountPassword": reNewPass
    }
    let option = {
        method: 'PUT',
        body: JSON.stringify(payLoad),
        'headers': {
            Authorization: `Bearer ${token}`, // Add the token as a bearer token
            "Content-Type": "application/json"
          }
    }
    // console.log(option.headers)
    // const callAPI = () => {
    // }
    // console.log(callAPI())
    const handleChangePass = () => {
        if (!newPass || !reNewPass ){
            alert("Mời nhập đủ thông tin!");
        } else if(newPass !== reNewPass) {
            console.log(newPass,reNewPass);
            alert("Mật khẩu vừa nhập không khớp!");
        } else {
            console.log(payLoad)
            console.log(newPass,reNewPass);
            fetch(url,option)
             .then(res => res.json())
             .then(data => alert(data.message))
             .catch(error => {console.log(error)})
            props.changeStatePassForm()

            // alert("đổi thành công!");
        }
    }
    if(props.statePw){
        return(
            <div>
                <div className="ChangePass_around" onClick={() => {props.changeStatePassForm()}}></div>
                <form className="ChangePass__form">
                    <img className="img" src={UrbanLogo} alt="logo"/>
                    <label className="title">Mật khẩu mới:</label>
                    <input id="newPass" 
                        type="password" 
                        className="box"
                        onChange={(event) => newPassword(event)}>
                    </input>
                    <label className="title">Nhập lại mật khẩu:</label>
                    <input id="reNewPass" 
                        type="password" 
                        className="box"
                        onChange={(event) => reNewPassword(event)}>
                    </input>
                    <button type="button"
                        className="btn-changePass" 
                        onClick={() => handleChangePass()}>
                        Xác nhận
                    </button>
                </form>
            </div>
        )
    }
}

export default ChangePassword;