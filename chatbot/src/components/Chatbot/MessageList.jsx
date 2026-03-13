import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { BsRobot, BsPerson } from 'react-icons/bs'

const MessageList = ({ messages }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <>
      {messages.map((message) => (
        <Row key={message.id} className={`message-row ${message.sender}-message mb-3`}>
          <Col xs={12}>
            <div className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className={`message-bubble p-3 rounded-3 ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-white'}`} style={{ maxWidth: '70%' }}>
                <div className="d-flex align-items-center mb-2">
                  {message.sender === 'bot' ? (
                    <>
                      <BsRobot className="me-2" />
                      <small className="text-muted">AI Assistant</small>
                    </>
                  ) : (
                    <>
                      <small className="text-white-50 me-2">You</small>
                      <BsPerson className="text-white-50" />
                    </>
                  )}
                </div>
                <div className="message-content">
                  <ReactMarkdown>
                    {message.text}
                  </ReactMarkdown>
                </div>
                <small className={`d-block text-end mt-2 ${message.sender === 'user' ? 'text-white-50' : 'text-muted'}`}>
                  {formatTime(message.timestamp)}
                </small>
              </div>
            </div>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default MessageList