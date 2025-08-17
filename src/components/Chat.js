import React, { useEffect } from 'react';
import Chatt from "../features/Chat";
import axios from 'axios';

const Chat = () => {

useEffect(()=>{
  axios.get("http://localhost:3000/chat/getAll").then(res=>{
    console.log(res);
  }).catch(e=>{
    alert("שגיאת שרת");
    console.log(e);
    
  })
},[])


  return (
    <div>
      <h1>Chat</h1>
      <Chatt/>
    </div>
  );
};

export default Chat;