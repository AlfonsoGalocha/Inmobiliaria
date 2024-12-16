
import PropTypes from "prop-types";


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

// Validación de props de CustomNextArrow
CustomNextArrow.propTypes = {
className: PropTypes.string,
onClick: PropTypes.func,
};

export default CustomNextArrow