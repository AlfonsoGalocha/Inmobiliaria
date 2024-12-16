// src/components/NavBarComputer.jsx

import '../styles/NavBarComputer.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavBarComputer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null); // Estado para controlar si el usuario está logueado

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5172/user/logout', {}, { withCredentials: true });
            if (response.status === 200) {
                localStorage.removeItem('user'); // Eliminar el usuario del almacenamiento local
                setIsLoggedIn(false); // Actualizar el estado a false
                console.log('User logged out');
            } else {
                console.error('Logout failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Función para hacer scroll a una sección
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        // Si estamos en la página principal, añadir el parámetro "scrollTo" a la URL
        else {
            window.location.href = `/?scrollTo=${sectionId}`;
        }
      };

    //Recarga la página principal (Home) y hace scroll a la sección correspondiente
    window.onload = () => {
        // Buscar el parámetro "scrollTo" en la URL
        const params = new URLSearchParams(window.location.search);
        const sectionId = params.get("scrollTo");

        if (sectionId) {
            const section = document.getElementById(sectionId); // Hacer scroll a la sección correspondiente

            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    };
        

    return (
        <nav className="nav-computer">
            {/* Logo */}
            <div className="nav-computer-logo">
                <Link to="/">
                    <h1 className="nav-computer-logo-text">MAR</h1>
                </Link>
            </div>

            {/* Links Horizontales */}
            <ul className="nav-computer-links">
                <li>
                    <button onClick={() => scrollToSection("about")}>Sobre Nosotros</button>
                </li>
                <li>
                    <Link to="/favoritos">Favoritos</Link>
                </li>
                <li>
                    <button onClick={() => scrollToSection("footer")}>Contacto</button> 
                </li>
            </ul>


            {/* Botones de sesión */}
            <div className="nav-computer-auth-buttons">
                {isLoggedIn ? (
                    <button className="nav-computer-logout-button" onClick={handleLogout}>Cerrar Sesión</button> // Botón para cerrar sesión
                ) : (
                    <>
                        <Link to="/login">
                            <button className="nav-computer-login-button">Iniciar Sesión</button>
                        </Link>
                        <Link to="/signup">
                            <button className="nav-computer-register-button">Registrarse</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};


export default NavBarComputer;
