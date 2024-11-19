import { useState } from 'react'
import NavBar from './NavBar'
// import HouseCard from './HouseCard'
import '../styles/House.css'

function House() {
    // const [showCard, setShowCard] = useState(false) 
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [filters, setFilters] = useState({ location: '', priceRange: '', bedrooms: '', bathrooms: '' })
    const [activeButtons, setActiveButtons] = useState([]);

    const handleSearchIconClick = () => {
        if (isSearchOpen) queryCall()
        else setIsSearchOpen(true)
    };

    const queryCall = () => {
        console.log('Search query executed')
    }

    // const houseData = {
    //     image: '../../public/static/img/casa_majadahonda.webp',
    //     title: 'Casa en Majadahonda',
    //     description: 'Exclusiva y moderna vivienda, con cinco dormitorios y ocho cuartos de baño, en parcela de 1.900 m2 ubicada en una zona muy tranquila de la urbanización......',
    //     location: 'Majadahonda, España',
    //     size: 1900,
    //     bathrooms: 8,
    //     bedrooms: 5,
    //     price: '1,350,000€',
    // }

    const handleButtonClick = (buttonType) => {
        setActiveButtons((prevButtons) => {
            if (prevButtons.includes(buttonType)) {
                // Si ya está activo, se elimina
                return prevButtons.filter((button) => button !== buttonType)
            } else {
                // Si no está activo, se agrega
                return [...prevButtons, buttonType]
            }
        })
        // setShowCard(true);
    }

    const toggleFilterWindow = () => {
        setIsFilterOpen(!isFilterOpen)
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
    }

    const applyFilters = () => {
        console.log('Filters applied:', filters)
        setIsFilterOpen(false)
    }

    return (
        <div className="App">
            <NavBar showSearchIcon={false} />
            <div className="section section1 text">
                <div className="search-bar-x">
                    <input type="text" placeholder="Encuentra tu casa" />
                    <button className={`search-icon-x ${isSearchOpen ? 'active' : ''}`} onClick={handleSearchIconClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </button>
                    <button className="filter" onClick={toggleFilterWindow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7189A2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
                    </button>
                </div>
                <div className="title-text">
                    <h2 className="eslogan-h2">Alquileres que se Ajustan a tu Estilo de Vida</h2>
                    <p>Sabemos que cada etapa de la vida necesita un espacio único, y con nuestra oferta de alquileres, encontrarás la flexibilidad y comodidad que buscas. Ya sea que necesites un apartamento moderno , una casa espaciosa para la familia, te ofrecemos una amplia gama de opciones de alquiler adaptadas a tus necesidades.</p>
                </div>
            </div>
            <div className="section section2">
                <div className="buttons">
                    {['TODOS', 'CASAS', 'PISOS'].map((type) => (
                        <button
                            key={type}
                            className={`buttonFilter ${activeButtons.includes(type) ? 'active' : ''}`}
                            onClick={() => handleButtonClick(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                {/* <div className="container-card">
                    {showCard && (
                        <HouseCard image={houseData.image} title={houseData.title} description={houseData.description} location={houseData.location} size={houseData.size} bathrooms={houseData.bathrooms} bedrooms={houseData.bedrooms} price={houseData.price} />
                    )}
                </div> */}
            </div>
            
            {isFilterOpen && (
                <div className="filter-window">
                    <div className="filter-group">
                        <label>Precio: {filters.priceRange[0]}€ - {filters.priceRange[1]}€</label>
                        <input type="range" name="priceMin" min="0" max="100000" step="10000" value={filters.priceRange[0]} onChange={(e) => handleFilterChange({ target: { name: 'priceRange', value: [parseInt(e.target.value), filters.priceRange[1]] } })} />
                        <input type="range" name="priceMax" min="0" max="10000000" step="10000" value={filters.priceRange[1]} onChange={(e) => handleFilterChange({ target: { name: 'priceRange', value: [filters.priceRange[0], parseInt(e.target.value)] } })} />
                    </div>
                    <div className="filter-group">
                        <label>Habitaciones</label>
                        <input type="number" name="bedrooms" placeholder="Mínimo habitaciones" min="1" value={filters.bedrooms} onChange={handleFilterChange} />
                    </div>
                    <div className="filter-group">
                        <label>Baños</label>
                        <input type="number" name="bathrooms" placeholder="Mínimo baños" min="1" value={filters.bathrooms} onChange={handleFilterChange} />
                    </div>
                    <div className="filter-group">
                        <label>Metros</label>
                        <input type="number" name="bathrooms" placeholder="Mínimo m2" min="1" value={filters.bathrooms} onChange={handleFilterChange} />
                    </div>
                    <button className="apply-filters" onClick={applyFilters}>Aplicar</button>
                </div>
            )}
        </div>
    );
}

export default House