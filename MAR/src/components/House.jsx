import '../styles/House.css';

import  { useState } from 'react';


import NavBar from './NavBar';
import HouseCard from './HouseCard';


function House(){

    const [showCard, setShowCard] = useState(false); // Estado para controlar la visibilidad


    const houseData = {
        image: '../../public/static/img/casa_majadahonda.webp',
        title: 'Casa en Majadahonda',
        description: 'Exclusiva y moderna vivienda, con cinco dormitorios y ocho cuartos de baño, en parcela de 1.900 m2 ubicada en una zona muy tranquila de la urbanización......',
        location: 'Majadahonda, España',
        size: 1900,
        bathrooms: 8,
        bedrooms: 5,
        price: '1,350,000€'
      };

    
    
      // Función para manejar el clic en los botones
    const handleButtonClick = () => {
        setShowCard(true); // Cambia el estado a true para mostrar la carta
    };
    

    return(
        <div className='App'>
            <NavBar />
            <div className='section section1'>
                <div className='title'>
                    <h2 className='eslogan'>Encuentra la Casa de Tus Sueños</h2>
                    <div className='description'>
                        <a className='description-text'> Te ofrecemos una selección de viviendas cuidadosamente elegidas para adaptarse a tus necesidades y estilo de vida, ya sea que busques un hogar acogedor en el centro de la ciudad o una amplia casa familiar en una zona tranquila.</a>
                    </div>
                </div>
            </div>

            <div className='section section2'>
    
            <div className="buttons">
            <button className="button" onClick={handleButtonClick}>
                Chalet
            </button>
            <button className="button" onClick={handleButtonClick}>
                Adosado
            </button>
            <button className="button" onClick={handleButtonClick}>
                Villa
            </button>
            <button className="button" onClick={handleButtonClick}>
                Pareado
            </button>
            </div>
            <div className="container-card">
                {/* Muestra la carta solo si showCard es true */}
                {showCard && (
                    <HouseCard
                    image={houseData.image}
                    title={houseData.title}
                    description={houseData.description}
                    location={houseData.location}
                    size={houseData.size}
                    bathrooms={houseData.bathrooms}
                    bedrooms={houseData.bedrooms}
                    price={houseData.price}
                    />
                )}
                </div>
            </div>
        </div>

    )
}

export default House