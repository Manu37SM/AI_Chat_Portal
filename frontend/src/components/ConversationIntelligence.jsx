import React, { useState } from 'react';
import { getConversation } from '../api';

export default function ConversationIntelligence({ conversationId }) {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleQuery = async () => {
        // Fetch conversation messages
        const res = await getConversation(conversationId);
        const messages = res.data.messages;

        // Simple intelligent query: search keywords in past conversation
        const matches = messages.filter(m => m.content.toLowerCase().includes(query.toLowerCase()));
        if (matches.length > 0) {
            setResponse(matches.map(m => `${m.sender}: ${m.content}`).join('\n\n'));
        } else {
            setResponse('No relevant messages found.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Conversation Intelligence</h2>
            <input
                type="text"
                placeholder="Ask about past conversation..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <button onClick={handleQuery} className="bg-blue-500 text-white p-2">Query</button>
            <div className="mt-4 border p-2 h-64 overflow-y-scroll whitespace-pre-wrap">{response}</div>
        </div>
    );
}