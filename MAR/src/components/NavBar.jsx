import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import axios from 'axios';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5172/user/logout', {}, {
                withCredentials: true // Esto incluye las cookies en la solicitud
            });

            if (response.status === 200) { // Verifica el código de estado de la respuesta
                localStorage.removeItem('user'); // Elimina el usuario del localStorage
                setIsLoggedIn(false); // Actualiza el estado de inicio de sesión
                console.log('User logged out');
                // Aquí puedes redirigir o realizar otras acciones si es necesario
            } else {
                console.error('Logout failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className={`navbar ${isMobileMenuOpen ? 'menu-active' : ''}`}>
            <div className="navbar-logo">
                <a href="/" className='home_title'>
                    <h1>MAR</h1>
                </a>
            </div>
            {!isMobileMenuOpen && (
                <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
                    <>&#9776;</> {/* Mostrar hamburguesa */}
                </button>
            )}
            {isMobileMenuOpen && <div className="overlay" onClick={toggleMobileMenu}></div>}

            <div className={isMobileMenuOpen ? "navbar-links-mobile" : "navbar-links"}>
                {isMobileMenuOpen && (
                    <button className="close-menu-icon" onClick={toggleMobileMenu}>
                        &#10005; {/* X para cerrar */}
                    </button>
                )}

                {isLoggedIn ? (
                    <Link  to="/" onClick={handleLogout}>Logout</Link>
                ) : (
                    <>
                        <Link to="/signup">Registrarse</Link>
                        <Link to="/login">Iniciar Sesión</Link>
                    </>
                )}

                <Link to="/favoritos">Favoritos</Link>
                <Link to="#footer">Contacto</Link>
            </div>
        </nav>
    );
};

export default Navbar;
