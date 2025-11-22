// import { InputBox } from "../components/input"

import { useEffect, useRef, useState } from "react";

interface Message {
  text: string;
  sender: "user" | "other";
  timestamp: number;
}

export default function ChatPage() {
  // Combined messages in chronological order
  const [messages, setMessages] = useState<Message[]>([
    { text: "hi there!", sender: "other", timestamp: Date.now() }
  ]);
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
//room id hardcoaded - joining room logic
    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(JSON.stringify({
        "type":"join",
        "payload":{
            "roomId":"red"
        }
      }))
    };

    ws.onmessage = (event) => {
      // Safely convert data to string and append to state
      setMessages((prev) => [
        ...prev,
        { text: String(event.data), sender: "other", timestamp: Date.now() }
      ]);
    };

    ws.onerror = (error) => {
        console.log("WebSocket error (expected if no server is running):", error);
    }
// ref mei ws ki value dali
    wsRef.current = ws;

    // Cleanup function to close socket when component unmounts
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      wsRef.current = null;
    };
  }, []);

  function handleSend() {
        const val = inputRef.current?.value?.trim();
        if (!val) return;

        // 1. Append to messages with "user" sender
        setMessages((prev) => [...prev, { text: val, sender: "user", timestamp: Date.now() }]);
        
        // 2. Send over WebSocket
//@ts-ignore
      wsRef.current.send(JSON.stringify({
        "type":"chat",
        "payload":{
            "message":val
        }
      }))
   

        // 3. Clear input
        if (inputRef.current) {
        inputRef.current.value = "";
        }
  }

  // Allow sending by pressing "Enter" key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="text-white overflow-x-hidden min-h-screen ">
      <div className="h-screen pb-3 w-full bg-[#00020d] flex flex-col gap-3">
        {/* Chat Area */}
        <div className="w-full p-3 flex-1 overflow-y-auto flex flex-col justify-between ">
          
          {/* All Messages in Chronological Order */}
          <div className="w-full flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={`msg-${idx}`}
                className={`text-indigo-50 max-w-[80%] p-2 rounded-md break-word ${
                  msg.sender === "user"
                    ? "self-end bg-blue-950"
                    : "self-start bg-sky-950"
                }`}
              >
                <span>{msg.text}</span>
              </div>
            ))}
          </div>

        {/* Input Area */}
        <div className="h-fit w-screen self-end flex items-center justify-center px-4 bg-[#00020d]">
          <div className="flex w-full max-w-4xl gap-3">
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              className="p-2 bg-gray-900 focus:outline-none flex-1 rounded-md focus:ring-2 focus:ring-cyan-800 focus:border-cyan-800 text-white"
              placeholder="Enter the message..."
              aria-label="message-input"
            />
            <button
              onClick={handleSend}
              className="bg-sky-950 hover:bg-sky-900 w-28 cursor-pointer p-2 rounded-md transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}