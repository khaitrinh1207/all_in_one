import React from "react";
import {useNavigate} from "react-router-dom";

const ChatBody = ({messages, lastMessageRef, typingStatus}) => {
    const navigate = useNavigate();
    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    }

    return (
        <>
            <header className='chat_mainHeader'>
                <p>Hangout with Colleagues</p>
                <button className='leaveChat_btn' onClick={handleLeaveChat}>
                    LEAVE CHAT
                </button>
            </header>
            <div className='message_container'>
                {messages && messages.map((mess) =>
                    mess.name === localStorage.getItem('userName') ? (
                        /*Hiện tin nhắn gửi từ bạn*/
                        <div className='mess_chats' key={mess.id}>
                            <p className='sender_name'>You</p>
                            <div className='mess_sender'>
                                <p>{mess.text}</p>
                            </div>
                        </div>
                    ) : (
                        /*Tin nhắn từ người gửi*/
                        <div className='mess_chats' key={mess.id}>
                            <p>{mess.name}</p>
                            <div className='mess_recipient'>
                                <p>{mess.text}</p>
                            </div>
                        </div>
                    )
                )}
                {/*Thanh thông báo typing*/}
                <div className='mess_status'>
                    <p>{typingStatus}</p>
                </div>
                {/* --- scroll message ----*/}
                <div ref={lastMessageRef} />
            </div>
        </>
    );
};

export default ChatBody;