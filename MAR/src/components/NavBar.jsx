import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

// import Login from './Login';


  const Navbar = ({setIsFromNavbar}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Función para cerrar el menú al hacer clic en un enlace
  const handleLinkClick = (event) => {
    const path = event.target.getAttribute('href');
    setIsFromNavbar(path === '/iniciodesesion');

    if (isMobileMenuOpen) {
      toggleMobileMenu(); // Cierra el menú si está abierto
    }
  };



  return (
    <nav className={`navbar ${isMobileMenuOpen ? 'menu-active' : ''}`}>
      <div className="navbar-logo">
        <a href="/" className='home_title'>
          <h1>MAR</h1>
        </a>
      </div>
      {/* Solo mostrar el botón de menú si el menú está cerrado */}
      {!isMobileMenuOpen && (
        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <>&#9776;</> {/* Mostrar hamburguesa */}
        </button>
      )}

      {/* Overlay para el fondo difuminado */}
      {isMobileMenuOpen && <div className="overlay" onClick={toggleMobileMenu}></div>}

      <div className={isMobileMenuOpen ? "navbar-links-mobile" : "navbar-links"}>
        {/* Mostrar X solo dentro del menú desplegable */}
        {isMobileMenuOpen && (
          <button className="close-menu-icon" onClick={toggleMobileMenu}>
            &#10005; {/* X para cerrar */}
          </button>
        )}
        <Link to="/registro" onClick={handleLinkClick}> Registrarse</Link>
        <Link to="/login" onClick={handleLinkClick}> Iniciar Sesion</Link> 
        <Link to="/favoritos" onClick={handleLinkClick}> Favoritos</Link>
        <Link to="#footer" onClick={handleLinkClick}>Contacto</Link>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  setIsFromNavbar: PropTypes.func.isRequired,
};

export default Navbar;
