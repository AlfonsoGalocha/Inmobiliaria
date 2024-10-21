// src/App.jsx


// npm install gsap/ScrollTrigger



import './styles/App.css';

import  { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';



function App() {  

  return (
    <Home />
  );
}

export default App;


