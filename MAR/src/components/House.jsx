import { useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar";
import HouseCard from "./HouseCard";
import "../styles/House.css";

function House() {
    const [houses, setHouses] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const [filters, setFilters] = useState({
    //     priceRange: [0, 10000000],
    //     bedrooms: "",
    //     bathrooms: "",
    // });
    const [activeButtons, setActiveButtons] = useState([]);
    const [page, setPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas

    // Prepara los parámetros de consulta, excluyendo valores undefined o vacíos
    const buildQueryParams = useCallback(() => {
        const queryParams = {
            type: "Casa", // Mostrar solo casas por defecto
            subtype: activeButtons.length > 0 ? activeButtons.join(",") : undefined,
            // min_price: filters.priceRange[0],
            // max_price: filters.priceRange[1],
            // min_bedrooms: filters.bedrooms || undefined,
            // min_bathrooms: filters.bathrooms || undefined,
            page,
            per_page: 5,
        };

        // Filtra los valores undefined
        return Object.fromEntries(
            Object.entries(queryParams).filter(([, value]) => value !== undefined)
        );
    }, [activeButtons, page]); // Dependencias para useCallback

    // fetchHouses ahora utiliza los parámetros limpios
    const fetchHouses = useCallback(async () => {
        const queryParams = new URLSearchParams(buildQueryParams()).toString();

        try {
            const response = await fetch(`http://localhost:5172/houses?${queryParams}`);
            const data = await response.json();

            if (response.ok) {
                setHouses(Array.isArray(data.houses) ? data.houses : []);
                setTotalPages(data.pages || 1);
            } else {
                console.error("Error en la respuesta del servidor:", data.message);
            }
        } catch (error) {
            console.error("Error fetching houses:", error);
            setHouses([]);
        }
    }, [buildQueryParams]);

    useEffect(() => {
        fetchHouses();
    }, [fetchHouses]);

    const handleButtonClick = (buttonType) => {
        setActiveButtons((prevButtons) => {
            const newButtons = prevButtons.includes(buttonType)
                ? prevButtons.filter((type) => type !== buttonType)
                : [...prevButtons, buttonType];
            setPage(1);
            return newButtons;
        });
    };

    // Maneja cambios en los filtros
    // const handleFilterChange = (e) => {
    //     const { name, value } = e.target;
    //     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    // };

    // // Aplica filtros al presionar el botón
    // const applyFilters = () => {
    //     setPage(1); // Reinicia a la primera página
    //     fetchHouses();
    //     setIsFilterOpen(false);
    // };

    const goToNextPage = () => {
        if (page < totalPages) setPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };

    return (
        <div className="App">
            <NavBar showSearchIcon={false} />
            <div className="section section1 text">
                <div className="search-bar-x">
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
                </div>
                <div className="title-text">
                    <h2 className="eslogan-h2">Encuentra la Casa de tus Sueños</h2>
                    <p>
                        Te ofrecemos una selección de viviendas cuidadosamente elegidas para adaptarse a tus
                        necesidades y estilo de vida, ya sea que busques un hogar acogedor en el centro de la ciudad
                        o una amplia casa familiar en una zona tranquila.
                    </p>
                </div>
            </div>
            <div className="section section2">
                <div className="buttons">
                    {["CHALET", "ADOSADO", "VILLA", "PAREADO"].map((type) => (
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
                <div>
                    {(Array.isArray(houses) ? houses : []).map((house, index) => (
                        <div key={index} className="container-card-global">
                            <div className="container-card">
                                <HouseCard
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
            {/* {isFilterOpen && (
                <div className="filter-window">
                    <div className="filter-group">
                        <label>Precio</label>
                        <input
                            type="number"
                            name="priceRange"
                            placeholder="Mínimo"
                            value={filters.priceRange[0]}
                            onChange={(e) =>
                                handleFilterChange({
                                    target: {
                                        name: "priceRange",
                                        value: [
                                            parseInt(e.target.value) || 0,
                                            filters.priceRange[1],
                                        ],
                                    },
                                })
                            }
                        />
                        <input
                            type="number"
                            name="priceRange"
                            placeholder="Máximo"
                            value={filters.priceRange[1]}
                            onChange={(e) =>
                                handleFilterChange({
                                    target: {
                                        name: "priceRange",
                                        value: [
                                            filters.priceRange[0],
                                            parseInt(e.target.value) || 10000000,
                                        ],
                                    },
                                })
                            }
                        />
                    </div>
                    <div className="filter-group">
                        <label>Habitaciones</label>
                        <input
                            type="number"
                            name="bedrooms"
                            placeholder="Mínimo habitaciones"
                            value={filters.bedrooms}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Baños</label>
                        <input
                            type="number"
                            name="bathrooms"
                            placeholder="Mínimo baños"
                            value={filters.bathrooms}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <button className="apply-filters" onClick={applyFilters}>
                        Aplicar
                    </button>
                </div>
            )} */}
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

export default House;
