import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface HomePageProps {
  socket: Socket;
}

const HomePage: FC<HomePageProps> = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem('userName', userName);
    socket.emit('newUser', { name: userName, socketID: socket.id });

    navigate('/chat');
  };

  return (
    <form className='home__container' onSubmit={handleSubmit}>
      <h2 className='home__header'>Sign in to Open Chat</h2>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        minLength={3}
        name='username'
        id='username'
        className='username__input'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className='home__cta' disabled={!userName}>
        SIGN IN
      </button>
    </form>
  );
};

export default HomePage;
