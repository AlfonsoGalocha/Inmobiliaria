import { useState, useEffect } from "react";
import axios from "axios";
import HouseCard from "./HouseCard"; // Asegúrate de que la ruta sea correcta
import "../styles/Favourites.css";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);

  // Función para obtener los favoritos
  const fetchFavourites = () => {
    axios
      .get("http://localhost:5172/user/favs", { withCredentials: true }) // Asegúrate de incluir las cookies de sesión
      .then((response) => {
        // Supongamos que los favoritos incluyen la información de las casas
        setFavourites(response.data.favs || []);
        setError(null); // Limpia cualquier error previo
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error al cargar los favoritos");
      });
  };

  // Llama a fetchFavourites cuando se monta el componente
  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="favourites-container">
        {favourites.map((house) => (
          <HouseCard
            key={house.id}
            id={house.id}
            image={house.image}
            title={house.title}
            description={house.description}
            location={house.location}
            size={house.size}
            bathrooms={house.bathrooms}
            bedrooms={house.bedrooms}
            price={house.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
