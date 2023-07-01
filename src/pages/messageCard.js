import React from 'react';
import '../assets/styles/messageCard.css';

const MessageCard = ({ messages }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="messages-card">
      <h3>Odgovor</h3>
      {messages}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={handleRefresh}>
          Provjeri opet
          </button>
      </div>
    </div>
  );
};

export default MessageCard;
