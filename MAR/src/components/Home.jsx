import '../styles/Home.css'

import React from "react";
// Components
import NavBar from './NavBar';
import HouseCard from './HouseCard';


const Home = () => {

  const houseData = {
    image: 'https://via.placeholder.com/300',
    title: 'Casa en la Playa',
    description: 'Hermosa casa con vista al mar.',
    location: 'Málaga, España',
    size: 120,
    bathrooms: 2,
    bedrooms: 3,
    price: '350,000€'
  };

  const us = 'En MAR nos dedicamos a la venta de propiedades exclusivas en Majadahonda, con un enfoque en ofrecer un servicio personalizado y de alta calidad.\n\n\nCon años de experiencia en el mercado inmobiliario, nuestro equipo se compromete a acompañar a cada cliente en todo el proceso de compra, asegurando transparencia, confianza y una experiencia excepcional.'
  const our_mission = 'Nuestra misión es facilitar la búsqueda del hogar ideal, proporcionando asesoría experta y una selección cuidada de inmuebles que se ajusten a las necesidades y deseos de nuestros clientes.\n\n\nCreemos en construir relaciones duraderas basadas en la integridad y el profesionalismo, convirtiéndonos en su socio de confianza en cada paso.'

  return (
      <div className='App'>
        <NavBar />
        <div className='section section1'>
          <div className='title'>
          
            <h2 className='eslogan'>Hogares que inspiran</h2>
            <div className='categories'>
              <a href='/casas' className='category-link'>Casas</a> |
              <a href='/alquileres' className='category-link'> Alquileres</a> |
              <a href='/pisos' className='category-link'> Pisos</a>
            </div>

          </div>
        </div>
        <div className='section section2'>
          <p className='down_indicator'>{'>'}</p>
          <h1>Viviendas destacadas</h1>
          <HouseCard
            image={houseData.image}
            title={houseData.title}
            description={houseData.description}
            location={houseData.location}
            size={houseData.size}
            bathrooms={houseData.bathrooms}
            bedrooms={houseData.bedrooms}
            price={houseData.price}
          />

          {/* Poner las flechas de interacción, para pasar entre las HouseCards */}
          {/* Poner los puntitos que indican en que HouseCard estoy del total que se hayan renderizado */}
          {/* Retocar el CSS de la HouseCard, hay apartados que se ven como no se deberían */}

        </div>
        <div className='section section3'>
          <h1>Nosotros</h1>
          <p>{us}</p>
        </div>
        <div className='section section4'>
          <h1>Nuestra misión</h1>
          <p>{our_mission}</p>
        </div>
        <footer className='footer'>
          <h6>Contáctanos</h6>
          <p>mar.soporte@gmail.com</p>
          <p>+34 642 773 127</p>
          <div className="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src="../../public/static/img/instagram_logo.webp" alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <img src="../../public/static/img/linkedin_logo.png" alt="LinkedIn" />
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
              <img src="../../public/static/img/tiktok_logo.webp" alt="TikTok" className='tiktok_logo'/>
            </a>
          </div>
          <div className="footer-links">
            <a href="/acerca-de">Acerca de</a>
            <a href="/politica-de-privacidad">Política de privacidad</a>
            <a href="/aviso-legal">Aviso legal</a>
          </div>
        </footer>
      </div>
    );

}

export default Home