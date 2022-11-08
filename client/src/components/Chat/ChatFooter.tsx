import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface ChatFooterProps {
  socket: Socket;
}

const ChatFooter: FC<ChatFooterProps> = ({ socket }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }

    setMessage('');
    socket.emit('typingStopped', '');
  };

  useEffect(() => {
    if (message.length === 1) {
      socket.emit('typing', `${localStorage.getItem('userName')} is typing...`);
    }

    if (!message.length) {
      socket.emit('typingStopped', '');
    }
  }, [message]);

  return (
    <div className='chat__footer'>
      <form className='form' onSubmit={handleSendMessage}>
        <input
          type='text'
          placeholder='Write message'
          className='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='sendBtn'>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;