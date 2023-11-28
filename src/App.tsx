import { useState } from "react";
import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";

interface ChatData {
  role: string;
  content: string;
}

const App = () => {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);
  const getQuery = async () => {
    try {
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
        }),
      };

      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );

      const data: ChatData = await response.json();
      const userMessage = {
        role: "user",
        content: value,
      };
      setChat((prevChat) => [...prevChat, data, userMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearChat = () => {
    setValue("");
    setChat([]);
  };

  const filteredUserMessages = chat.filter(
    (message) => message.role === "user"
  );

  const latestCode = chat
    .filter((message) => message.role === "assistant")
    .pop();

  return (
    <div className="app">
      <h1 className="title">SQL Query Generator</h1>
      <MessagesDisplay userMessages={filteredUserMessages} />
      <input
        value={value}
        type="text"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
      />
      <CodeDisplay code={latestCode?.content || ""} />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>
          Get Query!
        </button>
        <button id="clear-chat" onClick={clearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default App;
