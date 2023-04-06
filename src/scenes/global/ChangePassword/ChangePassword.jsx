import React, { useState } from "react";
import './ChangePassword.scss';
import UrbanLogo from './UrbanLogo.png';

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
    const handleChangePass = () => {
        if ( !oldPass || !newPass || !reNewPass ){
            alert("Mời nhập đủ thông tin!");
        } else if(newPass !== reNewPass) {
            console.log(oldPass,newPass,reNewPass);
            alert("Mật khẩu vừa nhập không khớp!");
        } else {
            let  payLoad= {
                accountEmail: props.email,
                accountPassword: oldPass,
                retypeAccountPassword: reNewPass
            };
            let option = {
                method: 'PUT',
                body: JSON.stringify(payLoad)
            };
            fetch(url,option)
             .then(res => alert(res.massage))
             .catch(error => {console.log(error)})
            console.log(oldPass,newPass,reNewPass);
            alert("đổi thành công!");
        }
    }
    if(props.statePw){
        return(
            <div>
                <div className="ChangePass" onClick={() => {props.changeStatePassForm(); props.changeStateNav()}}></div>
                <form className="ChangePass__form">
                    <img className="img" src={UrbanLogo} alt="logo"/>
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