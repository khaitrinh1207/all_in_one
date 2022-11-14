import React, {useEffect, useState} from "react";

const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, users]);

    return (
        <div className='chat_sideBar'>
            <h2>Open chat</h2>
            <div>
                <h4 className='chat_header'>ACTIVE USERS</h4>
                <div className='chat_users'>
                    {users.map((user) => (
                        <p key={user.socketID}>{user.userName}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatBar;