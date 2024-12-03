import { useState, useEffect, useCallback, Children } from "react";
import NavBarMobile from "./NavBarMobile";
import NavBarComputer from "./NavBarComputer";
import HouseCard from "./HouseCard";
import "../styles/House.css";
import axios from "axios";
import PropTypes from "prop-types";

function Flat({type = Children,buttonOptions = Children,rent = Children,title = Children,eslogan = Children}) {
    const [houses, setHouses] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: [0, 5000000],
        bedrooms: "",
        bathrooms: "",
    });
    const [tempFilters, setTempFilters] = useState({ ...filters });
    const [activeButtons, setActiveButtons] = useState([]);
    const [page, setPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobileView(window.innerWidth <= 736);
        };
    
        window.addEventListener("resize", handleResize);
        handleResize();
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);


    // Parametros para la consulta
    const buildQueryParams = useCallback(() => {
        const queryParams = {
            type,
            rent,
            subtype: activeButtons.length > 0 ? activeButtons.join(",") : undefined,
            min_price: filters.priceRange[0], 
            max_price: filters.priceRange[1], 
            min_bedrooms: filters.bedrooms || undefined, 
            min_bathrooms: filters.bathrooms || undefined, 
            page,
            per_page: 5,
        };

        // Filtra los valores undefined
        return Object.fromEntries(
            Object.entries(queryParams).filter(([, value]) => value !== undefined)
        );
    }, [activeButtons,filters, page,type,rent]); // Dependencias

    const fetchHouses = useCallback(async () => {
        const queryParams = new URLSearchParams(buildQueryParams()).toString();

        try {
            // Realizar la petición GET con axios
            const response = await axios.get(`http://localhost:5172/houses?${queryParams}`);
            
            // Manejar la respuesta
            if (response.status === 200) {
                const data = response.data;
                setHouses(Array.isArray(data.houses) ? data.houses : []);
                setTotalPages(data.pages || 1);
            } else {
                console.error("Error en la respuesta del servidor:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching houses:", error);
            setHouses([]); // Resetear las casas en caso de error
        }
    }, [buildQueryParams]);


    useEffect(() => {
        fetchHouses();
    }, [filters,fetchHouses]);

    const handleButtonClick = (buttonType) => {
        setActiveButtons((prevButtons) => {
            const newButtons = prevButtons.includes(buttonType)
                ? prevButtons.filter((type) => type !== buttonType)
                : [...prevButtons, buttonType];
            setPage(1);
            return newButtons;
        });
    };

    // Maneja cambios en los filtros temporales
    const handleTempFilterChange = (e) => {
        const { name, value } = e.target;
        setTempFilters((prevTempFilters) => ({
            ...prevTempFilters,
            [name]: name === "priceRange" ? value.split(",").map(Number) : value,
        }));
    };

    // Aplica los filtros desde los filtros temporales
    const applyFilters = () => {
        setFilters(tempFilters); // Actualiza los filtros
        setPage(1); // Reinicia la paginación
        setIsFilterOpen(false); // Cierra el modal
    };
    

    const goToNextPage = () => {
        if (page < totalPages) setPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };

    return (
        <div className="App">
            {isMobileView ? (
                <NavBarMobile showSearchIcon={false} />
            ) : (
                <NavBarComputer />
            )}
            <div className="section section1 text">
                {/* <div className="search-bar-x">
                    <input type="text" placeholder="Encuentra tu casa" />
                    <button
                        className={`search-icon-x ${isSearchOpen ? "active" : ""}`}
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-search"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </button>
                    <button className="filter" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#7189A2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sliders-horizontal"
                        >
                            <line x1="21" x2="14" y1="4" y2="4" />
                            <line x1="10" x2="3" y1="4" y2="4" />
                            <line x1="21" x2="12" y1="12" y2="12" />
                            <line x1="8" x2="3" y1="12" y2="12" />
                            <line x1="21" x2="16" y1="20" y2="20" />
                            <line x1="12" x2="3" y1="20" y2="20" />
                            <line x1="14" x2="14" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="10" y2="14" />
                            <line x1="16" x2="16" y1="18" y2="22" />
                        </svg>
                    </button>
                </div> */}
                <div className="title-text">
                    <h2 className="eslogan-h2">{title}</h2>
                    <p>{eslogan}</p>
                </div>
            </div>
            <div className="section section2">
                <div className="buttons">
                    {buttonOptions.map((type) => (
                        <button
                            key={type}
                            className={`buttonFilter ${
                                activeButtons.includes(type) ? "active" : ""
                            }`}
                            onClick={() => handleButtonClick(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className="global-conyainer-cards-1">
                    {(Array.isArray(houses) ? houses : []).map((house, index) => (
                        <div key={index} className="container-card-global">
                            <div className="container-card">
                                <HouseCard
                                    id={house.id}
                                    image={house.image}
                                    title={house.title}
                                    description={house.description}
                                    location={house.location}
                                    size={house.size}
                                    bathrooms={house.bathrooms}
                                    bedrooms={house.bedrooms}
                                    price={house.price}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button
                        className="pagination-button"
                        onClick={goToPreviousPage}
                        disabled={page === 1}
                    >
                        &laquo; Anterior
                    </button>
                    <span>Página {page} de {totalPages}</span>
                    <button
                        className="pagination-button"
                        onClick={goToNextPage}
                        disabled={page === totalPages}
                    >
                        Siguiente &raquo;
                    </button>
                </div>
            </div>
            {isFilterOpen && (
                <div className="filter-window">
                    <div className="filter-group">
                        <label>Precio</label>
                        <div className="price-range">
                            <input type="range" name="minPrice" min="0" max="1000000" step="10000" value={tempFilters.priceRange[0]} onChange={(e) => setTempFilters((prev) => ({ ...prev, priceRange: [Math.min(parseInt(e.target.value), prev.priceRange[1]), prev.priceRange[1]] }))} />
                            <input type="range" name="maxPrice" min="0" max="5000000" step="10000" value={tempFilters.priceRange[1]} onChange={(e) => setTempFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], Math.max(parseInt(e.target.value), prev.priceRange[0])] }))} />
                        </div>
                        <div className="price-values">
                            <span>Min: {tempFilters.priceRange[0].toLocaleString("es-ES")}€ </span>
                            <span>Max: {tempFilters.priceRange[1].toLocaleString("es-ES")}€ </span>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Habitaciones</label>
                        <input type="number" name="bedrooms" placeholder="Mínimo habitaciones" value={tempFilters.bedrooms} onChange={handleTempFilterChange} />
                    </div>
                    <div className="filter-group">
                        <label>Baños</label>
                        <input type="number" name="bathrooms" placeholder="Mínimo baños" value={tempFilters.bathrooms} onChange={handleTempFilterChange} />
                    </div>

                    <button className="apply-filters" onClick={applyFilters}>
                        Aplicar
                    </button>
                </div>
            )}
            <footer className='footer' id= 'footer'>
                <div className="contact-section">
                    <p id='contact'>Contáctanos</p>
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
                    <img src="../../public/static/img/tiktok_logo.png" alt="TikTok" className='tiktok_logo'/>
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
}


Flat.propTypes = {
    type: PropTypes.string, // Usa PropTypes en lugar de Flat
    buttonOptions: PropTypes.arrayOf(PropTypes.string), // Define un array de strings
    rent: PropTypes.bool, // Booleano para el alquiler
    title: PropTypes.string, // Título
    eslogan: PropTypes.string, // Eslogan
};

export default Flat;
