// src/components/Description.jsx

// Importamos las librerías necesarias
import  { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import "../styles/Description.css";
import copy from "../../public/static/img/copy.svg"

// importamos componentes
import NavBarMobile from "./NavBarMobile";
import NavBarComputer from "./NavBarComputer";

//Hook para la vista del móvil
import useIsMobileView from "../hooks/useIsMobileView"

// Componente funcional Description
const Description = () => {
  const { id } = useParams(); // Estado para obtener el ID de la casa desde la URL
  const [houseData, setHouseData] = useState(null); // Estado para almacenar la información de la casa
  const [error, setError] = useState(null); // Estado para manejar errores
  const isMobileView = useIsMobileView(); // Estado para determinar si la vista es móvil
  const [indexToInsert, setIndexToInsert] = useState(0); // Estado para manejar la imagen principal

  const navigate = useNavigate();  // Hook para navegar entre páginas
  
  // Efecto para obtener los datos de la casa
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

  // Manejo de errores
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!houseData) {
    return <div className="loader"></div>;
  }

  const formattedPrice = houseData.price.toLocaleString('es-ES'); // Formatear el precio

  // Función para copiar el ID al portapapeles
  function copyToClipboard() {
      navigator.clipboard.writeText(id).then(() => {
      }).catch(err => {
          console.error("Error al copiar el ID: ", err); // Manejo de errores
      });
  }

  // Función para enviar la solicitud de visita
  const handleRequestVisit = async (e) => {

    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")); // Obtener el usuario
    const username = user ? user.username : null; // Obtener el nombre de usuario
    const date = document.getElementById("date").value;  // Obtener la fecha seleccionada

    // Verificar si el usuario está logueado
    if (!username) {
      navigate("/login");
      return;
    }

    // Enviar la solicitud
    try {
      await axios.post("http://localhost:5172/house/requestVisit", { 
        houseId: id,
        housename: houseData.title,
        username: username,
        date: date,
      });
      alert("Solicitud enviada con éxito.");
    } catch (err) {
      alert("Error: ", err); // Manejo de errores
    }
  };

  // Función para cambiar la imagen principal
  function handleImageChange(index) {
    setIndexToInsert(index);
  }
  
  


  return (
    <div className="App">
      <div className="nav-color-stage">
        {isMobileView ? (
            <NavBarMobile/>
        ) : (
            <NavBarComputer />
        )}
      </div>
      <div className="description-container">
        <div className="description-container-info">

          {/* Imagenes de la casa */}
          <div className="house-image">
            {/* Imagen principal */}
            <img
              src={houseData.images[indexToInsert]}
              alt={houseData.title}
              className="active"
            />
            {/* Imágenes secundarias */}
            <div className="other-house-image">
              {houseData.images.map((image, index) => (
                index !== indexToInsert && (
                  <div key={index} className="other-image-container">
                    <img src={image} onClick={() => handleImageChange(index)} alt={`Imagen ${index + 1}`}/>
                  </div>
                )
              ))}
            </div>
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
                <p>{formattedPrice} € {houseData.rent && " / mes"}</p>
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
            <h2>Contactáctanos</h2>

            <p>soportecliente.mar@gmail.com</p>
            <p>+34 642 773 127</p>
          </div>
          <div className="space-o"><p>o</p></div>
          <div className="section-meeting">

              <h2>Solicita una visita guiada</h2>

              <form className="request-visit" onSubmit={handleRequestVisit}>
                <input type="date" id="date" name="date" required/>
                <button>Solicitar Visita</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
