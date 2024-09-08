import React, { useEffect, useRef } from "react"
import { useState } from "react"

import ChatCard from "./components/ChatCard"
import ChatUi from "./components/ChatUi"
import heyGif from './assets/hey.gif'

export default function App(){

  const clientId = localStorage.getItem("clientId")
  const [socketUrl, setSocketUrl] = useState(`ws://localhost:3000?clientId=${clientId}`)

  let socket= new WebSocket(socketUrl)

  socket.onopen = ()=>{
  }

  const id = useRef(1);

  socket.onmessage = (message)=>{
    console.log( `Message form serve - ${message.data}`)

    const {fromClientId, messageContent} = JSON.parse(message)


    chatList[fromClientId].prevChat.push({
      id:id.current,
      type: "get",
      message: message.data 
    })
    id.current = id.current+1;
  }



  const chatList = [{chatId:0,username: "Global",prevChat: []},
    {chatId:1,username: "mann", prevChat: [{id: 1,type:"get", message:"I'm server"}, {id:2, type: 'send', message: "Hey i'm client"}]},
    {chatId:2,username: "ayush", prevChat: []},
    {chatId:3,username: "niggu", prevChat: []}
  ]

  const [activeChat, setActiveChat] = useState() 

  const handleOpenChat = (prop)=>{
    localStorage.setItem("activeChat", prop)
    setActiveChat(prop)
    console.log(`now you chat with ${prop.username} and active chat is ----> ${activeChat}`)
  }


  useEffect(()=>{
    localStorage.removeItem("activeChat")
    localStorage.setItem("chatList", JSON.stringify(chatList) )
  },[])

  

  return(
    <div className="flex h-screen px-6 py-4 bg-gray-950">
      <div className="w-1/3 h-full bg-blue-950">
        <div className="flex flex-col w-full h-full">
          <h1 className="m-3 text-5xl font-bold text-lime-400">Chat</h1>
          <div className="flex items-center m-4">
            <span className="absolute  flx items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </span>

            <input type="text" className="w-full h-8 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search"/>
          </div>
          <button className="flex h-10 m-4 items-center">
            <div className="pb-1 pt-1 pr-2 pl-2 rounded-xl font-light text-gray-100 bg-gray-600 "> Add Chat</div>
          </button>
          <hr className=" border-blue-900"></hr>
          <div className="w-full h-full p-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-950">
            <ul>
              { chatList.map((chatWith)=>( <li key={chatWith.chatId} onClick={()=>handleOpenChat(chatWith)}><ChatCard prop={chatWith} /> <hr className=" border-blue-900"></hr></li>)) }
            </ul>
          </div>
          <div className=" h-24 bg-neutral-900"></div>
        </div>
      </div>
      <div className="w-2/3 h-full bg-gray-800">
        {!activeChat ? 
        <div className=" flex flex-col items-center justify-center h-full w-full">
          <h1 className=" text-4xl font-bold text-neutral-400">heloo,  
            <img src={heyGif} alt="hey-gif" className="inline-block w-26 h-20 mx-4 rounded-2xl"/>
          </h1>
          <h2 className="mt-2 text-neutral-600">Stay connected</h2>
        </div> : <ChatUi chatId={activeChat.chatId} socket={socket} /> }
      </div>
    </div >
  )
}
