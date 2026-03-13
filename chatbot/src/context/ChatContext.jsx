import React, { createContext, useState, useContext } from 'react'

const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant powered by Gemini 2.5 Flash. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Welcome Chat', date: new Date() }
  ])
  const [currentConversationId, setCurrentConversationId] = useState(1)

  const addMessage = (message) => {
    setMessages(prev => [...prev, message])
  }

  const clearMessages = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Hello! I'm your AI assistant powered by Gemini 2.5 Flash. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }

  const createNewConversation = () => {
    const newId = Date.now()
    setConversations(prev => [
      ...prev,
      { 
        id: newId, 
        title: `Chat ${new Date().toLocaleDateString()}`, 
        date: new Date() 
      }
    ])
    setCurrentConversationId(newId)
    clearMessages()
  }

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
    if (!darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  const deleteConversation = (id) => {
    setConversations(prev => prev.filter(conv => conv.id !== id))
    if (currentConversationId === id) {
      const remaining = conversations.filter(conv => conv.id !== id)
      if (remaining.length > 0) {
        setCurrentConversationId(remaining[0].id)
      } else {
        createNewConversation()
      }
    }
  }

  return (
    <ChatContext.Provider value={{
      messages,
      setMessages,
      addMessage,
      clearMessages,
      isTyping,
      setIsTyping,
      darkMode,
      toggleDarkMode,
      conversations,
      setConversations,
      currentConversationId,
      setCurrentConversationId,
      createNewConversation,
      deleteConversation
    }}>
      {children}
    </ChatContext.Provider>
  )
}