// src/components/HouseCard.js
import PropTypes from 'prop-types'; // Añadir prop-types para la validación de props
import '../styles/ImageCard.css'

const HouseCard = ({ subtitle, title, image, description }) => {
  return (

    // <div className="card">
    //     <div className="card-image">
    //         <img src={image} alt={title} className="property-image" />
    //     </div>
    //     <div className="card-info">
    //         <h2>{title}</h2>
    //         <p>{location}</p>
    //         <p className="property-price">{price}</p>
    //     </div>
    // </div>

    <div className='photo'>
        <div className='subtitle'>{subtitle}</div>
        <div className='title'>{title}</div>
        <div className='image'>{image}</div>
        <div className='description'>{description}</div>
    </div>
    
  );
};

// Añadimos la validación de props con PropTypes
HouseCard.propTypes = {
    subtitle:, // No hace falta que se pase en las props
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description:, // No hace falta que se pase en las props
};

export default HouseCard;
