import React, { useState } from "react";
import '../styles/ChangePassword.scss';
// import logoUrban from '../../public/assets/urbanlogo.png';

const ChangePassword = (props) => {
    const [oldPass,setOldPass] = useState();
    const [newPass,setPass] = useState();
    const [reNewPass,setReNewPass] = useState();
    const oldPassword = (event) => {
        setOldPass(event.target.value);
    }
    const newPassword = (event) => {
        setPass(event.target.value);
    }
    const reNewPassword = (event) => {
        setReNewPass(event.target.value);
    }
    let url = 'http://be-intern.onrender.com/api/v1/account/reset-password';
    let  payLoad= {
        accountEmail: props.email,
        accountPassword: oldPass,
        retypeAccountPassword: reNewPass
    }
    let option = {
        method: 'PUT',
        body: JSON.stringify(payLoad)
    }
    const callAPI = () => {
        fetch(url,option)
        .then(res => alert(res.massage))
    }
    const handleChangePass = () => {
        if ( !oldPass || !newPass || !reNewPass ){
            alert("Mời nhập đủ thông tin!");
        } else if(newPass !== reNewPass) {
            console.log(oldPass,newPass,reNewPass);
            alert("Mật khẩu vừa nhập không khớp!");
        } else {
            callAPI()
            .then(res => console.log(res.status));
            console.log(oldPass,newPass,reNewPass);
            alert("đổi thành công!");
        }
    }
    if(props.statePw){
        return(
            <div>
                <div className="ChangePass" onClick={() => props.handleShowChangePass()}></div>
                <form className="ChangePass__form">
                    <img className="img" src={`assets/urbanlogo.png`}/>
                    <label className="title">Mật khẩu cũ:</label>
                    <input id="oldPass" 
                        type="password" 
                        className="box"
                        onChange={(event) => oldPassword(event)}>
                    </input>
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
                        Đổi mật khẩu
                    </button>
                </form>
            </div>
        )
    }
}

export default ChangePassword;