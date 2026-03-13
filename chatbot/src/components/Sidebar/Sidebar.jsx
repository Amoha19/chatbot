import React from 'react'
import { Button, ListGroup, Badge } from 'react-bootstrap'
import { BsPlusCircle, BsChatDots, BsGear, BsMoon, BsSun, BsTrash } from 'react-icons/bs'
import { useChat } from '../../context/ChatContext'
import './Sidebar.css'

const Sidebar = () => { 
  const { 
    conversations, 
    currentConversationId, 
    setCurrentConversationId, 
    createNewConversation,
    deleteConversation,
    darkMode,
    toggleDarkMode 
  } = useChat()

  return (
    <div className={`sidebar p-3 ${darkMode ? 'dark' : ''}`}>
      <div className="sidebar-header mb-4">
        <h5 className="d-flex align-items-center gap-2">
          <BsChatDots className="text-primary" />
          Chat History
        </h5>
        <Button 
          variant="primary" 
          className="w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
          onClick={createNewConversation}
        >
          <BsPlusCircle />
          New Chat
        </Button>
      </div>

      <ListGroup variant="flush" className="sidebar-conversations">
        {conversations.map((conv) => (
          <ListGroup.Item
            key={conv.id}
            action
            active={currentConversationId === conv.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div 
              className="text-truncate flex-grow-1"
              onClick={() => setCurrentConversationId(conv.id)}
              style={{ cursor: 'pointer' }}
            >
              <BsChatDots className="me-2" />
              {conv.title}
            </div>
            <div className="d-flex align-items-center gap-2">
              <Badge bg="secondary" pill>
                {new Date(conv.date).toLocaleDateString()}
              </Badge>
              <Button
                variant="link"
                className="p-0 text-danger"
                onClick={() => deleteConversation(conv.id)}
                title="Delete conversation"
              >
                <BsTrash size={14} />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="sidebar-footer mt-auto pt-3">
        <hr />
        <Button 
          variant="outline-secondary" 
          className="w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
          onClick={toggleDarkMode}
        >
          {darkMode ? <BsSun /> : <BsMoon />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
        <Button variant="outline-secondary" className="w-100 d-flex align-items-center justify-content-center gap-2">
          <BsGear />
          Settings
        </Button>
      </div>
    </div>
  )
}

export default Sidebar