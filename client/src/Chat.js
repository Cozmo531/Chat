import React, { useEffect, useState } from "react";

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messagelist, setmessagelist] = useState([]);

    const sendMessage =  async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("sendmessage", messageData);
            setmessagelist((list) => [...list, messageData])

        }
    };

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {
            setmessagelist((list) => [...list, data])
        })
    }, [socket]);

    return(
        <div className="Chat-window">

            <div className="chat-header">
               Chat
            </div>

            <div className="chat-body">
        {messagelist.map((messageContent) => {
            return <h1>{messageContent.message}</h1>
        })}
            </div>

            <div className="chat-footer">
        <input type="text" placeholder="Message " onChange={(event)=> {
            setCurrentMessage(event.target.value)
        }}/>
        <button onClick={sendMessage}>&#9658;</button>
            </div>





        </div>
    )
}

export default Chat;