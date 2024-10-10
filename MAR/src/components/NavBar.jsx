import { useState } from 'react';
import '../styles/NavBar.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa Font Awesome si lo instalaste con npm

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>MAR</h1>
      </div>
      <ul className={isMobileMenuOpen ? "navbar-links-mobile" : "navbar-links"}>
        <li><a href="#home"><i className="fas fa-home"></i> Home</a></li>
        <li><a href="#about"><i className="fas fa-user"></i> About</a></li>
        <li><a href="#services"><i className="fas fa-concierge-bell"></i> Services</a></li>
        <li><a href="#contact"><i className="fas fa-envelope"></i> Contact</a></li>
      </ul>
      <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <>&#10005;</> : <>&#9776;</>} {/* X for close, ☰ for hamburger */}
      </button>
    </nav>
  );
};

export default Navbar;
