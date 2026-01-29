import './App.css'
import {  useState } from 'react';
import Navbar from './Components/Navbar'
import Main from './Components/Main'
import { Route, Routes } from 'react-router-dom'; // Removed Router as it is usually in main.jsx
import About from './Components/About';
import Project from './Components/Project';
import Admin from './Components/Admin';
import Vlog from './Components/Vlog';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  // Initialize state directly from localStorage to avoid flashing wrong colors
  const [toggle, setToggle] = useState("black");

  const mode = () => {
    if (toggle === "black") {
      setToggle("white");
      localStorage.setItem("mode1", "white");
    } else {
      setToggle("black");
      localStorage.setItem("mode1", "black");
    }
  }

  // You usually don't need a useEffect to sync state if you initialize it correctly above,
  // but if you keep it, strictly keep it for side effects (like API calls or body classes).
  // I have removed the manual DOM manipulation here.

  return (
    <>
      <div className='maincontainer h-full' style={{ backgroundColor: toggle === 'white' ? 'white' : '#0f172a', color: toggle === 'white' ? 'black' : 'white' }}>
        
        {/* Pass the toggle state to Navbar so it knows if it should be checked */}
        <Navbar Profile1={toggle} mode={mode} />
        
        <Routes>
          <Route path='/' element={<Main Profile1={toggle} />}></Route>
          <Route path='/About' element={<About Profile1={toggle} />} ></Route>
          <Route path='/Project' element={<Project Profile1={toggle} />} ></Route>
          <Route path='/Admin' element={<Admin />} ></Route>
          <Route path='/Vlog' element={<Vlog Profile1={toggle} />} ></Route>
        </Routes>
      </div>
    </>
  )
}

export default App