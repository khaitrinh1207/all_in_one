import React, {useEffect, useState, useRef} from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState([]);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.on('messResponse',
            (data) => {
                setMessages( [...messages, data])
            }
        )
    }, [socket, messages])

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    useEffect(() => {
        socket.on('typingResponse', (data) => {
            setTypingStatus(data)
        });
    });

    return (
        <div className="chat">
            <ChatBar socket={socket}/>
            <div className="chat_main">
                <ChatBody
                    messages={messages}
                    typingStatus={typingStatus}
                    lastMessageRef={lastMessageRef}
                />
                <ChatFooter socket={socket}/>
            </div>
        </div>
    )
}

export default ChatPage;