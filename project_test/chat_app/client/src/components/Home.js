import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Home = ({socket}) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        //gửi userName và socketId tới server
        socket.emit('newUser', {
            userName,
            socketID: socket.id
        })
        navigate('/chat');
    };
    return (
        <form className='home_container' onSubmit={handleSubmit}>
            <h2 className='header'>
                Sign in to Open Chat
            </h2>
            <label htmlFor="username">User Name</label>
            <input
                type="text"
                minLength={6}
                name='username'
                id='username'
                className='input'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button className='btn_signIn'>
                Sign In
            </button>
        </form>
    )
};

export default Home;