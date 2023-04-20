import { useState } from "react";
import UrbanLogo from "./UrbanLogo.png";
import "./UpdateHeadquarter.scss";
import { Message } from "@mui/icons-material";

const UpdateHeadquarter = (props) => {
    const token = sessionStorage.getItem("token");
    const [inforHeadquarter, setInfor] = useState(props.inforHeadquarter);
    // console.log(inforHeadquarter)
    const changeHeadquarter = (e) => {
        let tar = e.target;
        let keyName = tar.name;
        let value = tar.value;
        console.log(keyName)
        console.log(value)
        setInfor({...inforHeadquarter,[keyName]:[value]})
    }
    const callAPI = () => {
        if(String(inforHeadquarter.headquarterName)=== "" || String(inforHeadquarter.headquarterAddress) === "") {
            alert("Something is null! please check it again!")
        }else{
            let url = `https://be-intern.onrender.com/api/v2/headquarter/${inforHeadquarter.headquarterId}/update`
            let payLoad = {
                "headquarterName": String(inforHeadquarter.headquarterName),
                "headquarterAddress": String(inforHeadquarter.headquarterAddress)    
                }
            let option = {
                method: "PUT",
                body: JSON.stringify(payLoad),
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token as a bearer token
                    "Content-Type": "application/json",
                },
            }
            fetch(url, option)
                .then((res) => res.json())
                .then((data) => {
                    if(data.message === "Cập Nhật Thành Công"){
                        alert('Success! Please click "OK" to reload data!')
                        props.resetWindows()
                    } else{
                        alert("Update failed!");
                        console.log(data)
                    }
                    })
        }
    }
    return (
    <>
        <div 
          className="form_around"
          onClick={()=>{props.handleSetInforHeadquarter(false)}}>
        </div>
        <form className="form_headquarter">
            <img src={UrbanLogo} alt="logo" className="form_headquarter__img" />
            <label className="form_headquarter__title">
                Headquarter Name
            </label>
            <input 
                type="text" 
                name="headquarterName"
                className="form_headquarter__input"
                value={inforHeadquarter.headquarterName}
                onChange={(e)=>{changeHeadquarter(e)}}/>
            <label className="form_headquarter__title">
                Headquarter Address
            </label>
            <input 
                type="text" 
                name="headquarterAddress"
                className="form_headquarter__input"
                value={inforHeadquarter.headquarterAddress}
                onChange={(e)=>{changeHeadquarter(e)}}/>
            <button 
                type="button"
                className="form_headquarter__btn"
                onClick={()=>{callAPI()}}>
                Update Headquarter
            </button>
        </form>
    </>
   ) 
}
export default UpdateHeadquarter;