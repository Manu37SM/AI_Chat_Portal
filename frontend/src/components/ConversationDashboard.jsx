import React, { useEffect, useState } from 'react';
import { getConversations } from '../api';

export default function ConversationDashboard({ onSelect }) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        const res = await getConversations();
        setConversations(res.data);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">All Conversations</h2>
            <input
                type="text"
                placeholder="Search..."
                className="border p-2 mb-2 w-full"
                onChange={(e) => {
                    const search = e.target.value.toLowerCase();
                    setConversations(res.data.filter(c => c.title.toLowerCase().includes(search)));
                }}
            />
            <ul>
                {conversations.map((conv) => (
                    <li
                        key={conv.id}
                        className="border p-2 my-1 cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelect(conv.id)}
                    >
                        <b>{conv.title}</b> - {new Date(conv.start_time).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}