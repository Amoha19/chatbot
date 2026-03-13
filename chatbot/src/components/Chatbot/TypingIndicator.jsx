import React from 'react'

const TypingIndicator = () => {
  return (
    <div className="d-flex justify-content-start mb-3">
      <div className="bg-white p-3 rounded-3" style={{ maxWidth: '70%' }}>
        <div className="d-flex align-items-center gap-2">
          <div className="spinner-grow spinner-grow-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow spinner-grow-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow spinner-grow-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2 text-muted">AI is thinking...</span>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator