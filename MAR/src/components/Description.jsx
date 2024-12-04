import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Description.css";
import NavBarMobile from "./NavBarMobile";
import NavBarComputer from "./NavBarComputer";

const Description = () => {
  const { id } = useParams(); // Obtener el ID de la casa desde la URL
  const [houseData, setHouseData] = useState(null); // Estado para almacenar la información de la casa
  const [error, setError] = useState(null); // Estado para manejar errores
  const [isMobileView, setIsMobileView] = useState(false);


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

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!houseData) {
    return <div className="loading-message">Cargando información...</div>;
  }

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
                <button>Solicitar Visita</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
