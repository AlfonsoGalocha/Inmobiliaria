import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import axios from 'axios';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);
    const searchBarRef = useRef(null);
    const searchButtonRef = useRef(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleSearchIconClick = () => {
        if (isSearchOpen) queryCall(); // Llama a queryCall si la barra ya está abierta
        else setIsSearchOpen(true); // Abre la barra de búsqueda
    };

    const handleClickOutside = (event) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target) && // Si el clic no fue en la barra
            searchButtonRef.current &&
            !searchButtonRef.current.contains(event.target) // Y tampoco en el boton de la lupa
        ) {
            setIsSearchOpen(false); // Cierra la barra de búsqueda
        }
    };

    useEffect(() => {
        if (isSearchOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen]);

    const queryCall = () => {
        const query = searchBarRef.current.querySelector('input').value;
        console.log(`Query executed: ${query}`);
        // Aquí tenemos que meter la llamada a la api con la query de busqueda
    };

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

            <div ref={searchBarRef} className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
                <input className="input-search-bar" type="text" placeholder="Encuentra tu casa" />
            </div>

            {/* Lo de searchButtonRef es para que la barra de busqueda no se cierre cuando se pulsa la lupa, igual en el de arriba */}
            <button ref={searchButtonRef} className={`search-icon ${isSearchOpen ? 'active' : ''}`} onClick={handleSearchIconClick}>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>

            </button>

            <button className="mobile-menu-icon" onClick={toggleMobileMenu}>&#9776;</button>

            {isMobileMenuOpen && <div className="overlay" onClick={toggleMobileMenu}></div>}

            <div className={isMobileMenuOpen ? 'navbar-links-mobile' : 'navbar-links'}>

                {isMobileMenuOpen && <button className="close-menu-icon" onClick={toggleMobileMenu}>&#10005;</button>}

                {isLoggedIn ? <Link to="/" onClick={handleLogout}>Logout</Link> : <>
                    <Link to="/signup">Registrarse</Link>
                    <Link to="/login">Iniciar Sesión</Link>
                </>}
                <Link to="/favoritos">Favoritos</Link>
                <Link to="#footer">Contacto</Link>

            </div>
        </nav>
    );
};

export default Navbar;
