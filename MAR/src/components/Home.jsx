// src/components/Home.jsx

import { useState, useEffect,useCallback } from "react";
import Slider from "react-slick";
import "../styles/App.css";
import axios from "axios";

// Componentes
import NavBarMobile from "./NavBarMobile";
import NavBarComputer from "./NavBarComputer";
import HouseCard from "./HouseCard";
import Footer from "./Footer"
import CustomNextArrow from "./CustomNextArrow"
import CustomPrevArrow from "./CustomPrevArrow"

//Hook
import useIsMobileView from "../hooks/useIsMobileView"

const Home = () => {
  const isMobileView = useIsMobileView(); // Estado para determinar si la vista es móvil
  const [currentIndex, setCurrentIndex] = useState(1); // Estado para el índice actual del slider
  const [houses, setHouses] = useState([]); // Estado para almacenar las casas destacadas

  // Parametros para la consulta
  const buildQueryParams = useCallback(() => {
    return {
      likes: "mvendidos",
    };
  }, []);
  
  // Función para obtener las casas destacadas
  const fetchHouses = useCallback(async () => {
    const queryParams = new URLSearchParams(buildQueryParams()).toString(); // Construimos los parámetros de la consulta

    try {
        // Realizar la petición GET con axios
        const response = await axios.get(`http://localhost:5172/houses?${queryParams}`); 
        
        // Manejar la respuesta
        if (response.status === 200) {
            const data = response.data;
            setHouses(Array.isArray(data.houses) ? data.houses : []);
        } else {
            console.error("Error en la respuesta del servidor:", response.data.message);
        }
    } catch (error) {
        console.error("Error fetching houses:", error);
        setHouses([]); // Resetear las casas en caso de error
    }
  }, [buildQueryParams]); 

  // Efecto para obtener las casas destacadas
  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  // Textos de la sección Nosotros
  const us =
    'En MAR nos dedicamos a la venta de propiedades exclusivas a nivel nacional, con un enfoque en ofrecer un servicio personalizado y de alta calidad.\n\n\nCon años de experiencia en el mercado inmobiliario, nuestro equipo se compromete a acompañar a cada cliente en todo el proceso de compra, asegurando transparencia, confianza y una experiencia excepcional.';
  const our_mission =
    'Nuestra misión es facilitar la búsqueda del hogar ideal, proporcionando asesoría experta y una selección cuidada de inmuebles que se ajusten a las necesidades y deseos de nuestros clientes.\n\n\nCreemos en construir relaciones duraderas basadas en la integridad y el profesionalismo, convirtiéndonos en su socio de confianza en cada paso.';


  // Configuración del slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    afterChange: (current) => {
      const centerIndex = current + Math.floor(sliderSettings.slidesToShow / 2); // Calcular el índice para la imagen del centro
      setCurrentIndex(centerIndex % houses.length);
    },
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };
    

  return (
    <div className="App">
      {isMobileView ? ( 
        <NavBarMobile />  // Si la vista es de móvil
      ) : (
        <NavBarComputer /> // Si la vista es de ordenador
      )}
      <div className="section section1">
        <div className="title">
          <h2 className="eslogan">Hogares que inspiran</h2>
          <div className="categories">
            <a href="/house" className="category-link"> Casas</a>|
            <a href="/rent" className="category-link">Alquileres</a>|
            <a href="/flat" className="category-link">Pisos</a>
          </div>
        </div>
      </div>
      <div className="section section2">
        {isMobileView ? (
            <p className="down_indicator">{'>'}</p>
            ) : ( 
            <></>
            )}
        <h1>Viviendas destacadas</h1>
        <div className="carousel-container">
          {houses.length > 0 && (
            <Slider {...sliderSettings}>
              {houses.map((house, index) => (
                <div key={index} className={`carousel-item ${index === currentIndex ? "active-slide" : ""}`}>
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
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <div className="section section3">
        {isMobileView ? (
          <></>
        ) : (
            <div className="image-left-container"></div>
        )}

        <div className="container-info-home" id="about">
          <div className="container-text-home">
            <h1>Nosotros</h1>
            <p>{us}</p>
          </div>
          <div className="container-text-home">
            <h1>Nuestra misión</h1>
            <p>{our_mission}</p>
          </div>
        </div>

        {isMobileView ? (
          <></>
        ) : (
            <div className="image-right-container"></div>
        )}
        
      </div>
      <Footer/>  
    </div>
  );
};



export default Home;
