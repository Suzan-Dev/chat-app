import { FC, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

interface ChatPageProps {
  socket: Socket;
}

export interface Message {
  text: string;
  name: string;
  id: string;
  socketID: string;
}

const ChatPage: FC<ChatPageProps> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      setMessages([...messages, data]);
    });
  }, [messages.length]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, []);

  return (
    <div className='chat'>
      <ChatBar socket={socket} />
      <div className='chat__main'>
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
