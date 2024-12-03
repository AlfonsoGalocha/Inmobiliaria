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
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

  return (
  <body className="favourites">
    <div className="title">
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
            image={house.image}
            title={house.title}
            description={house.description}
            location={house.location}
            size={house.size}
            bathrooms={house.bathrooms}
            bedrooms={house.bedrooms}
            price={house.price}
          />
          {/* Para que salga el , | , menos en el ultimo */}
          {index !== favourites.length - 1 && (
            <div className="div-espaciador">
              |
            </div>
          )}
        </div>
      ))}
      </Slider>
    </div>


  </body>


  );

};





export default Favourites;
