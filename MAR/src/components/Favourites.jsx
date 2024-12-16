import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import HouseCard from "./HouseCard"; // Asegúrate de que la ruta sea correcta
import "../styles/Favourites.css";
import PropTypes from "prop-types";
import NavBarMobile from "./NavBarMobile";
import NavBarComputer from "./NavBarComputer";
import BackLink from "../../public/static/img/go-back.png"; // Importa el componente BackLink

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);


  // Función para determinar cuántas diapositivas mostrar
  const slidesToShowfn = () => {
    if (window.innerWidth < 768) {
      return 1;
    } else if (favourites.length < 3) {
      return favourites.length;
    } else {
      return 3;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(slidesToShowfn());
      setIsMobileView(window.innerWidth <= 736);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [favourites]);

  // Función para obtener los favoritos
  const fetchFavourites = () => {
    axios
      .get("http://localhost:5172/user/favs", { withCredentials: true })
      .then((response) => {
        setFavourites(response.data.favs || []);
        setError(null);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Error al cargar los favoritos");
        }
      });
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  useEffect(() => {
    if (favourites.length === 1) {
      navigate(`/description/${favourites[0]?.id}`);
    }
  }, [favourites, navigate]);

  // Configuración del slider
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

  const sliderSettings = {
    dots: false,
    infinite: favourites.length > 1,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    centerMode: false,
    afterChange: (current) => {
      const centerIndex = current + Math.floor(sliderSettings.slidesToShow / 2);
      setCurrentIndex(centerIndex % favourites.length);
    },
    nextArrow: favourites.length > 1 ? <CustomNextArrow /> : null,
    prevArrow: favourites.length > 1 ? <CustomPrevArrow /> : null,
  };

  return (
    <div className="favourites">
      <div className="nav-color-stage">
        {isMobileView ? (
            <NavBarMobile/>
        ) : (
            <NavBarComputer />
        )}
      </div>
      <div className="title-favourites">
        {/* <Link to="/" className="back-link">
          <span className="back-arrow">🡨</span>
        </Link> */}
        <h2>Mis favoritos</h2>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="carousel-container carrousel2">
        {favourites.length === 0 ? (
          <p>No tienes favoritos todavía.</p>
        ) : favourites.length < 4 ? (
          <div className="house-cards">
            {favourites.map((house) => (
              <HouseCard
                id={house.id}
                image={house.images}
                title={house.title}
                description={house.description}
                location={house.location}
                size={house.size}
                bathrooms={house.bathrooms}
                bedrooms={house.bedrooms}
                price={house.price}
                key={house.id}
              />
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings}>
              {favourites.map((house, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === currentIndex ? "active-slide" : ""
                  }`}
                >
                  <HouseCard
                    id={house.id}
                    image={house.images}
                    title={house.title}
                    description={house.description}
                    location={house.location}
                    size={house.size}
                    bathrooms={house.bathrooms}
                    bedrooms={house.bedrooms}
                    price={house.price}
                  />
                </div>
              ))}
            </Slider>
        )}
      </div>
    </div>
  );
};

Favourites.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  bathrooms: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Favourites;
