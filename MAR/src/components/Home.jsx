import { useState, useEffect } from 'react';
import '../styles/App.css';

// Components
import NavBarMobile from './NavBarMobile';
import NavBarComputer from './NavBarComputer';
import HouseCard from './HouseCard';

const Home = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Función que actualiza el estado en función del tamaño de la ventana
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 736);
    };

    // Configura el listener del evento resize
    window.addEventListener('resize', handleResize);

    // Verifica el tamaño inicial al cargar el componente
    handleResize();

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const houseData = {
    id: 'hjbdehuakbewlkbfhjkwevfhjlewbfjhewvbhjkf',
    image: '../../public/static/img/casa_majadahonda.webp',
    title: 'Casa en Majadahonda',
    description: 'Exclusiva y moderna vivienda, con cinco dormitorios y ocho cuartos de baño, en parcela de 1.900 m2 ubicada en una zona muy tranquila de la urbanización......',
    location: 'Majadahonda, España',
    size: 1900,
    bathrooms: 8,
    bedrooms: 5,
    price: 1350000,
  };

  const us =
    'En MAR nos dedicamos a la venta de propiedades exclusivas en Majadahonda, con un enfoque en ofrecer un servicio personalizado y de alta calidad.\n\n\nCon años de experiencia en el mercado inmobiliario, nuestro equipo se compromete a acompañar a cada cliente en todo el proceso de compra, asegurando transparencia, confianza y una experiencia excepcional.';
  const our_mission =
    'Nuestra misión es facilitar la búsqueda del hogar ideal, proporcionando asesoría experta y una selección cuidada de inmuebles que se ajusten a las necesidades y deseos de nuestros clientes.\n\n\nCreemos en construir relaciones duraderas basadas en la integridad y el profesionalismo, convirtiéndonos en su socio de confianza en cada paso.';

  return (
    <div className="App">
      {isMobileView ? (
        <NavBarMobile showSearchIcon={true} />
      ) : (
        <NavBarComputer />
      )}
      <div className="section section1">
        <div className="title">
          <h2 className="eslogan">Hogares que inspiran</h2>
          <div className="categories">
            <a href="/house" className="category-link">
              Casas
            </a>{' '}
            |
            <a href="/rent" className="category-link">
              {' '}
              Alquileres
            </a>{' '}
            |
            <a href="/flat" className="category-link">
              {' '}
              Pisos
            </a>
          </div>
          {isMobileView ? (
            <></>
          ) : (
            <div className="search-computer-bar">
              <input type="text" value={'Encuentra tu casa'}/>
              <button className='search-icon-comp'  >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
                </button>
            </div>
          )}
        </div>
      </div>
      <div className="section section2">
        <p className="down_indicator">{'>'}</p>
        <h1>Viviendas destacadas</h1>
        <div className="container-card">
          <HouseCard
            id={houseData.id}
            image={houseData.image}
            title={houseData.title}
            description={houseData.description}
            location={houseData.location}
            size={houseData.size}
            bathrooms={houseData.bathrooms}
            bedrooms={houseData.bedrooms}
            price={houseData.price}
          />
        </div>
      </div>
      <div className="section section3">
        <h1>Nosotros</h1>
        <p>{us}</p>
      </div>
      <div className="section section4">
        <h1>Nuestra misión</h1>
        <p>{our_mission}</p>
      </div>
      <footer className="footer" id="footer">
        <div className="contact-section">
          <p id="contact">Contáctanos</p>
          <p>mar.soporte@gmail.com</p>
          <p>+34 642 773 127</p>
        </div>
        <div className="social-links">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="../../public/static/img/instagram_logo.webp" alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <img src="../../public/static/img/linkedin_logo.png" alt="LinkedIn" />
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="../../public/static/img/tiktok_logo.png"
              alt="TikTok"
              className="tiktok_logo"
            />
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
};

export default Home;
