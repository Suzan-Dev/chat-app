import { FC, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from './ChatPage';

interface ChatBodyProps {
  messages: Message[];
  lastMessageRef: RefObject<HTMLDivElement>;
  typingStatus: string;
}

const ChatBody: FC<ChatBodyProps> = ({ messages, lastMessageRef, typingStatus }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className='chat__mainHeader'>
        <p>Hangout with Colleagues</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className='message__container'>
        {messages.map((message, i) =>
          message.name === localStorage.getItem('userName') ? (
            <div className='message__chats' key={message.id}>
              {messages[i - 1]?.name !== message.name && <p className='sender__name'>You</p>}
              <div className='message__sender'>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className='message__chats' key={message.id}>
              {messages[i - 1]?.name !== message.name && <p>{message.name}</p>}
              <div className='message__recipient'>
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/*This is triggered when a user is typing*/}
        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>

        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
