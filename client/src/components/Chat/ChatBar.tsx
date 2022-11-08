import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface ChatFooterProps {
  socket: Socket;
}

interface User {
  socketID: string;
  name: string;
}

const ChatBar: FC<ChatFooterProps> = ({ socket }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
  }, []);

  return (
    <div className='chat__sidebar'>
      <h2>Open Chat</h2>

      <div>
        <h4 className='chat__header'>ACTIVE USERS</h4>
        <div className='chat__users'>
          {users.map((user) => (
            <p key={user.socketID}>{user.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
