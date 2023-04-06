import React from "react";

const NavAccount = (props) => {
        
    if (props.stateNav) {
        return(
            <div className="account">
                <div className="acccount__ChangePass div">Change Pasword</div>
                <div className="account__logOut div"> Log Out</div>
            </div>
        )
    }
    
}
export default NavAccount;