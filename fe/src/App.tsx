import './App.css'
import { Home } from './content/Home';


// Main Application Component
function App() {


  return (
   <>
      <div className={`w-screen h-screen bg-black flex justify-center items-center`} > 
        <Home/>

      </div>
   </>
  );
};

export default App;
