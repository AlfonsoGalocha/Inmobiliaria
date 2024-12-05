import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import HouseCard from "./HouseCard"; // Asegúrate de que la ruta sea correcta
import "../styles/Favourites.css";

import BackLink from '../../public/static/img/go-back.png'; // Importa el componente BackLink



const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para manejar redirecciones


  // Función para obtener los favoritos
  const fetchFavourites = () => {
    axios
      .get("http://localhost:5172/user/favs", { withCredentials: true }) // Asegúrate de incluir las cookies de sesión
      .then((response) => {
        // Supongamos que los favoritos incluyen la información de las casas
        setFavourites(response.data.favs || []);
        setError(null); // Limpia cualquier error previo
      })
      .catch((err) => {
        if (err.response?.status=== 401){
          navigate('/login');
        }else{
        setError(err.response?.data?.message || "Error al cargar los favoritos");
        }
      });
  };

  // Llama a fetchFavourites cuando se monta el componente
  useEffect(() => {
    fetchFavourites();
  }, []);

    // Configuración del slider
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "0",
      nextArrow: (
        <div className="slick-next">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
          </svg>
        </div>
      ),
      prevArrow: (
        <div className="slick-prev">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" />
          </svg>
        </div>
      ),
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
  <body className="favourites">
    <div className="title-favoutites">
      <Link to="/" className="back-link"><img src={BackLink} alt="Volver" /> </Link>
      <h2>Mis favoritos</h2>
      {error && <div className="error">{error}</div>}
    </div>

    <div className="carousel-container">
    <Slider {...sliderSettings}>
      {favourites.map((house, index) => (
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
    </div>


  </body>


  );

};





export default Favourites;
