import React from 'react';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold p-4">AI Chat Portal</h1>
      <ChatInterface conversationId={1} />
    </div>
  );
}

export default App;