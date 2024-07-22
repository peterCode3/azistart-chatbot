// pages/index.js
import Chatbot from './ChatBot';
import { useState } from 'react';
import './live-chat.css'
import { MdChat } from 'react-icons/md'; 

export default function Home() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(true)
  }

  return (
    <div id='chatbote'>
        <h1>Welcome to Live Chat</h1>
        <button className='chatbotToggle' onClick={toggleChatbot}>
          <MdChat className='chatIcon' />
        </button>
        {chatbotOpen && (
          <div className='chatbotContainer'>
            <Chatbot />
          </div>
        )}
    </div>
     
  );
}