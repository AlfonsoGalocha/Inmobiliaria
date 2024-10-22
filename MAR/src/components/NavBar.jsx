import { useState } from 'react';
import '../styles/NavBar.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa Font Awesome si lo instalaste con npm

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        <a href="/registro"><i className="fas fa-home"></i> Registrarse</a>
        <a href="/iniciodesesion"><i className="fas fa-user"></i> Iniciar Sesion</a>
        <a href="/favoritos"><i className="fas fa-concierge-bell"></i> Favoritos</a>
        <a href="/contacto"><i className="fas fa-envelope"></i> Contacto</a>
      </div>
    </nav>
  );
};

export default Navbar;
