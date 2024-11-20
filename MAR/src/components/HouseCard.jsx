import PropTypes from 'prop-types'; 
import '../styles/HouseCard.css';
import { FaBath, FaBed } from 'react-icons/fa'; 

const HouseCard = ({ image, title, description, location, size, bathrooms, bedrooms, price }) => {
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
          <p className="property-price">{price}€</p>
        </div>
      </div>
    </div>
  );
};


HouseCard.propTypes = {
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