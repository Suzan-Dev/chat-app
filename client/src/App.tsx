import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io as socketIO } from 'socket.io-client';
import HomePage from './components/Home/HomePage';
import ChatPage from './components/Chat/ChatPage';

const socket = socketIO('http://localhost:4000');

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<HomePage socket={socket} />}></Route>
          <Route path='/chat' element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
