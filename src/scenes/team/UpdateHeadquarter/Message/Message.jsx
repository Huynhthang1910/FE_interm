import {useState} from 'react';
import "./message.scss"
const Message = (props) => {
    const token = sessionStorage.getItem("token");
    const [masage,setMassage] = useState("wait");
    const [messageTitle, setMassageTitle] = useState("Please wait a few seconds...");
    const urlGetHeadquarterName = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/`

        // if(String(inforHeadquarter.headquarterName)=== "" || String(inforHeadquarter.headquarterAddress) === "") {
        //     alert("Something is null! please check it again!")
        // }else{
            let url = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/${props.data.headquarterId}/update`
            let payLoad = {
                "headquarterName": String(props.data.headquarterName),
                "headquarterAddress": String(props.data.headquarterAddress)
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
                    if (data.message ==="Cập Nhật Thành Công")  {
                        // alert('Success! Please click "OK" to reload data!');
                        // props.handleSetdata(false);
                        setMassage("success")
                        setMassageTitle("Success! Click me or wait 3s")
                        setTimeout(() => {
                            window.location.reload()
                        },3000)
                    } else {
                        setMassage("fail")
                        setMassageTitle("Update fail! Please check again!");
                        setTimeout(() => {
                            props.unMess(false)
                        },3000)
                    }
                    })

    if (masage === "wait"){
        return(
        <div className="message loading">
            <div className="message_loading">
                <div className="message_loading_icon">i</div>
            </div>
            <span className="message_title">
                {messageTitle}
            </span>
        </div>
    )
    } else if (masage === "success") {
        return(
            <div className="message success" onClick={()=>{window.location.reload()}}>
                <div className="message_success">
                    <span class="checkmark">
                        <div class="checkmark_circle"></div>
                        <div class="checkmark_stem"></div>
                        <div class="checkmark_kick"></div>
                    </span>
                </div>
                <span className="message_title">
                    {messageTitle}
                </span>
            </div>
        )
    } else{
        return(
            <div className="message error">
                <div className="message_error">
                    <div className="message_error_icon">!</div>
                </div>
                <span className="message_title_error">
                    {messageTitle}
                </span>
            </div>
        )
    }
}

export default Message;