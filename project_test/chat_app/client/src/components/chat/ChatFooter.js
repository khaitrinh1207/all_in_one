import React, {useState} from "react";
import checkPageStatus from "../../ultis/func";

const ChatFooter = ({socket}) => {
    const [message, setMessage] = useState('');

    const handleTyping = () => socket
        .emit('typing', `${localStorage.getItem('userName')} is typing ...`)
    ;

    const handleSendMessage = (e) => {
        e.preventDefault();
        // trim() loại bỏ khoảng trắng đầu và cuối
        // kiểm tra chuỗi rỗng và userName có tồn tại không
        if (message.trim() && localStorage.getItem('userName')) {
            // console.log('obj_mess', {
            //     userName: localStorage.getItem('userName'),
            //     message
            // });
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
            checkPageStatus(message, localStorage.getItem('userName'));
        }
        setMessage('');
    };

return (
    <div className='chat_footer'>
        <form className='form' onSubmit={handleSendMessage}>
            <input
                placeholder='Write message'
                className='message'
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                onKeyDown={handleTyping}
                type='text'
            />
            <button className='sendBtn'>Send</button>
        </form>
    </div>
)
}
;

export default ChatFooter;