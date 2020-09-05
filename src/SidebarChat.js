import React, { Component, useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from "@material-ui/core";
import db from './Firebase';
import { Link  } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    useEffect(() => {
    if (id) {
    db.collection('rooms')
    .doc(id)
    .collection('messages')
    .orderBy('timestamp', 'desc').
    onSnapshot((snapshot) =>
    setMessages(snapshot.docs.map((doc) =>
    doc.data())
        ))
      }
    }, [id ])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            // Creating a new chat room  in database
            // Add function is used to  add new room to the  map array of rooms.
            db.collection("rooms").add({
                name: roomName
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p> {messages[0]?.message } </p>
                </div>
            </div>
        </Link>
    ) : (
            <div onClick={createChat}
                className="sidebarChat">
                <h2>Add new Chat</h2>
            </div>
        );
}

export default SidebarChat;