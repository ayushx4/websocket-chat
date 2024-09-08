import { useEffect, useState, useRef } from "react";

export default function ChatUi({ chatId, socket}){

  const scrollRef = useRef(null)
  const [chat, setChat] = useState()
  const [textMessage, setTextMessage] = useState("");

  const handleSendMsg = ()=>{
    console.log(`you just click send button`);
    const message  = {
      "fromClientId": localStorage.getItem("clientId"),
      "messageContent": textMessage
    }
    
    if(socket.readyState === WebSocket.OPEN){
      socket.send(JSON(message))
    }
  }

  function scrollToBottom (){
    const scroll = scrollRef.current
    scroll.scrollTop = scroll.scrollHeight
  }

  useEffect(()=>{
    scrollToBottom()
    const chatList = JSON.parse(localStorage.getItem("chatList")) 
    const chatWith = chatList[chatId] 
    setChat(chatWith)

  },[])

  return(
    <div className="flex flex-col w-full h-full bg-gray-800">
      <div className="py-8  h-14 flex flex-row items-center bg-neutral-900">
        <div className=" h-12 w-12 mr-2 ml-2 rounded-full bg-gray-500 "></div> 
        <div className="">
          {!chat ? <p className=" text-gray-100">Loading....</p> : <p className=" text-gray-100">{chat.username}</p>}
          <p className="text-gray-400">last seen</p>
        </div>
      </div>
      <div ref={scrollRef} className=" h-full w-full px-10 overflow-y-scroll  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-950">
        <div className="flex flex-col justify-end h-[400vh] w-full">
          {/* {chat.prevChat.map((chat)=>{
            return <div key={chat.id} className={ `mb-2 p-2 rounded-md text-neutral-50 bg-neutral-600 ${chat.type === "get" ? "self-start " : "self-end"}` }>{chat.message}</div>
          })} */}
        </div>
      </div>
      <div className="flex items-center justify-center h-20 w-full px-5 py-4 bg-neutral-900">

        <span className=""><svg height="24" width="24" ><path fill="gray" d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"></path></svg></span>

        <div className="w-full h-10 mx-6 rounded-lg ">
          <input 
          value={textMessage}
          onChange={(e)=> setTextMessage(e.target.value)}
          className="w-full h-full px-2 rounded-md outline-none font-thin text-gray-100 bg-neutral-800"></input>
        </div>

        <button onClick={handleSendMsg}>
          <span><svg height="24" width="24"><path fill="gray" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg></span>
        </button>
      </div>

    </div>
  )

}