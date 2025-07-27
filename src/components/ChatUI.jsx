import React, { useRef, useEffect } from "react";

const ChatUI = ({ messages, isProcessing }) => {

    
    const chatRef = useRef(null);

    // Scroll to the bottom when messages change
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);



    return (
        <div className="p-4 overflow-y-auto flex flex-col " ref={chatRef} style={{ height: "550px" }}>
            {/* Render all messages */}
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`message ${msg.role === 'user' ? 'self-end' : 'self-start'} bg-bg-light2`}
                >
                    <div className="message-text">{msg.content}</div>
                    <div className="message-timestamp"></div>
                </div>
            ))}

            {/* Show typing indicator when processing */}
            {isProcessing && (
                <div className="typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            )}
        </div>
    );
};

export default ChatUI;
