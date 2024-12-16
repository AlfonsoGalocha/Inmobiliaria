// src/components/NavBarMobile.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBarMobile.css';
import axios from 'axios';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para ver si esta la navbar abierta
    const [isSearchOpen, setIsSearchOpen] = useState(false);  //Estado para saber si el buscador está abierto
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null); // Estado para saber si el usuario está logueado


    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen); // Función para abrir y cerrar la navbar  

    const handleClickOutside = () => { // Función para cerrar el buscador

        setIsSearchOpen(false); // Cerrar el buscador poniendolo en false
        
    };

    // Función para cerrar el buscador si se hace click fuera de él
    useEffect(() => {
        if (isSearchOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen]);

    // Función para  hacer logout del usuario
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5172/user/logout', {}, { withCredentials: true });
            if (response.status === 200) {
                localStorage.removeItem('user'); // Eliminar el usuario del local storage
                setIsLoggedIn(false); // Cambiar el estado de logueado a false
                console.log('User logged out');
            } else console.error('Logout failed with status:', response.status);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Función para hacer scroll a una sección a traves de la navbar
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId); // Buscar la sección por el id
        if (section) {
          section.scrollIntoView({ behavior: "smooth" }); // Hacer scroll a la sección
        }
        // si no, que me mande al home y lo vuelva a intentar
        else {
            window.location.href = `/?scrollTo=${sectionId}`;
        }
      };

    // Recarga la página principal (Home) y hace scroll a la sección correspondiente
    window.onload = () => {
        // Buscar el parámetro "scrollTo" en la URL
        const params = new URLSearchParams(window.location.search);
        const sectionId = params.get("scrollTo");

        if (sectionId) {
            // Intentar hacer scroll a la sección correspondiente
            const section = document.getElementById(sectionId); 
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    };



    return (
        <nav className={`navbar ${isMobileMenuOpen ? 'menu-active' : ''}`}>
            <div className="navbar-logo">
                {!isSearchOpen && <a href="/" className="home_title"><h1 className="redacted-script-regular">MAR</h1></a>}
            </div>

            <button className="mobile-menu-icon" onClick={toggleMobileMenu}>&#9776;</button>

            {isMobileMenuOpen && <div className="overlay" onClick={toggleMobileMenu}></div>}

            <div className={isMobileMenuOpen ? 'navbar-links-mobile' : 'navbar-links'}>
                {isMobileMenuOpen && <button className="close-menu-icon" onClick={toggleMobileMenu}>&#10005;</button>} 

                {!isLoggedIn && (
                    <>
                        <Link to="/signup">Registrarse</Link>
                        <Link to="/login">Iniciar Sesión</Link>
                    </>
                )}
                <Link to="/favoritos">Favoritos</Link>
                <a href="#footer" onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection('footer'); // Hacer scroll a la sección de contacto
                    }}>
                    Contacto
                </a>
                {isLoggedIn && <p className='p-a' onClick={handleLogout}>Logout</p>}
            </div>
        </nav>
    );
};

export default Navbar;



