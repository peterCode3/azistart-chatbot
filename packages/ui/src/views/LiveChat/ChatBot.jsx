import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../canvas/chatbot.css'

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initiateLiveChat, setInitiateLiveChat] = useState(false); // Define initiateLiveChat state variable
  const [whatsAppUrl, setWhatsAppUrl] = useState(''); // Define initiateLiveChat state variable

  useEffect(() => {
//     if (initiateLiveChat) {
   
//       const script = document.createElement("script");
//       script.src = "https://cdn.livechatinc.com/tracking.js";
//       script.async = true;
//       document.head.appendChild(script);

//       window.__lc = window.__lc || {};
//       window.__lc.license = 17898495;
//       (function(n, t, c) {
//         function i(n) {
//           return e._h ? e._h.apply(null, n) : e._q.push(n)
//         }
//         var e = {
//           _q: [],
//           _h: null,
//           _v: "2.0",
//           on: function() {
//             i(["on", c.call(arguments)])
//           },
//           once: function() {
//             i(["once", c.call(arguments)])
//           },
//           off: function() {
//             i(["off", c.call(arguments)])
//           },
//           get: function() {
//             if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
//             return i(["get", c.call(arguments)])
//           },
//           call: function() {
//             i(["call", c.call(arguments)])
//           },
//           init: function() {
//             var n = t.createElement("script");
//             n.async = !0, n.type = "text/javascript", n.src = "https://cdn.livechatinc.com/tracking.js", t.head.appendChild(n)
//           }
//         };
//         !n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e
//       })(window, document, [].slice);

//       //clicking the js button automatically

//       //new
//       // Define the function to check and click the button

// // Set an interval to check for the button every 500 milliseconds
// // const checkButtonInterval = setInterval(clickButtonWhenAvailable, 500);

//       // Define the observer function to check and click the button
//       const observer = new MutationObserver((mutationsList, observer) => {
//         for (let mutation of mutationsList) {
//           if (mutation.type === 'childList') {
//             const chatWidgetContainer = document.getElementById('chat-widget-container');
//             if (chatWidgetContainer) {
//               const iframe = chatWidgetContainer.querySelector('iframe#chat-widget-minimized');
//               if (iframe) {
//                 iframe.onload = () => {
//                   try {
//                     const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
//                     const button = iframeDocument.querySelector('button[data-lc-id="2"]');
//                     if (button) {
//                       button.click();
//                       document.querySelectorAll('.chatbot-container').forEach(element => {
//                         element.style.display = 'none';
//                       });
//                       observer.disconnect();
//                     }
//                   } catch (e) {
//                     console.error('Error accessing iframe content:', e);
//                   }
//                 };
//                 // Trigger the iframe load if it is already loaded
//                 if (iframe.contentDocument.readyState === 'complete') {
//                   iframe.onload();
//                 }
//               }
//             }
//           }
//         }
//       });

// // Start observing the document body for added nodes
// observer.observe(document.body, { childList: true, subtree: true });

//     }
//   }, [initiateLiveChat]);


  if (initiateLiveChat) {
    window.open(whatsAppUrl, '_blank');
  }
}, [initiateLiveChat]);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:3005/chat`, { message: input });
      const { response: chatbotResponse, initiateLiveChat,whatsappUrl } = response.data; // Access chatbot response and initiateLiveChat property
      
      if (initiateLiveChat) {
        // Hide the chatbot input and messages container
        setInitiateLiveChat(true);
        setWhatsAppUrl(whatsappUrl)
        
      } else {
        // Show chatbot response
        setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);
        setTimeout(() => {
          setLoading(false);
          setMessages(prevMessages => [...prevMessages, { text: chatbotResponse, sender: 'bot' }]);
        }, 1000); // Adjust delay time as needed
      }
    } catch (error) {
      setLoading(false);
      console.error('Error sending message:', error);
    }
  
    setInput('');
  };
  
  return (
    <div className="chatbot-container">
    <div className="chatbot-header"> </div>
      <div className="chatbot-wrapper">
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender} p-2 rounded-lg mb-2 ${msg.sender === 'bot' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </div>
          ))}
         {loading && (
  <div className="message bot p-2 rounded-lg mb-2 bg-gray-200 text-gray-800">
    <span>{initiateLiveChat ? 'Initiated WhatsApp Live chat.' : 'Loading...'}</span>
    <span className="dot1">.</span>
    <span className="dot2">.</span>
    <span className="dot3">.</span>
  </div>
)}
        </div>
      
          <div className="chatbot-input mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="mb-4 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2 focus:outline-none">Send</button>
          </div>
       
      </div>
    </div>
  );
}  

export default Chatbot;
