import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import ChatPage from './pages/chatPage';


// Main Application Component
function App() {


  return (
   <BrowserRouter>

      <div className='w-screen h-screen bg-black' > 
        <Routes>
          <Route path="/new" element={ <Home/>}/>
          <Route path="/" element={ <ChatPage/>}/>

        </Routes>
       

      </div>
   </BrowserRouter>
  );
};

export default App;
