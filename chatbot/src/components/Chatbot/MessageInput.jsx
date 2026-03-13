import React, { useState } from 'react'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import { BsSend, BsTrash, BsStopCircle } from 'react-icons/bs'
import { useChat } from '../../context/ChatContext'
import useGemini from '../../hooks/useGemini'

const MessageInput = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState(null)
  
  const { addMessage, setIsTyping, clearMessages } = useChat()
  const { generateResponse, stopGeneration, loading } = useGemini()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    addMessage(userMessage)
    setInput('')
    setError(null)
    setIsTyping(true)

    try {
      const response = await generateResponse(input)
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }
      
      addMessage(botMessage)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
        addMessage({
          id: Date.now() + 1,
          text: "I'm sorry, I encountered an error. Please check your API key and try again.",
          sender: 'bot',
          timestamp: new Date()
        })
      }
    } finally {
      setIsTyping(false)
    }
  }

  const handleStop = () => {
    stopGeneration()
    setIsTyping(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-2">
          {error}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit} className="d-flex gap-2">
        <Button 
          variant="outline-secondary" 
          onClick={clearMessages}
          title="Clear conversation"
          disabled={loading}
        >
          <BsTrash />
        </Button>
        
        <Form.Control
          as="textarea"
          rows="1"
          placeholder={loading ? "AI is thinking..." : "Type your message... (Enter to send, Shift+Enter for new line)"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="flex-grow-1"
          style={{ resize: 'none' }}
        />
        
        {loading ? (
          <Button 
            variant="danger" 
            onClick={handleStop}
            title="Stop generating"
          >
            <BsStopCircle />
          </Button>
        ) : (
          <Button 
            variant="primary" 
            type="submit" 
            disabled={!input.trim()}
            title="Send message"
          >
            <BsSend />
          </Button>
        )}
      </Form>
    </>
  )
}

export default MessageInput