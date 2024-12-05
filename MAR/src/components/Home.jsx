import { useState, useEffect } from "react";
import Slider from "react-slick";
import "../styles/App.css";

// Components
import NavBarMobile from "./NavBarMobile";
import NavBarComputer from "./NavBarComputer";
import HouseCard from "./HouseCard";

const Home = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 736);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const houseData = [
    {
      id: "1",
      images: ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp"],
      title: "Casa en Majadahonda",
      description:
        "Exclusiva y moderna vivienda, con cinco dormitorios y ocho cuartos de baño...",
      location: "Majadahonda, España",
      size: 1900,
      bathrooms: 8,
      bedrooms: 5,
      price: 1350000,
    },
    {
      id: "2",
      images: ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp"],
      title: "Casa en Las Rozas",
      description:
        "Vivienda unifamiliar espectacular en una zona tranquila de Las Rozas...",
      location: "Las Rozas, España",
      size: 1500,
      bathrooms: 6,
      bedrooms: 4,
      price: 1100000,
    },
    {
      id: "3",
      images: ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp"],
      title: "Casa en Pozuelo",
      description:
        "Magnífica vivienda con amplio jardín y piscina en una urbanización exclusiva...",
      location: "Pozuelo, España",
      size: 2100,
      bathrooms: 7,
      bedrooms: 6,
      price: 1800000,
    },
  ];

  const us =
    'En MAR nos dedicamos a la venta de propiedades exclusivas en Majadahonda, con un enfoque en ofrecer un servicio personalizado y de alta calidad.\n\n\nCon años de experiencia en el mercado inmobiliario, nuestro equipo se compromete a acompañar a cada cliente en todo el proceso de compra, asegurando transparencia, confianza y una experiencia excepcional.';
  const our_mission =
    'Nuestra misión es facilitar la búsqueda del hogar ideal, proporcionando asesoría experta y una selección cuidada de inmuebles que se ajusten a las necesidades y deseos de nuestros clientes.\n\n\nCreemos en construir relaciones duraderas basadas en la integridad y el profesionalismo, convirtiéndonos en su socio de confianza en cada paso.';


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    afterChange: (current) => {
      // Calculo del índice del elemento central visible
      const centerIndex = current + Math.floor(sliderSettings.slidesToShow / 2);
      setCurrentIndex(centerIndex % houseData.length);
    },
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };
    


  return (
    <div className="App">
      {isMobileView ? (
        <NavBarMobile />
      ) : (
        <NavBarComputer />
      )}
      <div className="section section1">
        <div className="title">
          <h2 className="eslogan">Hogares que inspiran</h2>
          <div className="categories">
            <a href="/house" className="category-link">
              Casas
            </a>{" "}
            |
            <a href="/rent" className="category-link">
              {" "}
              Alquileres
            </a>{" "}
            |
            <a href="/flat" className="category-link">
              {" "}
              Pisos
            </a>
          </div>
        </div>
      </div>
      <div className="section section2">
        {isMobileView ? (
            <p className="down_indicator">{'>'}</p>
            ) : (
            <></>
            )}
        <h1>Viviendas destacadas</h1>
        <div className="carousel-container">
          <Slider {...sliderSettings}>
            {houseData.map((house, index) => (
              <div
                key={house.id}
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
        </div>
      </div>
      <div className="section section3">
        {isMobileView ? (
          <></>
        ) : (
            <div className="image-left-container">

            </div>
        )}

        <div className="container-info-home" id="about">
          <div className="container-text-home">
            <h1>Nosotros</h1>
            <p>{us}</p>
          </div>
          <div className="container-text-home">
            <h1>Nuestra misión</h1>
            <p>{our_mission}</p>
          </div>
        </div>

        {isMobileView ? (
          <></>
        ) : (
            <div className="image-right-container">

            </div>
        )}
        
      </div>

      <footer className="footer" id="footer">
        <div className="contact-section">
          <p id="contact">Contáctanos</p>
          <p>mar.soporte@gmail.com</p>
          <p>+34 642 773 127</p>
        </div>
        <div className="social-links">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="../../public/static/img/instagram_logo.webp" alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <img src="../../public/static/img/linkedin_logo.png" alt="LinkedIn" />
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="../../public/static/img/tiktok_logo.png"
              alt="TikTok"
              className="tiktok_logo"
            />
          </a>
        </div>
        <div className="footer-links">
          <a href="/acerca-de">Acerca de</a>
          <a href="/politica-de-privacidad">Política de privacidad</a>
          <a href="/aviso-legal">Aviso legal</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
