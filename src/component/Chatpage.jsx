
import React,{ useEffect,useState }  from 'react'
import Header from "./Header"
import Message from './Message'
import ChatInput from './InputSec'
import { useSocket } from './SocketContext'
import apiclient from './Api'
import { useParams } from 'react-router'
import { jwtDecode } from "jwt-decode";

function Chatpage() {
  const {id}= useParams();
  // console.log(id,'chatpage')
 const socket  = useSocket()
 const [messages, setMessages] = useState([]);
 const [chatMessage,setChatMessages] = useState([])
 console.log(chatMessage,"chatMessage")
 const [user, setUser]=useState([])
const [loggedInUserId, setLoggedInUserId]= useState([])
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
const fetchUserId = async () => {
  try {
    const accessToken = getCookie('accesstoken');
    if (!accessToken) {
      console.error('Access token not found');
      return;
    }

    const decodedToken = jwtDecode(accessToken);
    const userId = decodedToken.user_id;
    setLoggedInUserId(userId);
    // console.log('Logged-in User ID:', userId);

    const response = await apiclient.get(`/users/${userId}`, { withCredentials: true });
    setUser(response.data);
    // console.log(response.data, 'Fetched user data');
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


useEffect(() => {
  fetchUserId();
}, []);


const fetchMessages = async () => {
  if (!loggedInUserId || !id) return; // Ensure both sender and receiver IDs are available
   console.log(loggedInUserId,'loggedInUserId')
  try {
    const response = await apiclient.get(`/messages/${loggedInUserId}/${id}`, {
      withCredentials: true,
    });
    setChatMessages(response.data);

  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

useEffect(() => {
  fetchMessages(); // Fetch messages when Chatpage mounts or id changes
}, [loggedInUserId, id]);


 useEffect(() => {
  console.log("coming socket changes here")

    if(!socket) return;
console.log("hh")
    socket.on("message",(data)=>{
      console.log({data});
      setChatMessages((prev) =>[...prev,data])
      console.log(setChatMessages,"data")
    })
    console.log('coming after this')
    return()=>{
      socket.off("message")
    }
 }, [socket])

 const handleMsg = ()=>{
  if(socket) {
    const data={
      sender: loggedInUserId,
      message:messages,
      receiver:id,
      
    }

      socket.emit("message",data, function(confirmation){
        // send data
        // know we got it once the server calls this callback      
        // note -in this ex we dont need to send back any data 
        // - could just have called fn() at server side
        console.log(confirmation);
  });
  
    setMessages("")
  }
 }


 
  return (
    <div>
      <Header messages={messages} setMessages={setMessages} setChatMessages={setChatMessages} chatMessage={chatMessage}/>
      <Message messages={messages} setMessages={setMessages} setChatMessages={setChatMessages} chatMessage={chatMessage}/>
      <ChatInput handleMsg={handleMsg} messages={messages} setMessages={setMessages} setChatMessages={setChatMessages} chatMessage={chatMessage}/> 

    </div>
  )
}

export default Chatpage

