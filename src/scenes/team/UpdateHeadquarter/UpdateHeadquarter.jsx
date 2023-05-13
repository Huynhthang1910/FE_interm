import { useState } from "react";
import UrbanLogo from "./UrbanLogo.png";
import "./UpdateHeadquarter.scss";
import { Message } from "@mui/icons-material";

const UpdateHeadquarter = (props) => {
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
    const sendData = () => {
        props.getNewData(inforHeadquarter);
        props.handleSetInforHeadquarter(false);
      }
    return (
    <>
        <div
          className="form_around"
          onClick={()=>{props.handleSetInforHeadquarter(false)}}>
        </div>
        <form
            className="form_headquarter"
            onSubmit={(e) => {e.preventDefault(); sendData()}}>
            <div className="form_headquarter_title">UPDATE HEADQUARTER</div>
            <div className="form_headquarter_input">
                <input
                    type="text"
                    name="headquarterName"
                    className="box"
                    value={inforHeadquarter.headquarterName}
                    onChange={(e)=>{changeHeadquarter(e)}}
                    required/>
                <label className="form_headquarter__title">
                    Headquarter Name
                </label>    
            </div>
            <div className="form_headquarter_input">
                <input
                    type="text"
                    name="headquarterAddress"
                    className="box"
                    value={inforHeadquarter.headquarterAddress}
                    onChange={(e)=>{changeHeadquarter(e)}}
                    required/>
                            <label className="form_headquarter__title">
                    Headquarter Address
                </label>
            </div>
            <button
                type="submit"
                className="form_headquarter__btn update">
                Update
            </button>
            <button
                type="submit"
                className="form_headquarter__btn cancle"
                onClick={()=>{props.handleSetInforHeadquarter(false)}}>
                Cancle
            </button>
        </form>
    </>
   )
}
export default UpdateHeadquarter;