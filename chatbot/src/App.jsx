import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ChatProvider } from './context/ChatContext'
import Sidebar from './components/Sidebar/Sidebar'
import Chatbot from './components/Chatbot/Chatbot'
import './App.css'

function App() {
  return (
    <ChatProvider>
      <Container fluid className="p-0 h-100">
        <Row className="g-0 h-100">
          <Col md={3} lg={2} className="sidebar-col">
            <Sidebar />
          </Col>
          <Col md={9} lg={10} className="chat-col">
            <Chatbot />
          </Col>
        </Row>
      </Container>
    </ChatProvider>
  )
}

export default App