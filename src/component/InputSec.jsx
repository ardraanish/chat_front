
import React,{useState} from 'react';
import { FaSmile } from 'react-icons/fa'; 
import { AiOutlinePaperClip } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi'; 
import './Chat.css';

function ChatInput({ messages, setMessages, handleMsg }) {
  const[loggedInUser,setLoggedInUser]=useState()
  return (
    <div className="chat-input-container">
      <div className="input-wrapper">
        <button className="icon-btn">
          <FaSmile size={24} style={{ cursor: 'pointer' }} color="white" />
        </button>
        <button className="icon-btn">
          <AiOutlinePaperClip size={24} style={{ cursor: 'pointer' }} color="white" />
        </button>
        <div className="input-box">
          <input
            className="input-field"
            type="text"
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            placeholder="Type a message..."
          />
        </div>
        <button className="icon-btn" onClick={handleMsg}>
          <FiSend size={24} style={{ cursor: 'pointer' }} color="white" />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
