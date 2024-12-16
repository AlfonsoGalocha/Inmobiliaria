// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Componente de inicio
import Registro from './components/Register'; // Componente de registro
import Login from './components/Login'; // Componente Login
import HouseFlat from './components/HouseFlat'; // Componente Login
import Favoritos from './components/Favourites'; // Componente de favoritos
import Description from './components/Description'// Componente de Description


function App() {  

  // Textos que irán dentro del componente de HouseFlat
  const esloganFlat = 'En mar, sabemos que cada piso tiene su propio encanto y personalidad, y queremos ayudarte a encontrar el espacio ideal que se adapte a tus necesidades. '
  const titleFlat = 'Encuentra el Piso Perfecto para Ti'

  const esloganHouse = 'Te ofrecemos una selección de viviendas cuidadosamente elegidas para adaptarse a tus necesidades y estilo de vida,'
  const titleHouse = 'Encuentra la Casa de tus Sueños'

  const esloganRent = 'Sabemos que cada etapa de la vida necesita un espacio único, y con nuestra oferta de alquileres, encontrarás la flexibilidad y comodidad que buscas.'
  const titleRent = 'Alquileres que se Ajustan a tu Estilo de Vida'
  

  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} /> 
        {/* Rutas secundarias */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Registro />} />
        <Route path="/favoritos" element={<Favoritos />} /> 
        <Route path="/rent" element={<HouseFlat type="" buttonOptions={['TODOS','CASAS','PISOS']} rent={true} title={titleRent} eslogan={esloganRent}  />} />
        <Route path="/house" element={<HouseFlat type="Casa" buttonOptions={['PAREADO','CHALET','ADOSADO','VILLA',]} rent={false} title={titleHouse} eslogan={esloganHouse}  />} />
        <Route path="/flat" element={<HouseFlat type="Piso" buttonOptions={['ÁTICO','DUPLEX','ENTREPLANTA','BAJO',]} rent={false} title={titleFlat} eslogan={esloganFlat}  />} />
        <Route path='/description/:id' element={<Description />} />
      </Routes>
    </Router>
  );
}

export default App;


