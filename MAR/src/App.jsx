// src/App.jsx

// import './styles/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Componente para la página de inicio
import Registro from './components/Register'; // Componente para la página de registro
import Login from './components/Login'; // Importa el componente Login
import Rent from './components/Rent'; // Importa el componente Login
import House from './components/House'; // Importa el componente Login
import Flat from './components/Flat'; // Importa el componente Login
// import Favoritos from './components/Favourite'; // Componente para la página de favoritos


function App() {  
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta principal */}
        <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
        {/* Otras rutas pueden ir aquí */}
        <Route path="/signup" element={<Registro />} />
        {/* <Route path="/favoritos" element={<Favoritos />} /> */}
        <Route path="/rent" element={<Rent />} />
        <Route path="/house" element={<House />} />
        <Route path="/flat" element={<Flat />} />
      </Routes>
    </Router>
  );
}

export default App;


