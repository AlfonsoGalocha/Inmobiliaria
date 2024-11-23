import PropTypes from 'prop-types';
import '../styles/HouseCard.css';
import { FaBath, FaBed, FaHeart } from 'react-icons/fa'; // Importa los iconos de corazón
import { useState, useEffect } from 'react';
import axios from 'axios';

const HouseCard = ({ id, image, title, description, location, size, bathrooms, bedrooms, price }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar si la casa está en favoritos
  const [animate, setAnimate] = useState(false);

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
  
  
  

  const formattedPrice = price.toLocaleString('es-ES');

  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} className="property-image" />
      </div>
      <div className="card-info">
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

        {/* Corazón para marcar como favorito */}
        <div className="favorite-icon" onClick={handleFavoriteClick}>
          <FaHeart
            color={isFavorite ? 'red' : 'rgba(255, 255, 255, 0.782)'}
            className={animate ? 'heartbeat' : 'heart'}
          />
        </div>
      </div>
    </div>
  );
};

HouseCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  bathrooms: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default HouseCard;
