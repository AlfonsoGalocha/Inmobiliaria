// src/components/HouseFlat.jsx

import "../styles/House.css";

//importamos las librerias necesarias
import { useState, useEffect, useCallback, Children } from "react";
import axios from "axios";
import PropTypes from "prop-types";

//importamos los componentes necesarios
import NavBarMobile from "./NavBarMobile";
import NavBarComputer from "./NavBarComputer";
import HouseCard from "./HouseCard";
import Footer from "./Footer"


//Hook
import useIsMobileView from "../hooks/useIsMobileView"


function Flat({type = Children,buttonOptions = Children,rent = Children,title = Children,eslogan = Children}) { // Cambia Flat por HouseFlat
    const [houses, setHouses] = useState([]); // Estado para almacenar las casas
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Estado para abrir/cerrar los filtros
    const [filters, setFilters] = useState({  // Estado para los filtros con sus valores por defecto
        priceRange: [0, 5000000],
        bedrooms: "",
        bathrooms: "",
    });
    const [tempFilters, setTempFilters] = useState({ ...filters }); // Estado para los filtros temporales
    const [activeButtons, setActiveButtons] = useState([]); // Estado para los botones activos
    const [page, setPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const isMobileView = useIsMobileView(); // Estado para determinar si la vista es móvil
    const [istype, setType] = useState(type); // Estado para el tipo de propiedad


    // Parametros para la consulta
    const buildQueryParams = useCallback(() => {
        const queryParams = {
            type: rent ? (istype !== "" ? istype : undefined) : (type !== "" ? type : undefined), // Usa type o istype según el valor de rent
            rent,
            subtype: rent == false && activeButtons.length > 0 ? activeButtons.join(",") : undefined, // Se usa subtype si rent es false
            min_price: filters.priceRange[0],
            max_price: filters.priceRange[1],
            min_bedrooms: filters.bedrooms || undefined,
            min_bathrooms: filters.bathrooms || undefined,
            page,
            per_page: 6,
        };
    
        // Se filtran los valores undefined
        return Object.fromEntries(
            Object.entries(queryParams).filter(([, value]) => value !== undefined)
        );
    }, [activeButtons, filters, page, type, rent, istype]); // Dependencias
    
    // Función para obtener las casas
    const fetchHouses = useCallback(async () => { 
        const queryParams = new URLSearchParams(buildQueryParams()).toString(); // Construir los parámetros de la consulta

        try {
            // Realizar la petición GET con axios
            const response = await axios.get(`http://localhost:5172/houses?${queryParams}`); 
            
            // Manejar la respuesta
            if (response.status === 200) {  
                const data = response.data;
                setHouses(Array.isArray(data.houses) ? data.houses : []); 
                setTotalPages(data.pages || 1);
            } else {
                console.error("Error:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching houses:", error);
            setHouses([]); // Resetear las casas en caso de error
        }
    }, [buildQueryParams]);

    // Hook para obtener las casas
    useEffect(() => {
        fetchHouses();
    }, [filters,fetchHouses]);

    // Maneja el click en los botones
    const handleButtonClick = (buttonType) => {
        if (rent) {
            // En caso de que un boton ya este pulsado
            if (buttonType == "CASAS" && istype == "Casa" || buttonType == "PISOS" && istype == "Piso" || buttonType === "TODOS" && istype === "" && activeButtons.includes("TODOS")) {
                setType("");
                setPage(1);
                setActiveButtons([]); // Limpia los botones activos
            } else {
                // Si rent es true, actualizar type dinámicamente según el botón
                switch (buttonType.toUpperCase()) {
                    case "TODOS":
                        setType("");
                        break;
                    case "CASAS":
                        setType("Casa");
                        break;
                    case "PISOS":
                        setType("Piso");
                        break;
                    default:
                        setType("");
                }
                setPage(1);
                setActiveButtons([buttonType]); // Establece el botón activo
            }
        } else {
            // Modo de múltiples selecciones (si rent es false)
            setActiveButtons((prevButtons) => {
                const isAlreadyActive = prevButtons.includes(buttonType); // Comprueba si el botón ya está activo
                const newButtons = isAlreadyActive
                    ? prevButtons.filter((type) => type !== buttonType) // Desactiva el botón
                    : [...prevButtons, buttonType]; // Activa el botón
                setPage(1); // Reinicia la paginación
                return newButtons;
            });
        }
    };
    
    

    // Cambios en los filtros temporales
    const handleTempFilterChange = (e) => {
        const { name, value } = e.target;
        setTempFilters((prevTempFilters) => ({
            ...prevTempFilters,
            [name]: name === "priceRange" ? value.split(",").map(Number) : value, // Divide el string en un array de números
        }));
    };

    // Se aplcian los filtros desde los filtros temporales
    const applyFilters = () => {
        setFilters(tempFilters); // Actualizo los filtros
        setPage(1); // Reinicio la paginación
        setIsFilterOpen(false); // Cierro el modal
    };
    
    // Función para ir a la página siguiente
    const goToNextPage = () => {
        if (page < totalPages) setPage((prevPage) => prevPage + 1);
    };

    // Función para ir a la página anterior
    const goToPreviousPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };

    // Cierra el modal de filtros al hacer click fuera de él
    const closeFilter = (e) => {
        if (e.target.classList.contains("filter-window-overlay")) {
            setIsFilterOpen(false);
        }
    };

    return (
        <div className="App">
            {isMobileView ? (
                <NavBarMobile/>
            ) : (
                <NavBarComputer />
            )}
            <div className="section section1 text">
                <div className="title-text">
                    <h2 className="eslogan-h2">{title}</h2>
                    <p>{eslogan}</p>
                </div>
                {isMobileView ? (
                    null
                ) : (
                    <div className="buttons">
                        {buttonOptions.map((type) => (
                            <button key={type} className={`buttonFilter ${activeButtons.includes(type) ? "active" : ""}`}  onClick={() => handleButtonClick(type)}>
                                {type}
                            </button>
                        ))}
                    </div>
                )}
                <div className="filter-container-houseflat">
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
            </div>
            <div className="section section2 section2b">
                {isMobileView ? (
                    <div className="buttons">
                        {buttonOptions.map((type) => (
                            <button key={type} className={`buttonFilter ${ activeButtons.includes(type) ? "active" : ""}`} onClick={() => handleButtonClick(type)}>
                                {type}
                            </button>
                        ))}
                    </div>
                ) : (
                    null
                )}
                <div className="global-conyainer-cards-1">
                    {(Array.isArray(houses) ? houses : []).map((house, index) => (
                        <div key={index} className="container-card-global">
                            <a className="container-card">
                                <HouseCard
                                    id={house.id}
                                    image={house.images}
                                    title={house.title}
                                    description={house.description}
                                    location={house.location}
                                    size={house.size}
                                    bathrooms={house.bathrooms}
                                    bedrooms={house.bedrooms}
                                    price={house.price}
                                    rent={house.rent}
                                />
                            </a>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button className="pagination-button" onClick={goToPreviousPage} disabled={page === 1}>&laquo; Anterior</button>
                    <span>Página {page} de {totalPages}</span>
                    <button className="pagination-button" onClick={goToNextPage} disabled={page === totalPages}>Siguiente &raquo;</button>
                </div>
            </div>
            {isFilterOpen && (
                <div className="filter-window-overlay" onClick={closeFilter}>
                    <div className="filter-window">
                        <button className="close-button" onClick={() => setIsFilterOpen(false)}>&times;</button>
                        <div className="filter-group">
                            <label>Precio</label>
                            <div className="price-range">
                                <input type="range" name="minPrice" min="0" max="1000000" step="10000" value={tempFilters.priceRange[0]} 
                                onChange={(e) =>
                                        setTempFilters((prev) => ({
                                            ...prev,
                                            priceRange: [
                                                Math.min(parseInt(e.target.value), prev.priceRange[1]),
                                                prev.priceRange[1],
                                            ],
                                        }))
                                    }
                                />
                                <input type="range" name="maxPrice" min="0" max="5000000" step="10000" value={tempFilters.priceRange[1]}
                                    onChange={(e) =>
                                        setTempFilters((prev) => ({
                                            ...prev,
                                            priceRange: [
                                                prev.priceRange[0],
                                                Math.max(parseInt(e.target.value), prev.priceRange[0]),
                                            ],
                                        }))
                                    }
                                />
                            </div>
                            <div className="price-values">
                                <span>Min: {tempFilters.priceRange[0].toLocaleString("es-ES")}€ </span>
                                <span>Max: {tempFilters.priceRange[1].toLocaleString("es-ES")}€ </span>
                            </div>
                        </div>

                        <div className="filter-group">
                            <label>Habitaciones</label>
                            <input type="number" name="bedrooms" placeholder="Mínimo habitaciones" value={tempFilters.bedrooms} onChange={handleTempFilterChange}/>
                        </div>
                        <div className="filter-group">
                            <label>Baños</label>
                            <input type="number" name="bathrooms" placeholder="Mínimo baños" value={tempFilters.bathrooms} onChange={handleTempFilterChange}/>
                        </div>

                        <button className="apply-filters" onClick={applyFilters}>Aplicar</button>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
}

// Definimos las props
Flat.propTypes = {
    type: PropTypes.string, 
    buttonOptions: PropTypes.arrayOf(PropTypes.string), 
    rent: PropTypes.bool, 
    title: PropTypes.string, 
    eslogan: PropTypes.string, 
};

export default Flat;
