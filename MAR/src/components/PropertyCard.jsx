// src/components/PropertyCard.js
import PropTypes from 'prop-types'; // Añadir prop-types para la validación de props
import '../styles/PropertyCard.css'

const PropertyCard = ({ image, title, location, price }) => {
  return (

    <div className="card">
        <div className="card-image">
            <img src={image} alt={title} className="property-image" />
        </div>
        <div className="card-info">
            <h2>{title}</h2>
            <p>{location}</p>
            <p className="property-price">{price}</p>
        </div>
    </div>
    
  );
};

// Añadimos la validación de props con PropTypes
PropertyCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default PropertyCard;
