import PropTypes from 'prop-types';
import '../styles/HouseCard.css';
import { FaBath, FaBed, FaHeart } from 'react-icons/fa'; // Importa los iconos de corazón
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const HouseCard = ({ id, image, title, description, location, size, bathrooms, bedrooms, price }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar si la casa está en favoritos
  const [images, setImages] = useState(image);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // Sincroniza `isFavorite` con los datos del backend
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get('http://localhost:5172/user/favs', { withCredentials: true });
        const favs = response.data.favs || [];
        // Si el ID de la casa actual está en la lista de favoritos, establece isFavorite en true
        setIsFavorite(favs.some(fav => fav.id === id));
      } catch (err) {
        console.log(err)
      }
    };

    fetchFavourites();
  }, [id]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5172/houses/${id}`, { withCredentials: true });
        const fetchedImages = response.data.images || [];
        if (fetchedImages.length > 0) {
          setImages(fetchedImages); // Actualizamos las imágenes solo si hay nuevas
        }
      } catch (err) {
        console.error('Error al obtener imágenes:', err);
      }
    };

    fetchImages();
  }, [id])

  const handleFavoriteClick = async () => {
    // Activa la animación y cambia el estado inmediatamente
    setAnimate(true);
  
    // Cambia el estado visual (rojo o gris) al iniciar la animación
    setTimeout(() => setIsFavorite((prev) => !prev), 150);
  
    try {
      // Envía la solicitud al backend
      await axios.post(
        'http://localhost:5172/user/favs',
        {
          house_id: id,
          action: !isFavorite ? 'add' : 'remove',
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
  
      // Revertir el estado si hay un error
      setIsFavorite((prev) => !prev);
    } finally {
      // Detener la animación después de 500ms
      setTimeout(() => setAnimate(false), 500);
    }
  };

  const handleCardClick = () => {
    navigate(`/description/${id}`); 
  };
  
  const formattedPrice = price.toLocaleString('es-ES');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
  };
  

  return (
    <div className="card">
      <div className="card-image">
        {/* Carrusel */}
        <Slider {...sliderSettings} className="house-card-slider">
          {images.map((img, index) => (
              <img src={img} alt={`Imagen ${index + 1}`} />
          ))}
        </Slider>

      </div>
      {/* Corazón para marcar como favorito */}
      <div className="favorite-icon" onClick={handleFavoriteClick}>
          <FaHeart
            color={isFavorite ? 'red' : 'rgba(255, 255, 255, 0.782)'}
            className={animate ? 'heartbeat' : 'heart'}
          />
        </div>
      <div className="card-info" onClick={handleCardClick}>
        <h2>{title}</h2>
        <p className="property-description">{description}</p>
        <p className="property-location">{location}</p>

        <div className="property-details-container">
          <div className="property-details">
            <span>{size} m²</span>
            <span>
              <FaBath /> {bathrooms}
            </span>
            <span>
              <FaBed /> {bedrooms}
            </span>
          </div>
          <p className="property-price">{formattedPrice}€</p>
        </div>
      </div>
    </div>
  );
};

HouseCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired, // Cambiado a array
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  bathrooms: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default HouseCard;