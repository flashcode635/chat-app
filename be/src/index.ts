import express  from "express";

const app = express()

app.post("./roomlogin",(req,res)=>{
    
})
import  { WebSocketServer, type WebSocket } from "ws";
interface User{
    socket:WebSocket,
    room: string 
}

const allSockets:User[]= [];
if (!allSockets) {
   console.error("not found allsockets")
}
const wss = new WebSocketServer({port: 8080});
console.log("server made");
// user has to disconnecct to socket server, and connect again to join new room
wss.on("connection",(socket)=>{
    console.log("server running");
    socket.on("message",(message:string)=>{
        const parseMessage = JSON.parse(message);
        //    what we send:-

        //       {
        //              "type":"join",   
        //              "payload": {
        //                      "roomId":"red"
        //                  }
        //       }

        if (parseMessage.type=="join") {
            console.log(`joined room : ${parseMessage.payload.roomId}`)
            allSockets.push({
                socket: socket,
                room: parseMessage.payload.roomId
            })
        }
         //       {
        //              "type":"chat",   
        //              "payload": {
        //                      "message":"red"
        //                  }
        //       }
        else if(parseMessage.type=="chat"){
            console.log("user wants to chat")
            const currentRoom= allSockets.find((x)=>x.socket==socket)?.room
            if (!currentRoom) {
                console.error("not found")
            }
       
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i]?.room==currentRoom) {
                    allSockets[i]?.socket.send(parseMessage.payload.message)
                }
                
            }
        }
        
    })
})
