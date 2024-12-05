import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import "../styles/Description.css";
import NavBarMobile from "./NavBarMobile";
import NavBarComputer from "./NavBarComputer";
import copy from "../../public/static/img/copy.svg"

const Description = () => {
  const { id } = useParams(); // Obtener el ID de la casa desde la URL
  const [houseData, setHouseData] = useState(null); // Estado para almacenar la información de la casa
  const [error, setError] = useState(null); // Estado para manejar errores
  const [isMobileView, setIsMobileView] = useState(false);

  const navigate = useNavigate(); 
  const formattedPrice = houseData.price.toLocaleString('es-ES');

  useEffect(() => {
    // Llamada a la API
    const fetchHouseData = async () => {
      try {
        const response = await axios.get(`http://localhost:5172/houses/${id}`);
        setHouseData(response.data); // Guardar los datos en el estado
      } catch (err) {
        setError(err.response?.data?.message || "Error al obtener los datos.");
      }
    };

    fetchHouseData();
  }, [id]);

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

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!houseData) {
    return <div className="loading-message">Cargando información...</div>;
  }

  function copyToClipboard() {
      navigator.clipboard.writeText(id).then(() => {
      }).catch(err => {
          console.error("Error al copiar el ID: ", err);
      });
  }

  const handleRequestVisit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user ? user.username : null;
    if (!userName) {
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:5172/house/requestVisit", {
        houseId: id,
        username: userName,
      });
      alert("Solicitud enviada con éxito.");
    } catch (err) {
      alert("Hubo un error al enviar la solicitud.");
    }
  };

  


  return (
    <div className="App">
      {isMobileView ? (
          <NavBarMobile/>
      ) : (
          <NavBarComputer />
      )}
      <div className="description-container">
        <div className="description-container-info">

          {/* Imagen de la casa */}
          <div className="house-image">
            <img src={houseData.image} alt={houseData.title} />
          </div>

          {/* Detalles de la casa */}
          <div className="house-details">
            <h2>{houseData.title}</h2>
            <p>{houseData.description}</p>
          </div>

          {/* Características */}
          <div className="house-features">
            <h2>Características</h2>
            <div className="house-features-container">
              <div className="group">
                <h4>Localización:</h4>
                <p>{houseData.location}</p>
              </div>
              <div className="group">
                <h4>Superficie:</h4>
                <p>{houseData.size} m²</p>
              </div>
              <div className="group">
                <h4>Número de baños:</h4>
                <p>{houseData.bathrooms} baños</p>
              </div>
              <div className="group">
                <h4>Número de habitaciones:</h4>
                <p>{houseData.bedrooms} habitaciones</p>
              </div>
              <div className="group">
                <h4>Precio:</h4>
                <p>{formattedPrice} €</p>
              </div>
              <div className="ref-id-feature">
                <div className="group">
                  <h4>Ref:</h4>
                  <p>{houseData.id}</p>
                </div>
                <p className="copy-id-p" onClick={copyToClipboard}>
                  <img src={copy} alt="Copiar ID" />
                </p>
              </div>
            </div>
          </div>


          
        </div>
        <div className="space-bar"></div>
        <div className="description-container-contact">
          <div className="section-contact">
            <h2>Contacto</h2>

            <p>mar.soporte@gmail.com</p>
            <p>+34 642 773 127</p>
          </div>
          <div className="space-o"><p>o</p></div>
          <div className="section-meeting">

              <h2>Solicita una visita guiada</h2>

              <div className="request-visit">
                <input type="date" id="date" name="date" required/>
                <button onClick={handleRequestVisit}>Solicitar Visita</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
