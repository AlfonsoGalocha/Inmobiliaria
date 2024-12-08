import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import HouseCard from "./HouseCard"; // Asegúrate de que la ruta sea correcta
import "../styles/Favourites.css";

import BackLink from "../../public/static/img/go-back.png"; // Importa el componente BackLink

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para manejar redirecciones
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para obtener los favoritos
  const fetchFavourites = () => {
    axios
      .get("http://localhost:5172/user/favs", { withCredentials: true }) // Asegúrate de incluir las cookies de sesión
      .then((response) => {
        setFavourites(response.data.favs || []);
        setError(null); // Limpia cualquier error previo
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Error al cargar los favoritos");
        }
      });
  };

  // Llama a fetchFavourites cuando se monta el componente
  useEffect(() => {
    fetchFavourites();
  }, []);

  // Configuración del slider
  const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
        </svg>
      </div>
    );
  };

  const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" />
        </svg>
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: favourites.length > 1, // Solo infinito si hay más de un favorito
    speed: 500,
    slidesToShow: 1, // Mostrar solo una diapositiva
    slidesToScroll: 1,
    centerMode: false, // No centrar las imágenes
    afterChange: (current) => {
      setCurrentIndex(current);
    },
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="favourites">
      <div className="title-favoutites">
        <Link to="/" className="back-link"><img src={BackLink} alt="Volver" /> </Link>
        <h2>Mis favoritos</h2>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="carousel-container">
        {favourites.length > 0 ? (
          <Slider {...sliderSettings}>
            {favourites.map((house) => (
              <div key={house.id}>
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
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
