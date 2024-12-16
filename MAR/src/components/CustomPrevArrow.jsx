
import PropTypes from "prop-types";

const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" />
        </svg>
      </div>
    );
  };

  // Validación de props de CustomPrevArrow
  CustomPrevArrow.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
  };
  
export default CustomPrevArrow