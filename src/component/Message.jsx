// import React ,{useState,useEffect}from 'react';
// import "./Chat.css"
// import apiClient from './Api'
// function Message({ chatMessage = [] }) {
//   const [users, setUsers] = useState([]);
//   const sender = async () => {
//     try {
//       const response = await apiClient.get('/:id', {
//         withCredentials: true,
//       });
//       setUsers(response.data);
//       console.log(response)
  
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }

//   };
  
//   useEffect(() => {
//     sender();

//   }, []);
//   return (
//     <div className="message-container">
//       {chatMessage.map((msg, index) => (
//         <div key={index} className="message"
//         style={{ justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",}}
//         >
//           <div className="MyMsg flex justify-end" style={{ maxWidth: '500px' }}>
            
//           <div className="message-content"
//             style={{
//               backgroundColor: msg.sender === "me" ? "rgb(43, 108, 67)" : "rgb(240, 240, 240)",color: "black",padding: "10px",borderRadius: "10px",alignSelf: "flex-end",marginBottom: "10px",
//             }}>
//               <h5></h5>
//             <p className="text">{msg}</p>
//              <h6></h6>
//           </div>
//           <div className="message-meta">
//             {/* <span className="time">{formatTime(msg.timestamp)}</span> */}
//             {/* <span className="status">{msg.seen ? "Seen" : getDaysAgo(msg.timestamp)}</span> */}
//           </div>
//         </div>
//           </div>
//       ))}
//     </div>
//   );
// }

// export default Message;


// import React, { useState, useEffect } from 'react';
// import "./Chat.css";
// import apiClient from './Api';

// function Message({ chatMessage = [] }) {
//   const [users, setUsers] = useState([]);

//   // Fetching user data (optional if required for user display)
//   const fetchUsers = async () => {
//     try {
//       const response = await apiClient.get('/users', { withCredentials: true }); // Update the endpoint as needed
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   const sender = async () => {
//         try {
//           const response = await apiClient.get('/:id', {
//             withCredentials: true,
//           });
//           setUsers(response.data);
//           console.log(response)
      
//         } catch (error) {
//           console.error('Error fetching users:', error);
//         }
    
//       };
      
//       useEffect(() => {
//         sender();
    
//       }, []);

//   return (
//     <div className="message-container">
//       {chatMessage.map((msg, index) => (
//         <div
//           key={index}
//           className="message"
//           style={{
//             justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
//           }}
//         >
//           <div className="MyMsg flex justify-end" style={{ maxWidth: '500px' }}>
//             <div
//               className="message-content"
//               style={{
//                 backgroundColor: msg.sender === "me" ? "rgb(43, 108, 67)" : "rgb(240, 240, 240)",
//                 color: msg.sender === "me" ? "white" : "black",
//                 padding: "10px",
//                 borderRadius: "10px",
//                 marginBottom: "10px",
//               }}
//             >
//               <h5>{users.find(user => user.id === msg.sender)?.username || "me "}</h5>
//               {/* Render the actual message */}
//               <p className="text">{msg.message}</p>
//               <h6>{new Date(msg.timestamp).toLocaleString()}</h6>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Message;


import React, { useState, useEffect } from 'react';
import "./Chat.css";
import apiClient from './Api';

function Message({ chatMessage = [] }) {
  const [users, setUsers] = useState([]);

  // Fetching user data to map sender and receiver IDs to usernames
  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/users', { withCredentials: true }); // Update the endpoint as needed
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Helper function to get the username based on user ID
  const getUsername = (userId) => {
    if (!userId) return "Unknown User";
    const user = users.find((user) => user._id === userId); // Assuming user objects have an `_id` field
    return user?.username || "Unknown User";
  };

  return (
    <div className="message-container">
      {chatMessage.map((msg, index) => (
        <div
          key={index}
          className="message"
          style={{
            justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
          }}
        >
          <div className="MyMsg flex justify-end" style={{ maxWidth: '500px' }}>
            <div
              className="message-content"
              style={{
                backgroundColor: msg.sender === "me" ? "rgb(43, 108, 67)" : "rgb(240, 240, 240)",
                color: msg.sender === "me" ? "white" : "black",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <h5>
                {msg.sender === "me"
                  ? "You"
                  : getUsername(msg.sender)} {/* Display the sender's username */}
              </h5>
              <p className="text">{msg.message}</p>
              <h6>{new Date(msg.timestamp).toLocaleString()}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Message;
