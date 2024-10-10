// src/App.jsx


// npm install gsap/ScrollTrigger



import  { useEffect } from 'react';
import './styles/App.css';
import NavBar from './components/NavBar.jsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    gsap.from(".section1 h1", { opacity: 100, duration: 1, y: 50 });

    gsap.from(".section2 h1", {
      scrollTrigger: {
        trigger: ".section2",
        start: "top center",
        end: "bottom center",
        scrub: true
      },
      opacity: 100,
      duration: 1,
      y: 50
    });

    gsap.from(".section3 h1", {
      scrollTrigger: {
        trigger: ".section3",
        start: "top center",
        end: "bottom center",
        scrub: true
      },
      opacity: 100,
      duration: 1,
      y: 50
    });

    // Añadir más animaciones para las demás secciones
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="section section1">
        <h1>Sección 1</h1>
      </div>
      <div className="section section2">
        <h1>Sección 2</h1>
      </div>
      <div className="section section3">
        <h1>Sección 3</h1>
      </div>
      <div className="section section4">
        <h1>Sección 4</h1>
      </div>
      <div className="section section5">
        <h1>Sección 5</h1>
      </div>
    </div>
  );
}

export default App;


