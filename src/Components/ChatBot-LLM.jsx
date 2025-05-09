import React, { useState, useRef, useEffect } from 'react';

const EnhancedChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [customColor, setCustomColor] = useState('#2e8b57');
  const [attachments, setAttachments] = useState([]);
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Example questions the user can select
  const exampleQuestions = [
    "How do I sell my license?",
    "What services do you offer?",
    "How much does it cost?",
    "How long does the process take?",
    "Do you handle international transfers?",
    "Is there a money-back guarantee?"
  ];

  // Get API key from environment variables
  const GEMINI_API_KEY = "AIzaSyCCfqB_AXX87EgcJzOLhgp5CK5LpHYfTcA"; // Better to use environment variable

  // System prompt to give context to the AI
  const systemPrompt = `
    You are a helpful customer service representative for SoftSell, a company that helps people sell their professional software licenses. 
    Your company offers services for license valuation, buyer matching, paperwork handling and legal support.
    
    Be concise, friendly, and helpful. If you don't know the answer to a specific question, 
    suggest that the user fill out the contact form to speak with a human representative.
    
    Keep responses brief and to the point - around 2-3 sentences maximum.
  `;

  // Function to call Gemini API
  const getGeminiResponse = async (userMessage) => {
    setIsTyping(true);
    
    try {
      // Format conversation history for Gemini
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      
      // Add system prompt as the first assistant message if there isn't one already
      if (conversationHistory.length === 0 || conversationHistory[0].role !== 'model') {
        conversationHistory.unshift({
          role: 'model',
          parts: [{ text: systemPrompt }]
        });
      }
      
      // Add user's current message
      conversationHistory.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });
      
      const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
      
      if (!GEMINI_API_KEY) {
        console.warn("Gemini API key not found, falling back to mock responses");
        throw new Error("API key not configured");
      }
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150,
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract text from the response
      const aiMessage = data.candidates[0].content.parts[0].text.trim();
      
      return aiMessage;
    } catch (error) {
      console.error('Error calling Gemini:', error);
      // Fall back to mock response
      return getMockResponse(userMessage);
    } finally {
      setIsTyping(false);
    }
  };

  // Fallback to mock responses if API fails or is not configured
  const getMockResponse = async (question) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerCaseQuestion = question.toLowerCase();
    
    if (lowerCaseQuestion.includes('sell my license')) {
      return "To sell your license, fill out our contact form and our team will reach out within 24 hours to guide you through our streamlined process.";
    } else if (lowerCaseQuestion.includes('services')) {
      return "We offer license valuation, buyer matching, paperwork handling, and full legal support throughout the transaction.";
    } else if (lowerCaseQuestion.includes('cost')) {
      return "We operate on a success-based commission model (5-10% depending on license value). You only pay when your license sells successfully.";
    } else if (lowerCaseQuestion.includes('how long')) {
      return "The typical process takes 4-6 weeks from listing to completion, though this can vary based on license type and market conditions.";
    } else if (lowerCaseQuestion.includes('international')) {
      return "Yes, we handle international license transfers across most jurisdictions. Our legal team has experience with cross-border transactions and can navigate different regulatory requirements.";
    } else if (lowerCaseQuestion.includes('guarantee') || lowerCaseQuestion.includes('refund')) {
      return "If we can't sell your license within 90 days, we offer a full refund of any upfront fees. Our success rate is over 94%, so this rarely happens.";
    } else {
      return "For specific details about your situation, I recommend speaking with our team through the contact form. They're experts in license transfers and can provide personalized assistance.";
    }
  };

  // Function to handle sending a new message
  const handleSendMessage = async (text) => {
    if (!text.trim() && attachments.length === 0) return;
    
    // Prepare message text
    let messageText = text.trim();
    
    // Add information about attachments if any
    if (attachments.length > 0) {
      const attachmentText = attachments.map(a => `[File: ${a.name}]`).join(", ");
      messageText = messageText ? `${messageText} ${attachmentText}` : attachmentText;
    }
    
    // Add user message
    const userMessage = { 
      sender: 'user', 
      text: messageText,
      attachments: [...attachments] 
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setAttachments([]);
    
    // Get and add AI response
    setIsTyping(true);
    let aiResponse;
    
    try {
      aiResponse = await getGeminiResponse(messageText);
    } catch (error) {
      console.error('Error with response, falling back to mock:', error);
      aiResponse = await getMockResponse(messageText);
    }
    
    const aiMessage = { sender: 'ai', text: aiResponse };
    setMessages(prevMessages => [...prevMessages, aiMessage]);
    setIsTyping(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  // Handle clicking an example question
  const handleExampleClick = (question) => {
    handleSendMessage(question);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      // In a real app, you might want to read the file and generate preview
      url: URL.createObjectURL(file)
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  // Remove attachment
  const removeAttachment = (index) => {
    setAttachments(current => current.filter((_, i) => i !== index));
  };

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        sender: 'ai',
        text: "Hello! 👋 How can I help you today with your license transfer needs? Feel free to ask about our services, pricing, or process."
      }]);
    }
  }, []);

  // Clear chat history
  const clearChat = () => {
    setMessages([{
      sender: 'ai',
      text: "Chat history has been cleared. How can I help you today?"
    }]);
    setShowSettings(false);
  };

  // Toggle chat window state: open, minimized, closed
  const toggleChatState = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else if (!isMinimized) {
      setIsMinimized(true);
    } else {
      setIsOpen(false);
      setIsMinimized(false);
    }
  };

  // Calculate dynamic chat styles based on settings
  const getChatTheme = () => {
    const baseTheme = {
      primaryColor: customColor,
      chatBg: darkMode ? '#222' : '#f8f9fa',
      textColor: darkMode ? '#fff' : '#212529',
      inputBg: darkMode ? '#333' : '#fff',
      cardBg: darkMode ? '#333' : '#fff',
      fontSize: fontSize === 'small' ? '0.875rem' : fontSize === 'large' ? '1.125rem' : '1rem',
    };
    
    return baseTheme;
  };
  
  const theme = getChatTheme();

  // Add required CSS for the chat widget
  useEffect(() => {
    // Add custom CSS styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes typingAnimation {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
        30% { transform: translateY(-5px); opacity: 1; }
      }
      
      .typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${darkMode ? '#aaa' : '#adb5bd'};
        margin: 0 2px;
        display: inline-block;
        animation: typingAnimation 1.5s infinite ease-in-out;
      }
      
      .chat-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        background-color: ${theme.primaryColor};
        color: white;
        border: none;
        transition: transform 0.3s ease, background-color 0.3s ease;
      }
      
      .chat-button:hover {
        transform: scale(1.05);
      }
      
      .chat-window {
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 380px;
        height: 450px;
        max-height: 80vh;
        box-shadow: 0 5px 30px rgba(0, 0, 0, ${darkMode ? '0.3' : '0.15'});
        display: flex;
        flex-direction: column;
        z-index: 999;
        overflow: hidden;
        border-radius: 12px;
        transition: all 0.3s ease;
        background-color: ${theme.chatBg};
      }
      
      .chat-window.minimized {
        height: 60px;
        bottom: 40px;
        right: 100px;
        width: 280px;
      }
      
      .chat-messages {
        flex-grow: 1;
        overflow-y: auto;
        padding: 1rem;
        scrollbar-width: thin;
        scrollbar-color: ${darkMode ? '#666 #333' : '#ccc #f1f1f1'};
      }
      
      .chat-messages::-webkit-scrollbar {
        width: 6px;
      }
      
      .chat-messages::-webkit-scrollbar-track {
        background: ${darkMode ? '#333' : '#f1f1f1'};
      }
      
      .chat-messages::-webkit-scrollbar-thumb {
        background-color: ${darkMode ? '#666' : '#ccc'};
        border-radius: 6px;
      }
      
      .primary-color {
        background-color: ${theme.primaryColor} !important;
      }
      
      .primary-text {
        color: ${theme.primaryColor} !important;
      }
      
      .primary-border {
        border-color: ${theme.primaryColor} !important;
      }
      
      .btn-outline-primary {
        border-color: ${theme.primaryColor} !important;
        color: ${theme.primaryColor} !important;
      }
      
      .btn-outline-primary:hover {
        background-color: ${theme.primaryColor} !important;
        color: white !important;
      }
      
      .attachment-pill {
        background-color: ${darkMode ? '#444' : '#e9ecef'};
        color: ${darkMode ? '#ddd' : '#495057'};
        border-radius: 16px;
        padding: 4px 12px;
        margin-right: 8px;
        margin-bottom: 8px;
        display: inline-flex;
        align-items: center;
        font-size: 0.85rem;
      }
      
      .attachment-pill .remove-attachment {
        margin-left: 6px;
        cursor: pointer;
        opacity: 0.7;
      }
      
      .attachment-pill .remove-attachment:hover {
        opacity: 1;
      }
      
      .message-bubble {
        max-width: 75%;
        padding: 10px 14px;
        border-radius: 18px;
        position: relative;
        transition: all 0.2s ease;
        font-size: ${theme.fontSize};
      }
      
      .message-bubble:hover {
        transform: translateY(-2px);
      }
      
      .user-bubble {
        background-color: ${theme.primaryColor};
        color: white;
        border-bottom-right-radius: 4px;
      }
      
      .ai-bubble {
        background-color: ${darkMode ? '#444' : '#fff'};
        color: ${theme.textColor};
        border-bottom-left-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,${darkMode ? '0.2' : '0.08'});
      }
      
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
      }
      
      .settings-menu {
        position: absolute;
        right: 20px;
        top: 70px;
        background-color: ${theme.cardBg};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,${darkMode ? '0.4' : '0.15'});
        width: 250px;
        z-index: 1001;
        padding: 1rem;
        color: ${theme.textColor};
      }
      
      @media (max-width: 576px) {
        .chat-window {
          right: 10px;
          left: 10px;
          width: calc(100% - 20px);
          bottom: 80px;
        }
        
        .chat-button {
          right: 20px;
          bottom: 20px;
          width: 50px;
          height: 50px;
        }
        
        .chat-window.minimized {
          width: calc(100% - 85px);
          right: 80px;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [darkMode, theme]);

  return (
    <>
      {/* Chat button */}
      <div 
        className="chat-button"
        onClick={toggleChatState}
        style={{ backgroundColor: theme.primaryColor }}
      >
        <i className={`bi ${!isOpen ? 'bi-chat-fill' : isMinimized ? 'bi-arrows-angle-expand' : 'bi-dash-lg'} fs-4`}>#</i>
      </div>
      
      {/* Chat window */}
      {isOpen && (
        <div 
          className={`chat-window ${isMinimized ? 'minimized' : ''} `}
          style={{ backgroundColor: theme.chatBg }}
        >
          {/* Chat Header */}
          <div 
            className="d-flex justify-content-between align-items-center p-3 text-white rounded-top primary-color"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <div className="d-flex align-items-center">
              <div className="bg-white bg-opacity-25 rounded-circle p-2 d-flex justify-content-center align-items-center">
                <i className="bi bi-headset text-white"></i>
              </div>
              <div className="ms-2 mb-2">
                <h5 className="mb-0">SoftSell Assistant</h5>
                <small className="opacity-75">Online now</small>
              </div>
            </div>
            <div className="d-flex">
              {!isMinimized && (
                <button 
                  className="btn btn-sm text-white me-2" 
                  onClick={() => setShowSettings(!showSettings)}
                  aria-label="Settings"
                >
                  <i className="bi bi-gear-fill"></i>
                </button>
              )}
              <button 
                className="btn btn-sm text-white" 
                onClick={toggleChatState}
                aria-label={isMinimized ? "Expand" : "Minimize"}
              >
                <i className={`bi ${isMinimized ? 'bi-arrows-angle-expand' : 'bi-dash'}`}></i>
              </button>
            </div>
          </div>
          
          {/* Settings Menu */}
          {showSettings && !isMinimized && (
            <div className="settings-menu">
              <h6 className="mb-3 d-flex align-items-center">
                <i className="bi bi-gear me-2"></i> Settings
              </h6>
              
              <div className="mb-3">
                <label className="form-label small mb-1">Theme</label>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    id="darkModeSwitch"
                  />
                  <label className="form-check-label" htmlFor="darkModeSwitch">
                    {darkMode ? 'Dark mode' : 'Light mode'}
                  </label>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label small mb-1">Font Size</label>
                <select 
                  className="form-select form-select-sm"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  style={{ backgroundColor: theme.inputBg, color: theme.textColor }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label small mb-1">Chat Color</label>
                <input 
                  type="color" 
                  className="form-control form-control-sm" 
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                />
              </div>
              
              <button 
                className="btn btn-sm w-100 mt-2" 
                onClick={clearChat}
                style={{ backgroundColor: theme.primaryColor, color: 'white' }}
              >
                <i className="bi bi-trash me-2"></i>
                Clear Chat History
              </button>
            </div>
          )}
          
          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div 
                className="chat-messages"
                style={{ backgroundColor: theme.chatBg }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : ''}`}
                  >
                    {msg.sender === 'ai' && (
                      <div 
                        className="me-2 text-white d-flex justify-content-center align-items-center rounded-circle avatar primary-color"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <i className="bi bi-robot"></i>
                      </div>
                    )}
                    
                    <div 
                      className={`message-bubble ${
                        msg.sender === 'user' 
                          ? 'user-bubble' 
                          : 'ai-bubble'
                      }`}
                      style={
                        msg.sender === 'user' 
                          ? { backgroundColor: theme.primaryColor } 
                          : { backgroundColor: darkMode ? '#444' : '#fff', color: theme.textColor }
                      }
                    >
                      <p className="m-0">{msg.text}</p>
                      
                      {/* Display attachments if any */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2">
                          {msg.attachments.map((file, idx) => (
                            <span key={idx} className="badge bg-light text-dark me-1">
                              <i className="bi bi-paperclip me-1"></i>
                              {file.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {msg.sender === 'user' && (
                      <div 
                        className="ms-2 bg-secondary bg-opacity-25 text-dark d-flex justify-content-center align-items-center rounded-circle avatar"
                        style={{ backgroundColor: darkMode ? '#555' : '#e9ecef', color: darkMode ? '#eee' : '#495057' }}
                      >
                        <i className="bi bi-person"></i>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="d-flex mb-3">
                    <div 
                      className="me-2 text-white d-flex justify-content-center align-items-center rounded-circle avatar primary-color"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <i className="bi bi-robot"></i>
                    </div>
                    <div 
                      className="message-bubble ai-bubble"
                      style={{ backgroundColor: darkMode ? '#444' : '#fff', color: theme.textColor }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="typing-dot" style={{ animationDelay: '0s' }}></span>
                        <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
                        <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messageEndRef} />
              </div>
              
              {/* Example questions */}
              {messages.length <= 2 && (
                <div 
                  className="p-3 border-top"
                  style={{ 
                    borderColor: darkMode ? '#444' : '#dee2e6',
                    backgroundColor: darkMode ? '#222' : '#fff' 
                  }}
                >
                  <p className="mb-2 small" style={{ color: darkMode ? '#aaa' : '#6c757d' }}>Suggested questions:</p>
                  <div className="d-flex flex-wrap gap-2">
                    {exampleQuestions.map((question, index) => (
                      <span
                        key={index}
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleExampleClick(question)}
                        style={{ fontSize: theme.fontSize }}
                      >
                        {question}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Attachments */}
              {attachments.length > 0 && (
                <div 
                  className="px-3 pt-2"
                  style={{ backgroundColor: theme.chatBg }}
                >
                  <div className="d-flex flex-wrap">
                    {attachments.map((file, index) => (
                      <div key={index} className="attachment-pill">
                        <i className="bi bi-paperclip me-1"></i>
                        {file.name.length > 15 ? `${file.name.substring(0, 12)}...` : file.name}
                        <span 
                          className="remove-attachment" 
                          onClick={() => removeAttachment(index)}
                        >
                          <i className="bi bi-x"></i>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Input form */}
              <div 
                className="p-3 border-top"
                style={{ 
                  borderColor: darkMode ? '#444' : '#dee2e6',
                  backgroundColor: darkMode ? '#222' : '#fff' 
                }}
              >
                <form onSubmit={handleSubmit} className="d-flex">
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none me-2 text-black"
                    onClick={() => fileInputRef.current.click()}
                    style={{ color: theme.primaryColor }}
                  >
                    <i className="bi bi-paperclip"></i>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    multiple
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                    style={{ 
                      backgroundColor: theme.inputBg, 
                      color: theme.textColor,
                      fontSize: theme.fontSize,
                      borderColor: darkMode ? '#444' : '#dee2e6'
                    }}
                  />
                  <button
                    className="btn ms-2 text-white d-flex align-items-center justify-content-center"
                    type="submit"
                    disabled={!input.trim() && attachments.length === 0 || isTyping}
                    style={{ backgroundColor: theme.primaryColor, width: '40px', height: '38px' }}
                  >
                    <i className="bi bi-send-fill"></i>
                  </button>
                </form>
              </div>
              
              {/* Footer */}
              <div 
                className="p-2 border-top text-center"
                style={{ 
                  borderColor: darkMode ? '#444' : '#dee2e6',
                  backgroundColor: darkMode ? '#222' : '#fff',
                  color: darkMode ? '#aaa' : '#6c757d'
                }}
              >
                <small>
                  Powered by AI • <a 
                    href="#contact" 
                    className="text-decoration-none primary-text"
                    style={{ color: theme.primaryColor }}
                  >Talk to a human</a>
                </small>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default EnhancedChatWidget;