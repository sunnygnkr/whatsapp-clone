import React , { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import './Chat.css';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SidebarChat from './SidebarChat';
import { useParams } from "react-router-dom";
import db from './Firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

const Chat = () => {
const [input, setInput] = useState("");
const [seed, setSeed] = useState("");
const  { roomId } = useParams();
const [roomName, setRoomName]= useState("");
const [messages, setMessages]= useState([]);//Here the 
// "[]" empty array is initial state.
const [{ user }, dispatch]= useStateValue();

useEffect(() => {
if (roomId) {
    db.collection('rooms').
    doc(roomId)
    .onSnapshot((snapShot) => setRoomName
     (snapShot.data().name));

     db.collection('rooms')
     .doc(roomId)
     .collection("messages")
     .orderBy('timestamp','asc')
     .onSnapshot(snapshot=>
         setMessages(snapshot.docs.map(doc => 
            doc.data()))
     )
  }
}, [roomId]);
// So above the second argument in array i.e, roomId we
// have to provide if  we want to use that variable    // within our function block.

useEffect( () => {
setSeed(Math.floor(Math.random() * 5000));
}, [roomId]);

const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed ", input)

    db.collection("rooms").doc(roomId).collection
    ("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
 
    setInput("");
}

    return (
        <div className="chat">

            <div className= "chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            
            <div className="chat_headerInfo">
             <h3> {roomName} </h3>
    <p>  
        Last seen {""}
        {new Date(
            messages[messages.length-1]?.
            timestamp?.toDate())
            .toUTCString()}
    </p>
             </div>

             <div className= "chat_headerButtons">
              <IconButton>
               <SearchOutlined />
              </IconButton>
              <IconButton>
               <AttachFile />
              </IconButton>
              <IconButton>
               <MoreVert />
              </IconButton>
             </div>

            </div>
            
            <div className= "chat_body">
                {messages.map(message => (
                <p  
                className={`chat_message ${
                message.name  === user.displayName && "chat_reciever"     
                }`}>
                <span className="chat_Name">
                {message.name}
                </span>
                {message.message}
                <span className="chat_timeStamp">
                   Last seen {""}
                   {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
              </p>
                ))}
              
            </div>

            <div className= "chat_footer">
                  <InsertEmoticon />
                <form>
                 <input value={input} onChange={f =>
                 setInput(f.target.value)}
                 placeholder="Type a message" 
                 type ="text" />
                  <button onClick={sendMessage}
                  type="submit"> Send message </button>
                </form>
                  <MicIcon />
            </div>
        </div>
    );
};

export default Chat;