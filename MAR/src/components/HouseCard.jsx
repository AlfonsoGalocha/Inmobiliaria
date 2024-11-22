import PropTypes from 'prop-types';
import '../styles/HouseCard.css';
import { FaBath, FaBed, FaHeart } from 'react-icons/fa'; // Importa los iconos de corazón
import { useState } from 'react';
import axios from 'axios';

const HouseCard = ({ id, image, title, description, location, size, bathrooms, bedrooms, price }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar si la casa está en favoritos

  const handleFavoriteClick = async () => {
    setIsFavorite(!isFavorite);

    try {
      await axios.post('http://localhost:5172/user/favs', {
        house_id: id,
        action: !isFavorite ? 'add' : 'remove'
      }, {
        withCredentials: true  // Asegúrate de incluir las cookies de sesión
      });
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
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
            <span><FaBath /> {bathrooms}</span>
            <span><FaBed /> {bedrooms}</span>
          </div>
          <p className="property-price">{formattedPrice}€</p>
        </div>

        {/* Corazón para marcar como favorito */}
        <div className="favorite-icon" onClick={handleFavoriteClick}>
          {isFavorite ? <FaHeart color="red" /> : <FaHeart color='grey'/>}
        </div>
      </div>
    </div>
  );
};

HouseCard.propTypes = {
  id: PropTypes.string.isRequired,  // Agrega el id para identificar la casa
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
