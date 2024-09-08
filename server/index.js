const express = require('express')
const WebSocketServer = require('websocket').server
const http = require('http');
const { URLSearchParams } = require('url');
const { v4: uuidv4 } = require('uuid');
const { client } = require('websocket');

const PORT = 3000
const app = express()
const httpServer= http.createServer(app)

const wss = new WebSocketServer({httpServer})

let connection = null;
let users = [];

wss.on("request", request=>{
  connection = request.accept(null, request.origin);
  console.log("Connection Opened!!!");

  const urlParams = new URLSearchParams(request.httpRequest.url.split('?')[1])
  const clientId = urlParams.get('clientId')
  users.push({
    "connection": connection,
    clientId: clientId
  })

  connection.on("close", ()=> console.log('Connection Closed!!!'))
  connection.on("message", message=>{

    const data = JSON.parse(message)
    const {toClientId, messageContent} = data 
    const recipientConnection = users.filter((user)=> user.clientId === toClientId)
    const recipientMessage = {
      "fromClientId": clientId,
      messageContent
    }

    recipientConnection.send(JSON.stringify(recipientMessage))

  })

  
  
})

httpServer.listen(PORT, ()=> console.log(`http server started at port ${PORT}`))