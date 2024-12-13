import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBarMobile.css';
import axios from 'axios';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);


    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleClickOutside = () => {

        setIsSearchOpen(false);
        
    };

    useEffect(() => {
        if (isSearchOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5172/user/logout', {}, { withCredentials: true });
            if (response.status === 200) {
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                console.log('User logged out');
            } else console.error('Logout failed with status:', response.status);
        } catch (error) {
            console.error('Error during logout:', error);
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
                    const footer = document.getElementById('footer');
                    footer.scrollIntoView({ behavior: 'smooth' });
                    }}>
                    Contacto
                </a>
                {isLoggedIn && <p className='p-a' onClick={handleLogout}>Logout</p>}
            </div>
        </nav>
    );
};

export default Navbar;



