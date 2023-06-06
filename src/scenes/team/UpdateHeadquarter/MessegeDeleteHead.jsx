
const MessageState = (props) =>{
    const message = props.message;
    const messageTitle = props.messageTitle;
    console.log(message, messageTitle)
    if (message === "wait"){
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
    } else if (message === "success") {
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

export default MessageState;