import React, { useState, useEffect } from 'react';
import { getConversation, addMessage, endConversation } from '../api';

export default function ChatInterface({conversationId}) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => { fetchConversation(); }, [conversationId]);

    const fetchConversation = async () => {
        const res = await getConversation(conversationId);
        setMessages(res.data.messages);
    };

    const handleSend = async () => {
        const res = await addMessage(conversationId, input);
        setMessages([...messages, {sender:'user',content:input},{sender:'ai',content:res.data.ai_response}]);
        setInput("");
    };

    const handleEnd = async () => {
        const res = await endConversation(conversationId);
        alert("Summary: " + res.data.summary);
        fetchConversation();
    };

    return (
        <div className="p-4">
            <div className="border p-4 h-96 overflow-y-scroll mb-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${msg.sender==='ai'?'text-blue-600':'text-black'} my-1`}>
                        <b>{msg.sender}:</b> {msg.content}
                    </div>
                ))}
            </div>
            <input className="border p-2 w-4/5" value={input} onChange={e=>setInput(e.target.value)} />
            <button className="bg-blue-500 text-white p-2 ml-2" onClick={handleSend}>Send</button>
            <button className="bg-red-500 text-white p-2 ml-2" onClick={handleEnd}>End</button>
        </div>
    );
}