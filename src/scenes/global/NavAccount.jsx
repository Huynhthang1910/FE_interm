import React from "react";
import "./navAccount..scss"
import { Link } from "react-router-dom";
import ShowProfile from "./ChangeProfileInfor/ShowProfile";


const NavAccount = (props) => {
        
    if (props.stateNav) {
        return(
            <div className="account">
                <div 
                    className="acccount__ChangePass div" 
                    onClick={() => {props.changeStatePassForm()}}>
                    Change Pasword
                </div>
                <Link
                    to={"/profile"}
                    className="acccount__Profile div" 
                    onClick={() => {      
                        <ShowProfile >
                        </ShowProfile>
                    }}>
                    User Profile
                </Link>
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