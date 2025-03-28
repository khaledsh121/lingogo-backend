import { useState, useRef, useEffect } from "react";
import "../Chat/Chat.css";
import PagesList from "../PagesList/PagesList";
import { Send } from "../../AssetsFolder/Images";

const Chat = () => {
  const [messages, setMessages] = useState([
    { message: "Hello!", response: "Hi there!", key: 1 },
    {
      message: "How are you?",
      response: "I'm doing great! How about you?",
      key: 2,
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (userMessage.trim() === "") return; // Prevent empty messages

    setMessages([
      ...messages,
      { message: userMessage, response: "res", key: Math.random() },
    ]);
    setUserMessage(""); // Clear input field

    inputRef.current?.focus(); // Keep focus on the input field
  };

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // Create a ref for the input

  useEffect(() => {
    // Auto-scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <PagesList active={4} />
      <div className="messages-container">
        <div>
          {messages.map((item) => {
            return (
              <div key={item.key}>
                <div className="message">
                  <div>{item.message}</div>
                </div>
                <div className="response">
                  <div>{item.response}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={messagesEndRef} />
        <div className="message-input-container">
          <input
            ref={inputRef}
            type="text"
            className="message-input"
            placeholder="Write a Message ..."
            value={userMessage}
            onChange={handleInputChange}
          />
          <img
            src={Send}
            alt="send"
            className="send"
            onClick={handleSendClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
