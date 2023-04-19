import React from "react";
import "./navAccount..scss"
import { Link } from "react-router-dom";
import ShowProfile from "./ChangeProfileInfor/ShowProfile";
import { useEffect, useRef } from "react";


const NavAccount = (props) => {
    const navChildRef = useRef(null);
    useEffect(() => {
        props.navRef.current = navChildRef.current;
        console.log(navChildRef);
    }, []);
        return(
            <div ref={navChildRef}>
                {props.stateNav 
                    && 
                    (
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
                )}
            </div>
        )    
}
export default NavAccount;