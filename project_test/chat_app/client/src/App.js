import React from 'react';
import socketIO from 'socket.io-client';
import Home from "./components/Home";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ChatPage from "./components/chat/ChatPage";

// kết nối client tới server backend
const socket = socketIO.connect('http://10.1.40.47:4000');

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Home socket={socket}/>}/>
                    <Route path="/chat" element={<ChatPage socket={socket}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
