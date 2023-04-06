import React from "react";
import "./navAccount..scss";

const NavAccount = (props) => {
        
    if (props.stateNav) {
        return(
            <div className="account">
                <div 
                    className="acccount__ChangePass div" 
                    onClick={() => {props.changeStatePassForm()}}>
                    Change Pasword
                </div>
                <div 
                    className="account__logOut div"> 
                    <a 
                        href="#" 
                        className="logOutBtn">
                        Log Out
                    </a>
                </div>
            </div>
        )
    }
    
}
export default NavAccount;