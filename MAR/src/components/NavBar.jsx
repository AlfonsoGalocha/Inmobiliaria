import  { useState } from 'react';
import '../styles/NavBar.css' // Asegúrate de crear los estilos correspondientes

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>MyApp</h1>
      </div>
      <ul className={isMobileMenuOpen ? "navbar-links-mobile" : "navbar-links"}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <>&#10005;</> : <>&#9776;</>} {/* X for close, ☰ for hamburger */}
      </button>
    </nav>
  );
};

export default Navbar;
