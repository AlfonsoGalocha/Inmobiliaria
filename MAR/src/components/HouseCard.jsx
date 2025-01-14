// src/components/HouseCard.jsx

import PropTypes from 'prop-types';
import { FaBath, FaBed, FaHeart } from 'react-icons/fa'; // Importa los iconos de corazón
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

// Importamos componentes 
import '../styles/HouseCard.css';

// Componente que muestra una tarjeta con la información de una casa
const HouseCard = ({ id, image, title, description, location, size, bathrooms, bedrooms, price,rent}) => {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar si la casa está en favoritos
  const [animate, setAnimate] = useState(false); // Estado para controlar la animación del corazón
  const [images, setImages] = useState(image); // Estado para almacenar las imágenes
  const navigate = useNavigate(); // Hook para navegar entre páginas

  // Sincroniza `isFavorite` con los datos del backend
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get('http://localhost:5172/user/favs', { withCredentials: true });
        const favs = response.data.favs || [];
        // Si el ID de la casa actual está en la lista de favoritos, establece isFavorite en true
        setIsFavorite(favs.some(fav => fav.id === id)); 
      } catch (err) {
        console.log(err) // Muestra un mensaje de error si falla la petición
      }
    };
    // Llamada a la API para obtener los favoritos
    fetchFavourites();
  }, [id]);

  // Sincroniza `images` con los datos del backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5172/houses/${id}`, { withCredentials: true });
        const fetchedImages = response.data.images || [];
        if (fetchedImages.length > 0) {
          setImages(fetchedImages); // Actualizamos las imágenes solo si hay nuevas
        }
      } catch (err) {
        console.error('Error al obtener imágenes:', err); // Muestra un mensaje de error si falla la petición
      }
    };

    fetchImages();
  }, [id])

  
  // Maneja el clic en el corazón para marcar como favorito
  const handleFavoriteClick = async () => {
    setAnimate(true);    // Activa la animación y cambia el estado inmediatamente

  
    // Cambia el estado visual (rojo o gris) al iniciar la animación
    setTimeout(() => setIsFavorite((prev) => !prev), 150);
  
    try {
      // Envía la solicitud al backend
      await axios.post('http://localhost:5172/user/favs',{
          house_id: id,
          action: !isFavorite ? 'add' : 'remove', // Añadir o eliminar de favoritos
        },
        { withCredentials: true }
      );
      // Recargar la página para actualizar la lista de favoritos cuando le des a remove
      if (isFavorite) {
        window.location.reload(); // Recarga la página para actualizar la lista de favoritos
      }
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
  
      // Revertir el estado si hay un error
      setIsFavorite((prev) => !prev);
    } finally {
      // Detener la animación después de 500ms
      setTimeout(() => setAnimate(false), 500);
    }
  };

  // Maneja el clic en la tarjeta para ir a la descripción
  const handleCardClick = () => {
    navigate(`/description/${id}`); 
  };
  
  
  // Formatea el precio a un formato legible
  const formattedPrice = price.toLocaleString('es-ES');

  return (
    <div className="card">
      <div className="card-image" onClick={handleCardClick}>
        <img src={images[0]}  />
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
          <p className="property-price">{formattedPrice}€{rent && " / mes"}</p>        
        </div>

      </div>
    </div>
  );
};

// Propiedades de la tarjeta de casa
HouseCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  bathrooms: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  rent : PropTypes.bool,
};

export default HouseCard;
