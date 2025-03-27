import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, deleteMessages } from './chatSlice';
import { useState } from 'react';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const handleSendMessage = (message) => {
    if (!message) return;
    // לאחר שליחה, ניתן לאפס את השדה
    dispatch(addMessage(message));
    setMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>//????
        ))}
        <input type="text" placeholder='הקלד/י הודעה' value={message} 
        onChange={(e) => setMessage(e.target.value)} // עדכון מצב עם ערך ה-input
      />
      </ul>
      <button onClick={() => handleSendMessage(message)}>Send Message</button>
      {/* <button onClick={() => dispatch(deleteMessages())}>Clear Messages</button> */}
    </div>
  );
};

export default ChatComponent;







// const ChatComponent = () => {


//   const handleSendMessage = () => {
//     // כאן תוכל להשתמש בתוכן של message
//     console.log(message);
//     // לאחר שליחה, ניתן לאפס את השדה
//     setMessage('');
//   };

//   return (
//     <div>
//       <input 
//         type="text" 
//         placeholder='הקלד/י הודעה' 
//         value={message} 
//         onChange={(e) => setMessage(e.target.value)} // עדכון מצב עם ערך ה-input
//       />
//       <button onClick={handleSendMessage}>Send Message</button>
//     </div>
//   );
// };

// export default ChatComponent;
