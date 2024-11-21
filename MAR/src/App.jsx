// src/App.jsx

// import './styles/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Componente para la página de inicio
import Registro from './components/Register'; // Componente para la página de registro
import Login from './components/Login'; // Importa el componente Login
import HouseFlat from './components/HouseFlat'; // Importa el componente Login
// import Favoritos from './components/Favourite'; // Componente para la página de favoritos


function App() {  

  const esloganFlat = 'En nuestra inmobiliaria, sabemos que cada piso tiene su propio encanto y personalidad, y queremos ayudarte a encontrar el espacio ideal que se adapte a tus necesidades. Desde acogedores estudios hasta amplios apartamentos con vistas, nuestra selección de pisos está pensada para ofrecerte confort y calidad de vida.'
  const titleFlat = 'Encuentra el Piso Perfecto para Ti'

  const esloganHouse = 'Te ofrecemos una selección de viviendas cuidadosamente elegidas para adaptarse a tus necesidades y estilo de vida, ya sea que busques un hogar acogedor en el centro de la ciudad o una amplia casa familiar en una zona tranquila.'
  const titleHouse = 'Encuentra la Casa de tus Sueños'


  const esloganRent = 'Sabemos que cada etapa de la vida necesita un espacio único, y con nuestra oferta de alquileres, encontrarás la flexibilidad y comodidad que buscas. Ya sea que necesites un apartamento moderno , una casa espaciosa para la familia, te ofrecemos una amplia gama de opciones de alquiler adaptadas a tus necesidades.'
  const titleRent = 'Alquileres que se Ajustan a tu Estilo de Vida'
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta principal */}
        <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
        {/* Otras rutas pueden ir aquí */}
        <Route path="/signup" element={<Registro />} />
        {/* <Route path="/favoritos" element={<Favoritos />} /> */}
        <Route path="/rent" element={<HouseFlat type="Piso,Casa" buttonOptions={['TODOS','CASAS','PISOS']} rent={true} title={titleRent} eslogan={esloganRent}  />} />
        <Route path="/house" element={<HouseFlat type="Casa" buttonOptions={['PAREADO','CHALET','ADOSADO','VILLA',]} rent={false} title={titleHouse} eslogan={esloganHouse}  />} />
        <Route path="/flat" element={<HouseFlat type="Piso" buttonOptions={['ÁTICO','DUPLEX','ENTREPLANTA','BAJO',]} rent={false} title={titleFlat} eslogan={esloganFlat}  />} />
      </Routes>
    </Router>
  );
}

export default App;


