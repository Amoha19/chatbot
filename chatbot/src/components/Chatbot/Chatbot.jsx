import React, { useRef, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useChat } from '../../context/ChatContext'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import TypingIndicator from './TypingIndicator'
import './Chatbot.css'

const Chatbot = () => {
  const { messages, isTyping, darkMode, toggleDarkMode } = useChat()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <Card className={`chatbot-card h-100 border-0 ${darkMode ? 'dark' : ''}`}>
      <Card.Header className="chatbot-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">AI Assistant</h5>
          <small>Powered by Gemini 2.5 Flash</small>
        </div>
        <button 
          className="btn btn-sm btn-outline-light"
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </Card.Header>
      
      <Card.Body className="chatbot-body p-0">
        <div className="messages-container p-3">
          <MessageList messages={messages} />
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </Card.Body>
      
      <Card.Footer className="chatbot-footer bg-light p-3">
        <MessageInput />
      </Card.Footer>
    </Card>
  )
}

export default Chatbot