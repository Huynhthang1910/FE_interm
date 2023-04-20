import { useState } from "react"
import "./UpdateHeadquarter.scss"

const UpdateHeadquarter = (props) => {
    const [inforHeadquarter, setInfor] = useState(props.inforHeadquarter);
    console.log(inforHeadquarter)
    const callAPI = () => {
        let payLoad = {
            "headquarterName": inforHeadquarter.headquarterName,
            "headquarterAddress": inforHeadquarter.headquarterAddress
        }
    }
    return (
    <>
        <div 
          className="form_around"
          onClick={()=>{props.handleSetInforHeadquarter(false)}}>
        </div>
        <form>
            <label>
                Headquarter Name
            </label>
            <input type="text" />
        </form>
    </>
   ) 
}
export default UpdateHeadquarter;