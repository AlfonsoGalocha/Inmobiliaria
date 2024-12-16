// src/components/Favourites.jsx

import "../styles/Favourites.css";

// Importa los módulos necesarios
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import PropTypes from "prop-types";
import Slider from "react-slick";

// Importa los componentes necesarios
import HouseCard from "./HouseCard";
import NavBarMobile from "./NavBarMobile";
import NavBarComputer from "./NavBarComputer";
import useIsMobileView from "../hooks/useIsMobileView"
import CustomNextArrow from "./CustomNextArrow"
import CustomPrevArrow from "./CustomPrevArrow"

// Define y exporta el componente
const Favourites = () => {
  const [favourites, setFavourites] = useState([]); // Estado para almacenar los favoritos
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para la navegación 
  const isMobileView = useIsMobileView(); // Estado para determinar si la vista es móvil
  const [slidesToShow, setSlidesToShow] = useState(1); // Estado para determinar cuántas diapositivas mostrar
  const [currentIndex, setCurrentIndex] = useState(1); // Estado para determinar el índice actual


  // Función para determinar cuántas diapositivas mostrar
  const slidesToShowfn = () => {
    if (window.innerWidth < 768) { 
      return 1;
    } else if (favourites.length < 3) { 
      return favourites.length;
    } else {
      return 3;
    }
  };

  // Actualiza el estado de `slidesToShow` cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(slidesToShowfn()); // Actualiza el estado de `slidesToShow` llamando a la funcion slidesToShowfn
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },);

  // Función para obtener los favoritos
  const fetchFavourites = () => {
    axios
      .get("http://localhost:5172/user/favs", { withCredentials: true })
      .then((response) => {
        setFavourites(response.data.favs || []);
        setError(null);
      })
      .catch((err) => {
        if (err.response?.status === 401) { // Si no está autorizado, redirige a la página de inicio de sesión
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Error loading favorites");
        }
      });
  };

  // Efecto para obtener los favoritos
  useEffect(() => {
    fetchFavourites();
  },[]);

  // Redirige a la descripción de la casa si solo hay un favorito
  useEffect(() => {
    if (favourites.length === 1) {
      navigate(`/description/${favourites[0]?.id}`);
    }
  }, [favourites, navigate]); // Se ejecuta cuando cambia la lista de favoritos o la función de navegación


  // Configuración del slider
  const sliderSettings = {
    dots: false,
    infinite: favourites.length > 1,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    centerMode: false,
    afterChange: (current) => {
      const centerIndex = current + Math.floor(sliderSettings.slidesToShow / 2); // Calcular el índice central
      setCurrentIndex(centerIndex % favourites.length);
    },
    // Muestra las flechas solo si hay más de un favorito
    nextArrow: favourites.length > 1 ? <CustomNextArrow /> : null, 
    prevArrow: favourites.length > 1 ? <CustomPrevArrow /> : null,
  };

  return (
    <div className="favourites">
      <div className="nav-color-stage">
        {isMobileView ? (
            <NavBarMobile/>
        ) : (
            <NavBarComputer />
        )}
      </div>
      <div className="title-favourites">
        <h2>Mis favoritos</h2>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="carousel-container carrousel2">
        {favourites.length === 0 ? (
          <p className="vacio">Vacio.</p>
        ) : favourites.length < 4 ? (
          <div className="house-cards">
            {favourites.map((house) => (
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
                key={house.id}
              />
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings}>
              {favourites.map((house, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === currentIndex ? "active-slide" : ""
                  }`}
                >
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
  );
};

// Propiedades del componente Favourites
Favourites.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  size: PropTypes.number,
  bathrooms: PropTypes.number,
  bedrooms: PropTypes.number,
  price: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Favourites;
