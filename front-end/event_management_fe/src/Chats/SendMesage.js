import React from 'react'
import "./GlobalChat.css"

class SendMessageForm extends React.Component {
    render() {
        return (
            <form className="send-message-form">
                <input
                    placeholder="SendMessageForm"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm