import React, { useRef } from 'react'
import { io} from 'socket.io-client'
import './styles.css'
import { getDataFromLocalStorage } from '../../../utils/LocalStorage'
import { getUserChats } from '../../../services/Chat/chat'
import Conversation from '../../../components/ui/Conversation/Conversation'
import ChatBox from '../../../components/ui/ChatBox/ChatBox'
import API_URL from '../../../config/config'

const Chat = () => {

  const [chats,setChats] = React.useState([])
  const [currentChat,setCurrentChat] = React.useState(null)
  const [onlineUsers,SetOnlineUsers] = React.useState([])
  const [sendMessage,setSendMessage] = React.useState(null)
  const [receiveMessage,setReceivedMessage] = React.useState(null)
  const socket = useRef()

  // userID is the id of currently logged in user
  const userId = getDataFromLocalStorage('userID')
  
  // Sending Message to the socket server
  React.useEffect(()=>{
    if(sendMessage !== null){
      socket.current.emit('send-message',sendMessage)
    }
  },[sendMessage])

  
  
  // Connecting to socket.io server and setting online users
  React.useEffect(()=>{
    socket.current = io(API_URL)
    socket.current.emit("new-user-add",userId)
    socket.current.on('get-users',(users)=>{
      SetOnlineUsers(users)
    })
  },[userId])

  // Receiving Message to the socket server
  React.useEffect(()=>{
      socket.current.on('receive-message',(data)=>{
        setReceivedMessage(data)
      })
  },[])

  // Retrieve all chats
  const getChats = async()=>{
    try{
      const res = await getUserChats(userId)
      res.reverse()  // latest chat will be at the top
      setChats(res)
      console.log("Chats",res)
    }catch(e){
      console.log(e)
    }
  }

  React.useEffect(()=>{
    getChats()
  },[])

  const checkOnlineStatus = (chat) =>{
    const chatMember = chat.members.find((member)=> member !== userId)
    const online = onlineUsers.find((user)=>user.userId === chatMember)
    return online ? true : false
  }


  return (
    <div className="Chat  ">
      {/* Left Menu */}
      <div className="Left-side-chat shadow-lg   ">
      <div className="Chat-container   ">
        <h2 className='p-3 text-sm sm:text-lg  font-semibold text-gray-700'>Chats</h2>
        <div className="Chat-list  w-full    ">
          {
            chats.map((ind_chat)=>{
              return(
                <div key={ind_chat._id} onClick={()=> setCurrentChat(ind_chat)}>
                  <Conversation data={ind_chat} currentUser={userId} online={checkOnlineStatus(ind_chat)}/>
                </div>
              )
            })
          }
        </div>
        </div>
      </div>

      {/* Right Side Menu */}
      <div className="Right-side-chat ">
        <ChatBox chat={currentChat} currentUser={userId} setSendMessage={setSendMessage} receivedMessage={receiveMessage}/>
      </div>
    </div>
  )
}


export default Chat;